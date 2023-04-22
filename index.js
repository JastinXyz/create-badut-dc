#!/usr/bin/env node
const prompts = require("prompts");
const fs = require("fs");
const path = require("path");
const pc = require('picocolors');
const { spawnSync } = require('child_process');
const ms = require('ms');

async function main() {
  const response = await prompts([
    {
      type: "text",
      name: "name",
      message: "What's the project name?",
      validate: (value) => {
        if (!value) return "Project name is required!";
  
        if (fs.existsSync(value)) return `The ${value} directory is exists!`;
        if (/^([A-Za-z\-\_\d])+$/.test(value)) return true;
        return "Invalid project name!";
      },
    },
    {
      type: "text",
      name: "token",
      message: "Your bot token. (Optional)",
      initial: ""
    },
  ]);

  let { name, token } = response;
  if (!name) return;

  let packageDotJson = `{
  "name": "${name}",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node ."
  },
  "dependencies": {
    "discord.js": "^14.9.0",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "ms": "^2.1.3"
  }
}
`;

  const start = Date.now();
  copyRecursiveSync(`${__dirname}/template`, name);
  await fs.writeFileSync(name + '/package.json', packageDotJson);
  await fs.writeFileSync(name + '/.env', `TOKEN=${token}`);
  await fs.renameSync(name + '/gitignore', name + '/.gitignore');

  console.log(`Initialized new project at ./${name}`);

  let echoInstall = '\n\nInstalling dependencies:\n';
  let parsedPackageJson = JSON.parse(packageDotJson);
  Object.keys(parsedPackageJson.dependencies).map((x) => echoInstall += `  * ${pc.cyan(`${x}@${parsedPackageJson.dependencies[x]}`)}\n`)

  console.log(echoInstall);

  let packageManager = getPkgManager();
  spawnSync(`cd ${name} && ${packageManager === 'yarn' ? packageManager : packageManager + ' install'}`, {
    stdio: "inherit",
    shell: true,
  });
  
  const end = Date.now();
  const total = ms(end - start);
  console.log(`finisihed in ${total}`);
  console.log(`now you are ready to start:\n  * ${pc.cyan(`cd ${name}`)}${token.length ? `` : `\n  * ${pc.cyan(`Edit yout bot token in .env`)}`}\n  * ${pc.cyan(`Customize the bot configuration in config.js`)}`)
}

function copyRecursiveSync(src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function getPkgManager() {
  const e = process.env.npm_config_user_agent;
  if(e.startsWith('yarn')) return 'yarn';
  if(e.startsWith('pnpm')) return 'pnpm';

  return 'npm';
}

main();