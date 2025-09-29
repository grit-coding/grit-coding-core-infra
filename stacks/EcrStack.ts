import { Construct } from 'constructs'
import { S3Backend, TerraformOutput, TerraformStack } from 'cdktf'
import { AwsProvider } from '@cdktf/provider-aws/lib/provider'
import { Region } from '../types/Region'
import { S3BackendBucket } from '../types/S3BackendBucket'
import { S3BackendDynamoTable } from '../types/S3BackendDynamoTable'
import { EcrRepository } from '@cdktf/provider-aws/lib/ecr-repository'

 

export class EcrStack extends TerraformStack {
  constructor(scope: Construct, id: string, options:{
    s3BackendBucket: S3BackendBucket,
    s3BackendDynamodbTable: S3BackendDynamoTable, // CDKTF doesn't natively support S3 locking atm
    s3BackendKey: string,
    region: Region,
    projectPrefix: string,
  }) {
    super(scope, id);

    new S3Backend(this, {
        bucket: options.s3BackendBucket,
        key: options.s3BackendKey,
        region: options.region,
      })
  

    const provider = new AwsProvider(this, `${options.region}-provider`, {
    region: options.region,
    defaultTags: [
        {
        tags: {
            Owner: options.projectPrefix, //'core-infra'
            DeployedBy: 'Terraform',
        },
        },
    ],
    })

    // Define ECR Repository
    const ecr = new EcrRepository(this, 'ecr-repo', {
    provider,
    name: options.projectPrefix,
    imageScanningConfiguration: {
        scanOnPush: true,
    },
    imageTagMutability: 'MUTABLE',
    })

    new TerraformOutput(this, 'ecr-repo-url', {
    value: ecr.repositoryUrl,
    })
  }  
}
