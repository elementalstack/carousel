import fs from 'node:fs'
import path from 'path'
import {fileDirName} from './fileDirName';
import { faker } from '@faker-js/faker'

export function createChangeset(pkgs: Record<string, string>) {
  const { __dirname } = fileDirName(import.meta);
  const changesetFolderPath = path.resolve(__dirname, path.relative(__dirname, '.changeset'));

  const isNotExists = !fs.existsSync(changesetFolderPath);

  if (isNotExists) {
    fs.mkdirSync(changesetFolderPath);
  }

  const fileName = faker.random.words().split(' ').join('-').toLowerCase();

  const changesetFilePath = path.join(changesetFolderPath, `${fileName}.json`);

  fs.writeFileSync(changesetFilePath, JSON.stringify(pkgs))
}



