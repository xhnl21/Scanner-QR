<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-button @click="startScan">
          Scanner Qr
        </ion-button>   

        <ion-button @click="scanSingleBarcode">
          scanSingleBarcode Scanner Qr 
        </ion-button>  
        
        <ion-button @click="scanSingleBarcode">
          isSupported Scanner Qr 
        </ion-button>  
                
        <ion-button @click="checkPermissions">
          checkPermissions Scanner Qr 
        </ion-button>  
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';

const checkPermissions = async () => {
  const { camera } = await BarcodeScanner.checkPermissions();
  console.log(camera);    
  return camera;
};

const isSupported = async () => {
  const { supported } = await BarcodeScanner.isSupported();
  console.log(supported);  
  return supported;
};

const startScan = async () => {
  // The camera is visible behind the WebView, so that you can customize the UI in the WebView.
  // However, this means that you have to hide all elements that should not be visible.
  // You can find an example in our demo repository.
  // In this case we set a class `barcode-scanner-active`, which then contains certain CSS rules for our app.
  document.querySelector('body')?.classList.add('barcode-scanner-active');

  // Add the `barcodeScanned` listener
  const listener = await BarcodeScanner.addListener(
    'barcodeScanned',
    async result => {
      console.log(result.barcode);
    },
  );

  // Start the barcode scanner
  await BarcodeScanner.startScan();
};

const stopScan = async () => {
  // Make all elements in the WebView visible again
  document.querySelector('body')?.classList.remove('barcode-scanner-active');

  // Remove all listeners
  await BarcodeScanner.removeAllListeners();

  // Stop the barcode scanner
  await BarcodeScanner.stopScan();
};

const scanSingleBarcode = async () => {
  return new Promise(async resolve => {
    document.querySelector('body')?.classList.add('barcode-scanner-active');

    const listener = await BarcodeScanner.addListener(
      'barcodeScanned',
      async result => {
        await listener.remove();
        document
          .querySelector('body')
          ?.classList.remove('barcode-scanner-active');
        await BarcodeScanner.stopScan();
        resolve(result.barcode);
      },
    );

    await BarcodeScanner.startScan();
  });
};

</script>

<style scoped>
body.barcode-scanner-active {
  visibility: hidden;
  --background: transparent;
  --ion-background-color: transparent;
}

.barcode-scanner-modal {
  visibility: visible;
}

@media (prefers-color-scheme: dark) {
  .barcode-scanner-modal {
    --background: transparent;
    --ion-background-color: transparent;
  }
}

#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
