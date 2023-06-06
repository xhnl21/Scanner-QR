<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Scanner Qr</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Scanner Qr</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-button @click="startScan">
          Scanner Qr
        </ion-button>        
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { defineComponent } from 'vue';
export default defineComponent ({
  data(){ 
    return  {
      text:"",
    }
  },
  setup() {
    const startScan = async () => {
      console.log("demo");
      // Check camera permission
      // This is just a simple example, check out the better checks below
      await BarcodeScanner.checkPermission({ force: true });

      // make background of WebView transparent
      // note: if you are using ionic this might not be enough, check below
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      console.log(result);
      // if the result has content
      if (result.hasContent) {
        console.log(result.content); // log the raw scanned content
        this.text = result.content
      }
    }
    return {     
      startScan,
    }
  }
});
</script>

<style scoped>
body.scanner-active {
  --background: transparent;
  --ion-background-color: transparent;
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
