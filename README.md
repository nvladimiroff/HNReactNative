A simple HN React Native client. It currently only supports Android. It *should* work on iOS, but I haven't tested it.

### Building
First, make sure you have npm and node (>4.0) installed. Next, install the react developer tools.
````
npm install -g react-native-cli
````

Then clone the repo and download the dependancies.
````
git clone https://github.com/nvladimiroff/HNReactNative.git
cd HNReactNative
npm install
````

Then finally, make sure $ANDROID_HOME is set and an emulator is running and run:
````
react-native run-android
````

You can then press the menu button on the emulator to get to the debug options which let you set up things like automatic code reloading.

See Facebook's [getting started](https://facebook.github.io/react-native/docs/getting-started.html) or [android setup](https://facebook.github.io/react-native/docs/android-setup.html) pages for more details.
