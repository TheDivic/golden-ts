#!/usr/bin/env tsx

import { execSync } from "child_process";
import { prompt } from "enquirer";

const BRANCH_TYPES = [
  "feat",
  "fix",
  "docs",
  "style",
  "refactor",
  "perf",
  "test",
  "build",
  "ci",
  "chore",
  "revert",
] as const;

type BranchType = (typeof BRANCH_TYPES)[number];

interface BranchPrompt {
  type: BranchType;
  description: string;
}

async function main() {
  try {
    // Ensure we're on main branch and up to date
    execSync("git checkout main");
    execSync("git pull origin main");

    // Get branch details from user
    const answers = await prompt([
      {
        type: "select",
        name: "type",
        message: "What type of branch is this?",
        choices: BRANCH_TYPES.slice(),
      },
      {
        type: "input",
        name: "description",
        message: "Enter a brief description (use-kebab-case):",
        validate: (value: string) => {
          // Allow letters, numbers, hyphens, and forward slashes
          if (!/^[a-z0-9-\/]+$/.test(value)) {
            return "Please use kebab-case (lowercase letters, numbers, hyphens, and forward slashes only)";
          }
          // Ensure no consecutive hyphens or slashes
          if (/--/.test(value) || /\/\//.test(value)) {
            return "Please avoid consecutive hyphens or slashes";
          }
          // Ensure doesn't start or end with hyphen or slash
          if (/^[-\/]/.test(value) || /[-\/]$/.test(value)) {
            return "Branch description cannot start or end with a hyphen or slash";
          }
          return true;
        },
      },
    ]);
    const { type, description } = answers as BranchPrompt;

    // Create and checkout new branch
    const branchName = `${type}/${description}`;
    execSync(`git checkout -b ${branchName}`);

    console.log(`\nSuccessfully created and switched to branch: ${branchName}`);
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
