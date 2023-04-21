# create-badut-dc

Initialize a new Discord.js bot project. An Discord.js starter kit.

```sh
npx create-badut-dc@latest
# or
yarn create badut-dc
# or
pnpm create badut-dc
```

### Generated app tree

```
.
├── src
│   ├── commands
│   │   ├── prefixes
│   │   │   ├── general
│   │   │   │   ├── help.js
│   │   │   │   └── ping.js
│   │   │   └── owner
│   │   │       └── eval.js
│   │   └── slash
│   │       └── general
│   │           └── ping.js
│   ├── common
│   │   └── functions.js
│   ├── events
│   │   ├── interactionCreate.js
│   │   ├── messageCreate.js
│   │   └── ready.js
│   └── index.js
├── .gitignore
├── .env
├── config.js
└── package.json
```