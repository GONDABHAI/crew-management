// Adds camera permission to the Android manifest (needed for the Capture photo button).
const fs = require('fs'), f = 'android/app/src/main/AndroidManifest.xml';
let m = fs.readFileSync(f, 'utf8');
if (!m.includes('android.permission.CAMERA')) {
  m = m.replace('</manifest>', '    <uses-permission android:name="android.permission.CAMERA" />\n    <uses-feature android:name="android.hardware.camera" android:required="false" />\n</manifest>');
  fs.writeFileSync(f, m); console.log('Camera permission added.');
}
