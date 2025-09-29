import { App } from 'cdktf';
import { GitHubActionRoleStack } from './stacks/GitHubActionRoleStack';
import { EcrStack } from './stacks/EcrStack';

const app = new App();
const keyPrefix = 'core';

// ==================================================================
// DEV EU-WEST-2
// ==================================================================

const devEuWest2SharedOptions = {
  s3BackendBucket: 'grit-coding-terraform-dev' as const, // bucket and dynamodb are created ahead in each aws account
  s3BackendDynamodbTable: 'grit-coding-terraform-dev' as const,
  profile: 'core-infra-dev-devops',
  env: 'dev',
  region: 'eu-west-2' as const,
  projectPrefix: 'core-infra',
};

//cdktf core-infra-dev-github-action-stack
new GitHubActionRoleStack(app, 'core-infra-dev-github-action-stack', {
  s3BackendKey: `${keyPrefix}/gitHubActionRole.tfstate`,
  ...devEuWest2SharedOptions,
});

//cdktf core-infra-dev-ecr-stack
new EcrStack(app, 'core-infra-dev-ecr-stack', {
  s3BackendKey: `${keyPrefix}/ecrStack.tfstate`,
  ...devEuWest2SharedOptions,
});

// ==================================================================
// Staging EU WEST 2
// ==================================================================

const stagingEuWest2SharedOptions = {
  s3BackendBucket: 'grit-coding-terraform-staging' as const, // bucket and dynamodb are created ahead in each aws account
  s3BackendDynamodbTable: 'grit-coding-terraform-staging' as const,
  profile: 'core-infra-staging-devops-demo',
  env: 'staging',
  region: 'eu-west-2' as const,
  projectPrefix: 'core-infra',
};

//cdktf core-infra-staging-github-action-stack
new GitHubActionRoleStack(app, 'core-infra-staging-github-action-stack', {
  s3BackendKey: `${keyPrefix}/gitHubActionRole.tfstate`,
  ...stagingEuWest2SharedOptions,
});

// ==================================================================
// Production EU WEST 2
// ==================================================================

const productionEuWest2SharedOptions = {
  s3BackendBucket: 'grit-coding-terraform-production' as const, // bucket and dynamodb are created ahead in each aws account
  s3BackendDynamodbTable: 'grit-coding-terraform-production' as const,
  profile: 'core-infra-production-devops-demo',
  env: 'production',
  region: 'eu-west-2' as const,
  projectPrefix: 'core-infra',
};

//cdktf core-infra-production-github-action-stack
new GitHubActionRoleStack(app, 'core-infra-production-github-action-stack', {
  s3BackendKey: `${keyPrefix}/gitHubActionRole.tfstate`,
  ...productionEuWest2SharedOptions,
});

app.synth();
