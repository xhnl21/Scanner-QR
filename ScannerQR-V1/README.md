Scaner-QR
cd Scaner-QR
npm install
Dependencias que se instalo
npm install @capacitor/android
npm install @capacitor-community/barcode-scanner
cofigurar AndroidManifest.xml
ruta ==>> android\app\src\main\AndroidManifest.xml
<manifest 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
        android:hardwareAccelerated="true">
    </application>

    <!-- Permissions -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-sdk tools:overrideLibrary="com.google.zxing.client.android" />
    <uses-permission android:name="android.permission.INTERNET" />

ionic serve
npx cap add android
npm run build
npx cap sync
npx cap open android
luego que abra android estudio esperar que instale las dependencias, buscar la opcion Build, luego Build blunde apk y build apk

Documentacion
https://github.com/capacitor-community/barcode-scanner

otras documentacion
https://stackoverflow.com/questions/67770356/ionic-vue-framework-capacitor-qrcode-scanner-issue

https://forum.ionicframework.com/t/qr-code-scanner-for-vue/217599/2

https://github.com/tony-xlh/capacitor-plugin-dynamsoft-barcode-reader/tree/main

https://www.dynamsoft.com/codepool/ionic-vue-qr-code-scanner.html

https://ionicframework.com/docs/v5/native/barcode-scanner

https://github.com/aaronksaunders/capacitor-vue-ionicv4-app/tree/master

https://github.com/capawesome-team/capacitor-mlkit/tree/main/packages/barcode-scanning