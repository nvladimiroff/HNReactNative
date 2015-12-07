A simple HN React Native client. It currently only supports Android. It *should* work on iOS, but I haven't tested it.

### Building
Make sure you have npm and node (>4.0) installed.
````
git clone https://github.com/nvladimiroff/HNReactNative.git
npm install -g react-native-cli
````

Then make sure $ANDROID_HOME is set and an emulator is running and run:
````
react-native run-android
````

See Facebook's [getting started](https://facebook.github.io/react-native/docs/getting-started.html) or [android setup](https://facebook.github.io/react-native/docs/android-setup.html) pages for more details.
