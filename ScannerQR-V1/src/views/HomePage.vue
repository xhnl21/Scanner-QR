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
        {{ text }}     
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { loadingController, alertController } from '@ionic/vue';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { defineComponent } from 'vue';
export default defineComponent ({
  data(){ 
    return  {
      text:"",
    }
  },
  methods: {
        async startScan () {
          const bodies = document.querySelectorAll('body');
          console.log(bodies);
          bodies.forEach(body => {
            body.classList.add('barcode-scanner-active');
          });
          document.querySelector('body').classList.add('scanner-active');
          document.getElementById('app').style.display = 'none';

          const permission = await BarcodeScanner.checkPermission();
          if (permission.neverAsked) {
            // Permission has not been requested before
          
            BarcodeScanner.hideBackground();

            const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
            
            // if the result has content
            if (result.hasContent) {
              this.showLoading(result.content+2, true);
              console.log(result); // log the raw scanned content
              this.text = result.content
              document.getElementById('app').style.display = 'block';
            }

          } else if (permission.granted) {
            BarcodeScanner.hideBackground();

            const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
            
            // if the result has content
            if (result.hasContent) {
              this.showLoading(result.content+2, true);
              console.log(result); // log the raw scanned content
              this.text = result.content
              document.getElementById('app').style.display = 'block';
            }

          } else {
            // Permission denied, handle appropriately
            // ...
            this.showLoading("Permission denied, handle appropriately", true);
          }
        },
        async startScanB () {
          // const bodies = document.querySelectorAll('body');
          // console.log(bodies);
          // bodies.forEach(body => {
          //   body.classList.add('barcode-scanner-active');
          // });
          // document.querySelector('body').classList.add('scanner-active');
          // document.getElementById('app').style.display = 'none';
          
          // this.showLoading("init 0", true);
          // Check camera permission
          // This is just a simple example, check out the better checks below
          const status = await BarcodeScanner.checkPermission({ force: true });
          console.log(status);
          if (status.granted) {

            // make background of WebView transparent
            // note: if you are using ionic this might not be enough, check below
            BarcodeScanner.hideBackground();

            const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
            
            // if the result has content
            if (result.hasContent) {
              this.showLoading(result.content+2, true);
              console.log(result.content); // log the raw scanned content
              this.text = result.content
              document.getElementById('app').style.display = 'block';
            }
          } else {
            this.showLoading(status+3, true);
          }          
        },
    },
  setup() {
    const showLoading = async (msj, type) => {
          if (type === false) {
            const loading = await loadingController.create({
                message: msj,
                duration: 1000
            });
            loading.present();
            return 0;
          }
          const alert = await alertController.create({
              // header: 'Error',
              // subHeader: 'Important message',
              message: msj,
              buttons: ['OK'],
          });
          await alert.present();
    }
    const startScanA = async () => {
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
      startScanA, showLoading
    }
  }
});
</script>

<style scoped>
body.scanner-active {
  visibility: hidden;
  --background: transparent;
  --ion-background-color: transparent;
}

.ios body.scanner-active {
  visibility: hidden;
  --background: transparent;
  --ion-background-color: transparent;
}

.md body.scanner-active {
  visibility: hidden;
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
