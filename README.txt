BUILD THE APK (one time setup, on a PC with internet)

Install first:  Node.js (nodejs.org), Android Studio (developer.android.com/studio)

1. Open a terminal in this folder and run:
      npm install
      npm run android
   (downloads the libraries for offline use, creates the Android project,
    adds camera permission, and opens Android Studio)

2. In Android Studio wait for Gradle to finish, then:
      Build > Build Bundle(s) / APK(s) > Build APK(s)
   The file is at: android/app/build/outputs/apk/debug/app-debug.apk

3. Copy app-debug.apk to the phone and install it
   (allow "Install unknown apps" when asked).

Notes: your data is stored inside the app on that phone. Updating the app by
installing a new APK with the same app id keeps the data.
