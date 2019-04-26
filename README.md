# Iliria Newsletter Mobile App

<a href="https://github.com/jajosheni/newsletter-server"><img src="https://img.shields.io/badge/server-part-68a063.svg"/></a>
<img src="https://img.shields.io/badge/react-native-61dbfb.svg"/>
<img src="https://img.shields.io/badge/react-JS-ff00ff.svg"/>
<img src="https://img.shields.io/badge/fire-base-FBCB02.svg"/>

<h4 align="center">Cross Platform Digital newsletter application</h4>
<p align="center">
	<img src="https://img.shields.io/badge/description-Image-FB7774.svg"/>
</p>

### Installation

```console
$ npm install
$ react-native link @react-native-community/async-storage
```
### Start App
```console
$ emulator -list-avds
```
  Replace:<br/>
  `YOUR_EMULATOR` with one of your available avds.<br/>
  `YOUR_USERNAME` with your username on windows.
```console
$ C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\emulator\emulator.exe -avd YOUR_EMULATOR
$ npm run android
```

#### NOTE:
  1. Replace google-services.json at `/android/app`
  with your own file, you can get it from `firebase`.
  2. Put your own path of android SDK at `/android/local.properties/`
