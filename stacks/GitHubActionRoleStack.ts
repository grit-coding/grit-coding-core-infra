import { Construct } from 'constructs';
import {
  S3Backend,
  TerraformOutput,
  TerraformStack,
  DataTerraformRemoteStateS3,
} from 'cdktf';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { Region } from '../types/Region';
import { S3BackendBucket } from '../types/S3BackendBucket';
import { S3BackendDynamoTable } from '../types/S3BackendDynamoTable';

export class GitHubActionRoleStack extends TerraformStack {
  constructor(
    scope: Construct,
    id: string,
    options: {
      s3BackendBucket: S3BackendBucket;
      s3BackendDynamodbTable: S3BackendDynamoTable; // CDKTF doesn't natively support S3 locking atm
      s3BackendKey: string;
      region: Region;
      projectPrefix: string;
    }
  ) {
    super(scope, id);

    new S3Backend(this, {
      bucket: options.s3BackendBucket,
      key: options.s3BackendKey,
      region: options.region,
    });

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
    });

    // example code if you want to import from different stack
    const ecrState = new DataTerraformRemoteStateS3(this, 'ecr-state', {
      bucket: options.s3BackendBucket,
      key: 'core-infra/ecrStack.tfstate',
      region: options.region,
      dynamodbTable: options.s3BackendDynamodbTable,
    });

    const ecrUrl = ecrState.getString('ecr-repo-url'); // same output name from the original stack
  }
}
