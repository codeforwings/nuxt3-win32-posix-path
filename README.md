# CodeForWings - Path Cheatsheet
* [GH Page](https://codeforwings.github.io/nuxt3-win32-posix-path/)
* [GH Repo](https://github.com/codeforwings/nuxt3-win32-posix-path/)
## Replacement Scripts
```js
inPathWin32.replace(/\\/g,"/");
```

## Binary Test Strategy
```bash
pnpm run test:unit
pnpm run build-bins

mocha --recursive --timeout 10000 --exit tests/cli/wsl/wsl-cli-to-wsl.test.mjs

```

## Next Steps
* Migrate UI to VitePress
* Cleanup and move to src/ and test/ etc.
* For UX, i feel like just convert everything from backslash to slash
  * then dont have to deal with anything... have to double check spaces
* Update nuxt version / vuetify
* Recordings / Documentation
* auto combine docs into one dashboard / repo
* node path / glob
* Python? maybe later... Pathlike etc.
* file url?

## Dev Steps
* Publish package
* use pkg
* try various path with wsl etc.
* generate path using nodejs and c:/users/public
* append wsl commands?

---
# Nuxt 3 Minimal Starter






Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

