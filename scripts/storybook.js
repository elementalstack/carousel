const spawn = require('child_process').spawn;

const package = process.argv.pop();

spawn('npm run storybook', ['-w', `@elementalstack/${package}`], { shell: true, stdio: 'inherit' });

