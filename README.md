### **Node.js App** template using **`Typescript`** with **`ts-node-dev`** and **`paths`**, **`Eslint`** with **`Standard`** style, **`Jest`** and **`Husky`** with **`lint-staged`**.

# Step-by-step

> 1 - [Npm](#npm)

> 2 - [Git](#git)

> - 2.1 - [Git commit message linter (optional)](#install-git-commit-message-linter-optional)

> 3 - [Typescript](#typescript)

> 4 - [Typescript Tools](#typescript-tools)

> - 4.1 - [Dev Script](#dev-script)

> - 4.2 - [Dev Script with path mapping](#dev-script-with-path-mapping)

> - 4.3 - [Build Script](#build-script)

> - 4.3 - [Build Script with path mapping](#build-script-with-path-mapping)

> - 4.4 - [Start Script](#start-script)

> - 4.5 - [Rimraf (optional)](#rimraf)

> - 4.6 - [Typescript config file](#the-tsconfigjson-file-should-be-like)

> 5 - [Eslint](#eslint)

> - 5.1 - [Eslint config file](#the-eslintrcjson-file-should-be-like-using-standard)

> 6 - [Prettier](#prettier)

> 7 - [Jest](#jest)

> - 7.1 - [Test Script](#add-npm-test-script-in-packagejson)

> - 7.2 - [Jest config file](#the-jestconfigts-file-should-be-like)

> 8 - [Lint Staged](#lint-staged)

> 9 - [Husky](#husky)

---

# Npm

- Initialize `Node Package Manager`:

```sh
npm init -y
```

---

# Git

- Initialize `Git`:

```sh
git init
```

- Create `.gitignore` file:

  - On linux:

```sh
touch .gitignore
```

- Add `node_modules` folder to `.gitignore` file:

```ts
node_modules
```

- #### Install `git commit message linter` (optional):

```sh
npm i -D git-commit-msg-linter
```

---

# Typescript

- Install `Typescript`:

```sh
npm i -D typescript @types/node
```

- Create `tsconfig.json` file:

```sh
npx tsc --init
```

- A new `tsconfig.json` file as below will be created:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

- Set `rootDir` and `outDir` compilerOptions in `tsconfig.json`:

```json
"rootDir": "src",
"outDir": "dist",
```

- Add `dist` folder to `.gitignore` file:

```sh
node_modules
dist
```

---

# Typescript Tools

- Install `ts-node-dev`:

```sh
npm i -D ts-node-dev
```

## Dev script:

- Add npm `dev script` in `package.json`:

```json
"dev": "tsnd --respawn --transpile-only --ignore-watch node_modules src/main/index.ts",
```

## Dev script with Path Mapping:

- If you're using `paths` in `tsconfig.json`:

```json
"baseUrl": "src",
"paths": {"@/*": ["*"]},
```

- Install `tsconfig-paths`:

```sh
npm i -D tsconfig-paths
```

- Add `-r tsconfig-paths/register` to npm `dev script` in `package.json`:

```json
"dev": "tsnd -r tsconfig-paths/register --respawn --transpile-only --ignore-watch node_modules src/main/index.ts",
```

## Build script:

- Add npm `build script` in `package.json`:

```json
"build": "tsc -p tsconfig.json",
```

- To ensure build without `test files`, create `tsconfig.build.json` file extending from `tsconfig.json` and add tests extensions to exclude options:

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["src/**/*.spec.ts", "src/**/*.test.ts", "**/tests"]
}
```

- Pass `tsconfig.build.json` to npm `build script` in `package.json`:

```json
"build": "tsc -p tsconfig.build.json",
```

## Build script with Path Mapping:

- To `build` the project, install `tsc-paths-resolver`:

```sh
npm i -D tsc-paths-resolver
```

- Add `tsc-paths` config to npm `build script` in `package.json`:

```json
"build": "tsc -p tsconfig.build.json && tsc-paths -p tsconfig.build.json -s ./src -o ./dist",
```

## Start script:

- Add npm `start script` in `package.json`:

```json
"start": "npm run build && node dist/main/index.js",
```

## Rimraf:

- Install `rimraf` to clear `dist folder` before build (optional):

```sh
npm i -D rimraf
```

- Add `rimraf dist &&` to npm `build script` in `package.json`:

```json
"build": "rimraf dist && tsc -p tsconfig.build.json && tsc-paths -p tsconfig.build.json -s ./src -o ./dist",
```

- #### The `tsconfig.json` file should be like:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "lib": ["es6"],
    "module": "commonjs",
    "rootDir": "src",
    "outDir": "dist",
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    },
    "typeRoots": ["./node_modules/@types", "./src/@types"],
    "removeComments": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

---

# Eslint

- Install `eslint`:

- Obs: Make sure you have the Eslint VSCode extension installed.

```sh
npm i -D eslint
```

- Initialize `eslint` configs and follow the steps:

```sh
npm init @eslint/config
```

- Add `node_modules` and `dist` folders to `.eslintignore` file:

```sh
node_modules
dist
```

- #### The `.eslintrc.json` file should be like (using `Standard`):

```json
{
  "env": {
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": ["standard"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {}
}
```

---

# Prettier

- Install `plugins` to use `Prettier` with `Eslint` and `Standard Style`:

```sh
npm i -D eslint-plugin-prettier eslint-config-prettier prettier-config-standard
```

- Install `Prettier`:

```sh
npm i -D prettier
```

- Then, install `eslint-config-prettier-standard`:

```sh
npm i -D eslint-config-prettier-standard
```

- #### The `.eslintrc.json` extends should be like:

```json
"extends": [
  "prettier-standard"
],
```

---

# Jest

- Install `jest` and `ts-jest`:

```sh
npm i -D jest @types/jest ts-jest
```

- Initialize `Jest` configs and follow the steps:

```sh
npx jest --init
```

- Set `preset` to `ts-jest` in `jest.config.js`:

```js
preset: 'ts-jest'
```

- If you're using `paths`, set `moduleNameMapper` to `ts-jest` in `jest.config.js`:

```js
moduleNameMapper: {
  '@/(.*)': '<rootDir>/src/$1'
},
```

- Add `coverage` folder to `.gitignore` file:

```sh
node_modules
dist
coverage
```

- #### Add npm `test script` in `package.json`:

```json
"test": "jest --passWithNoTests",
"test:watch": "npm test -- --watch",
```

- #### The `jest.config.ts` file should be like:

```ts
export default {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  preset: 'ts-jest'
}
```

---

# Lint Staged

- Install `lint staged`:

```sh
npm i -D lint-staged
```

- #### Add npm `test script` helper in `package.json`:

```json
"test:staged": "npm test -- --findRelatedTests",
```

- Create `.lintstagedrc.json` file and set configs:

```json
{
  "*.ts": ["eslint 'src/**' --fix", "npm run test:staged"]
}
```

---

# Husky

- Install `husky` ( [Why install as below?](https://stackoverflow.com/questions/50048717/lint-staged-not-running-on-precommit#:~:text=70-,In%202021,-Sometimes%20hooks%20are) ):

```sh
npm i -D husky@4
```

```sh
npm i -D husky
```

- #### Add npm `test script` helper in `package.json`:

```json
"test:ci": "npm test -- --coverage",
```

- Create `.huskyrc.json` file and set `pre-commit` and `pre-push` `hooks`:

```json
{
  "hooks": {
    "pre-commit": "npx lint-staged",
    "pre-push": "npm run test:ci"
  }
}
```

---
