import fs from 'node:fs';
import path from 'path';
import {fileDirName} from './fileDirName';

export function getPackageNames() {
  const { __dirname } = fileDirName(import.meta);
  const packagesFolderPath = path.resolve(__dirname, path.relative(__dirname, 'packages'));

  const packageFolderNames = fs.readdirSync(packagesFolderPath);

  const packageJsonPaths = packageFolderNames.map((name) => path.join(packagesFolderPath, name, 'package.json'));

  const packageNames = packageJsonPaths.map((path) => {
    const packageFile = fs.readFileSync(path, {encoding:'utf8', flag:'r'});
    const packageJson = JSON.parse(packageFile);

    return packageJson.name
  });

  return packageNames;
}




