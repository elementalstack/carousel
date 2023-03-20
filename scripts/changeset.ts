import inquirer from 'inquirer';
import InquirerTable from 'inquirer-table-prompt'
import { createChangeset, createChangesetQuestions, getPackageNames } from './utils';

inquirer.registerPrompt("table", InquirerTable);

const packageNames = getPackageNames();
const changesetQuestions = createChangesetQuestions(packageNames);

const { packages } = await inquirer.prompt(changesetQuestions as any);

let changedPkgs: Record<string, string> = {};

for (let i = 0; i < packageNames.length; i++ ) {
  if (packages[i]) {
    changedPkgs[packageNames[i]] = packages[i];
  }
}

if (Object.values(changedPkgs).length > 0) {
  createChangeset(changedPkgs);
}


