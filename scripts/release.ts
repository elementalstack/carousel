import fs from 'node:fs'
import path from 'path'
import { spawn } from 'node:child_process'
import { fileDirName } from './utils';

const { __dirname } = fileDirName(import.meta);

const changesetFolderPath = path.resolve(__dirname, path.relative(__dirname, '.changeset'));

const [changelogFileName] = fs.readdirSync(changesetFolderPath)

const changelogPath = path.join(changesetFolderPath, changelogFileName);

const changelog = fs.readFileSync(changelogPath, {encoding:'utf8', flag:'r'});

const targets = Object.entries(JSON.parse(changelog));

for (let [name, version] of targets) {
  spawn(`npm run release ${version}`, ['-w', name], { shell: true, stdio: 'inherit' });
}
