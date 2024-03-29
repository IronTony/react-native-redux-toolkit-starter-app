# React Native Redux Toolkit Start App  <!-- omit in toc -->

> A React Native boilerplate app to bootstrap your next app with Redux Toolkit and Saga!

## 🔥🔥🔥 Upgraded to the latest React-Native (> 0.72.x) with brand New Architecture (Fabric) 🔥🔥🔥

<br/>
<div align="center">
    <img src="./react-native-starter-kit.png" width="100%" /> 
</div>

## 🔥🔥 Checkout also my brand new React Native React-Query (no redux toolkit) [here](https://github.com/IronTony/react-native-react-query-starter-app) 🔥🔥

[![License](https://img.shields.io/github/license/IronTony/react-native-redux-toolkit-starter-app)](LICENSE)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-screen.svg?style=flat)](#contributors-:sparkles:)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Issues](https://img.shields.io/github/issues/IronTony/react-native-redux-toolkit-starter-app.svg)](https://github.com/IronTony/react-native-redux-toolkit-starter-app/issues)

<img src="https://img.icons8.com/color/48/000000/travis-ci.png" width="30px" /> [![Build](https://travis-ci.com/IronTony/react-native-redux-toolkit-starter-app.svg?branch=master)](https://travis-ci.com/IronTony/react-native-redux-toolkit-starter-app)

[![Build](https://img.shields.io/badge/iOS%20Tested-success-brightgreen.svg)](https://github.com/IronTony/react-native-redux-toolkit-starter-app)
[![Build](https://img.shields.io/badge/Android%20Tested-success-brightgreen.svg)](https://github.com/IronTony/react-native-redux-toolkit-starter-app)

<a href="https://www.buymeacoffee.com/IronTony" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-blue.png" alt="Buy Me A Coffee" width="217px" /></a>

# Table of Contents <!-- omit in toc -->

- [🔥🔥🔥 Upgraded to the latest React-Native (\> 0.72.x) with brand New Architecture (Fabric) 🔥🔥🔥](#-upgraded-to-the-latest-react-native--072x-with-brand-new-architecture-fabric-)
- [🔥🔥 Checkout also my brand new React Native React-Query (no redux toolkit) here 🔥🔥](#-checkout-also-my-brand-new-react-native-react-query-no-redux-toolkit-here-)
- [Installation :inbox\_tray:](#installation-inbox_tray)
- [Rename project and bundles :memo: :package:](#rename-project-and-bundles-memo-package)
  - [iOS \& Android](#ios--android)
- [Environment Setup :globe\_with\_meridians:](#environment-setup-globe_with_meridians)
- [Scripts :wrench:](#scripts-wrench)
  - [Run the app](#run-the-app)
  - [Generate app icons](#generate-app-icons)
  - [Generate Splashscreen](#generate-splashscreen)
  - [To enabled React-Native (Fabric) new architecture](#to-enabled-react-native-fabric-new-architecture)
  - [Setup iOS](#setup-ios)
  - [Typescript (optional)](#typescript-optional)
  - [ATTENTION Circular dependencies script checker](#attention-circular-dependencies-script-checker)
- [Roadmap :running:](#roadmap-running)
- [Screenshots](#screenshots)
- [Contributors :sparkles:](#contributors-sparkles)
- [License :scroll:](#license-scroll)

---

## Installation :inbox_tray:

```bash
# Setup your project
> npx degit IronTony/react-native-redux-toolkit-starter-app your-new-app

> cd your-new-app

# Install dependencies
> yarn

# if needed, setup iOS development environment
yarn setup:ios
```

See [`environment`](#environment-setup-:globe_with_meridians:) section for how to configure env variables.

See [`scripts`](#scripts-:wrench:) section for how to run the app.

---

## Rename project and bundles :memo: :package:

To rename the project and bundles, just follow these steps:

### iOS & Android

Run `npx react-native-rename [name] -b [bundle-identifier]` from the project root

Example:
`npx react-native-rename "Test New App" -b com.testnewapp`

---

## Environment Setup :globe_with_meridians:

`React Native Starter App` environments variables management is based on a custom script and the `app.json` config file.

Define your environment variables inside `app.json` inside the `environments` object under the desired
environment key (such as `development`, `staging` or `production`) and then run the app for the required env
using one of the available run scripts (e.g. `ios:dev`).

If you want to use IDEs such Xcode or Android Studio, you have to set up the ENV variables with these commands:

- `yarn env:dev`, to set the development ENV variables
- `yarn env:stage`, to set the staging ENV variables
- `yarn env:prod`, to set the production ENV variables

If you want to use this in any file, just:

`import env from '@env';`

and use like this:

`env.API_URL`

---

## Scripts :wrench:

### Run the app

To run the app use one of the following scripts:

- `yarn android:dev`, to start the app on Android with the `development` environment variables.
- `yarn android:stage`, to start the app on Android with the `staging` environment variables.
- `yarn android:prod`, to start the app on Android with the `production` environment variables.

- `yarn ios:dev`, to start the app on iOS with the `development` environment variables.
- `yarn ios:stage`, to start the app on iOS with the `staging` environment variables.
- `yarn ios:prod`, to start the app on iOS with the `production` environment variables.

If using the `ios` commands you will receive an error like this:

<img src="./docs/error.png" maxWidth="700px" />

Just do the following steps:

- Launch Xcode
- Settings
- Locations

Make sure there's a dropdown option selected for the command line tools
NOTE: Even if you're seeing Command Line Tools dropdown being selected with proper version, you might want to re-select it again. It will ask for login password.

<img src="./docs/ios_locations.png" maxWidth="700px" />

_REMEMBER: The Command Line Tools should be the latest one or the one matching your Xcode version_


### Generate app icons

To setup the app icons:

- create an image at least `1024x1024px`
- place it under `/assets` folder as `icon.png`
- run

```sh
yarn assets:icons
```

### Generate Splashscreen

To setup the iOS app splashscreen:

- create an image at least `1242x2208px`
- place it under `/assets` folder as `ios_splashscreen.png`
- run

```sh
yarn assets:splashscreen:ios
```

To setup the Android app splashscreen:

- create an image at least `150x134px`
- place it under `/assets` folder as `android_splashscreen.png`
- run

```sh
yarn assets:splashscreen:android
```

If you want to customize the output icon, open the `package.json` file and customized the backgtound color, size, ..... in the following command `assets:splashscreen:android`


### To enabled React-Native (Fabric) new architecture

Check the official documentation [here](https://reactnative.dev/docs/new-architecture-intro)

### Setup iOS

To setup the environment to run on iOS, run

```sh
yarn setup:ios
```

this will run `cocoapods` to install all the required dependencies.

### Typescript (optional)

The use of Typescript in the project is not mandatory.
You can just write all your code using plain Javascript.
Our hint is to create all files as below:

- files with logic and Views with `tsx` extension
- files with Stylesheet and others with `ts` extension

To enable full Typescript checks, just open the `tsconfig.json` file and chage as below:<br/>

```
"noImplicitAny": true, // set to true to be explicit and declare all types now<br/>
"strict": true,  // enable it to use fully Typescript set of invasive rules<br/>
```

_REMEMBER: the entry point file in the root of the project MUST be index.js_

---

### ATTENTION Circular dependencies script checker

If running this script `dependencies:graph`, you get this error:
`Error: Graphviz could not be found. Ensure that "gvpr" is in your $PATH`

If you are on a Mac: `brew install graphviz`
On Windows, after installation, do this: <img src="https://user-images.githubusercontent.com/24865815/91755813-b8224a00-eb99-11ea-9489-10973000c043.png" maxWidth="700px" />

## Roadmap :running:

✅ Initial Setup<br/>
✅ `react-native-bootsplash` (https://github.com/zoontek/react-native-bootsplash)<br/>
✅ `react-native-toolbox` to generate Splashscreen and icons automagically (https://github.com/Forward-Software/react-native-toolbox)<br/>
✅ Standard tree folders structure<br/>
✅ `React-Native 0.72.6`<br/>
✅ `redux-toolkit`<br/>
✅ `redux-persist` (https://github.com/rt2zz/redux-persist)<br/>
✅ `React Native Debugger`<br/>
✅ `redux-saga`<br/>
✅ `i18next`<br/>
✅ `react-navigation v6` ❤️<br/>
✅ `Tamagui` as design system<br />
✅ `Env` variables selection experimental way ⚗️⚗️⚗️<br />
✅ Typescript (optional use. Read the DOC above)<br />


---

## Screenshots

<div align="center">
    <img src="./screenshots/screenshot1.png" width="50%" />
</div>

<div align="center">
    <img src="./screenshots/screenshot2.png" width="50%" /> 
</div>

<div align="center">
    <img src="./screenshots/screenshot3.png" width="50%" />
</div>

---

## Contributors :sparkles:

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/IronTony"><img src="https://avatars3.githubusercontent.com/u/3645225?v=4" width="100px;" alt=""/><br /><sub><b>IronTony</b></sub></a><br /><a href="#ideas-IronTony" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/IronTony/react-native-redux-toolkit-starter-app/commits?author=IronTony" title="Code">💻</a> <a href="https://github.com/IronTony/react-native-redux-toolkit-starter-app/commits?author=IronTony" title="Documentation">📖</a> <a href="https://github.com/IronTony/react-native-redux-toolkit-starter-app/issues?q=author%3AIronTony" title="Bug reports">🐛</a> <a href="#maintenance-IronTony" title="Maintenance">🚧</a> <a href="#platform-IronTony" title="Packaging/porting to new platform">📦</a> <a href="#question-IronTony" title="Answering Questions">💬</a> <a href="https://github.com/IronTony/react-native-redux-toolkit-starter-app/pulls?q=is%3Apr+reviewed-by%3AIronTony" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/IronTony/react-native-redux-toolkit-starter-app/commits?author=IronTony" title="Tests">⚠️</a> <a href="#example-IronTony" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

---

## License :scroll:

Licensed under [Mozilla Public License Version 2.0](LICENSE)
