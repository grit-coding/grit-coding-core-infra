# 🚀 Core Infrastructure - Enterprise CDKTF Setup

A production-ready, scalable infrastructure-as-code solution built with AWS CDK for Terraform (CDKTF). This repository demonstrates best practices for managing multi-environment AWS infrastructure with type safety, maintainability, and developer experience at its core.

## ✨ Why Choose CDKTF?

Traditional infrastructure-as-code approaches often leave developers struggling with configuration drift, runtime errors, and limited tooling support. CDKTF transforms this experience by bringing the full power of TypeScript to infrastructure management. When you write infrastructure code with CDKTF, your IDE becomes your safety net - providing autocomplete, type checking, and refactoring capabilities that catch errors before they reach production.

The type safety extends beyond simple syntax checking. CDKTF ensures that resource configurations are validated at compile time, preventing the frustrating cycle of deploy-fail-fix that plagues traditional Terraform workflows. This means faster development cycles, fewer production incidents, and more confident deployments.

Enterprise teams particularly benefit from CDKTF's modular architecture. Instead of managing monolithic configuration files, you can create reusable components that encapsulate best practices and organizational standards. These components can be shared across teams, tested independently, and versioned like any other software package.

## 🏗️ Multi-Environment Excellence

This repository showcases a sophisticated multi-environment strategy that scales from startup to enterprise. Each environment - development, staging, and production - operates in complete isolation with its own AWS account, state storage, and deployment pipeline. This isolation prevents cross-environment contamination while enabling teams to experiment freely in development without risking production stability.

The configuration management approach eliminates duplication through shared option objects while maintaining environment-specific customizations. This pattern ensures consistency across environments while providing the flexibility needed for different operational requirements.

## 🔄 CI/CD Integration

Modern infrastructure demands modern deployment practices. This setup integrates seamlessly with GitHub Actions using OIDC authentication, eliminating the security risks associated with long-lived AWS credentials. Each environment has its own deployment workflow, enabling independent release cycles and reducing blast radius during deployments.

The automated formatting setup with Prettier and Husky ensures code consistency across all contributors. When new team members join, they automatically inherit the project's formatting standards without manual configuration.

## 🏛️ Project Structure

```
core-infra/
├── 📁 stacks/                    # Infrastructure components
│   ├── GitHubActionRoleStack.ts  # OIDC roles for CI/CD
│   ├── EcrStack.ts              # Container registries
│   ├── EcsStack.ts              # Container orchestration
│   └── S3Stack.ts               # Storage solutions
├── 📁 types/                     # Type definitions
│   ├── Region.ts                # AWS regions
│   ├── S3BackendBucket.ts       # Backend configuration
│   └── S3BackendDynamoTable.ts  # State locking
├── 📁 .github/workflows/         # CI/CD pipelines
│   ├── core-dev-deploy.yml      # Development deployment
│   ├── core-staging-deploy.yml  # Staging deployment
│   └── core-prod-deploy.yml     # Production deployment
├── main.ts                      # Application entry point
├── cdktf.json                   # CDKTF configuration
└── package.json                 # Dependencies & scripts
```

## 🚀 Quick Start

### Prerequisites

Node.js 20.9+, AWS CLI configured, Terraform CLI, and CDKTF CLI (`npm install -g cdktf-cli`)

### Setup

```bash
# Clone and install
git clone <repository-url>
cd core-infra
npm install

# Generate provider bindings
npm run get

# Build TypeScript
npm run build

# Preview changes
npm run synth
```

## 🔧 Available Commands

```bash
# Development
npm run build          # Compile TypeScript
npm run watch          # Watch mode compilation
npm run synth          # Generate Terraform JSON

# Testing
npm run test           # Run test suite
npm run test:watch     # Watch mode testing

# Code Quality
npm run format         # Format code with Prettier

# Infrastructure
cdktf deploy <stack>   # Deploy specific stack
cdktf destroy <stack>  # Destroy specific stack
cdktf diff <stack>     # Show planned changes
```

## 🏗️ Stack Architecture

The architecture follows a modular approach where each stack serves a specific purpose. The GitHubActionRoleStack establishes secure OIDC-based authentication for CI/CD pipelines, eliminating the need for long-lived credentials. The EcrStack provides private container registries with lifecycle policies for cost optimization, while the EcsStack handles container orchestration with auto-scaling capabilities. The S3Stack manages object storage with versioning and encryption enabled by default.

## 🔒 Security & Best Practices

Security is built into every layer of this setup. OIDC authentication ensures that deployment credentials are short-lived and scoped to specific operations. State files are encrypted at rest in S3 with DynamoDB providing state locking to prevent concurrent modifications. Environment isolation through separate AWS accounts provides defense in depth, while automated code scanning catches potential security issues before deployment.

## 📚 Why CDKTF Over Alternatives?

| Feature        | CDKTF             | Terraform HCL | CloudFormation |
| -------------- | ----------------- | ------------- | -------------- |
| Type Safety    | ✅ Full           | ❌ None       | ❌ Limited     |
| IDE Support    | ✅ Excellent      | ⚠️ Basic      | ⚠️ Basic       |
| Reusability    | ✅ High           | ⚠️ Medium     | ❌ Low         |
| Testing        | ✅ Unit Tests     | ❌ Limited    | ❌ Limited     |
| Ecosystem      | ✅ npm/TypeScript | ⚠️ Terraform  | ❌ AWS Only    |
| Learning Curve | ⚠️ Medium         | ✅ Low        | ⚠️ Medium      |
