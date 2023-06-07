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

  <canvas ref="canvas"></canvas>

      <div id="container">        
        <ion-button @click="startScan">
          Scanner Qr
        </ion-button>        
      </div>
    </ion-content>
  </ion-page>
</template>

<script >
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { defineComponent } from 'vue';
export default defineComponent({
  name: "App",
  data() {
    return {
      ctx: {},
      speedGradient:{},
      rpmGradient:{},
      timer:""
    };
  },
  mounted() {
    const canvas = this.$refs.canvas;
    canvas.width = 500;
    canvas.height = 500;

    const ctx = canvas.getContext('2d');
    this.ctx = ctx;
    ctx.scale(1,1);

    const speedGradient = ctx.createLinearGradient(0, 500, 0, 0);
    speedGradient.addColorStop(0, '#00b8fe');
    speedGradient.addColorStop(1, '#41dcf4');
    this.speedGradient = speedGradient;

    const rpmGradient = ctx.createLinearGradient(0, 500, 0, 0);
    rpmGradient.addColorStop(0, '#f7b733');
    rpmGradient.addColorStop(1, '#fc4a1a');
    this.rpmGradient = rpmGradient;
    //rpmGradient.addColorStop(1, '#EF4836');    
  },
  created() {
    this.setSpeed();
  },
  methods : {
    speedNeedle(rotation) {
        this.ctx.lineWidth = 2;
        this.ctx.save();
        this.ctx.translate(250, 250);
        this.ctx.rotate(rotation);
        this.ctx.strokeRect(-130 / 2 + 170, -1 / 2, 135, 1);
        this.ctx.restore();
        rotation += Math.PI / 180;
    },
    rpmNeedle(rotation) {
        this.ctx.lineWidth = 2;
        this.ctx.save();
        this.ctx.translate(250, 250);
        this.ctx.rotate(rotation);
        this.ctx.strokeRect(-130 / 2 + 170, -1 / 2, 135, 1);
        this.ctx.restore();
        rotation += Math.PI / 180;
    },
    drawMiniNeedle(rotation, width, speed) {
        this.ctx.lineWidth = width;
        this.ctx.save();
        this.ctx.translate(250, 250);
        this.ctx.rotate(rotation);
        this.ctx.strokeStyle = "#333";
        this.ctx.fillStyle = "#333";
        this.ctx.strokeRect(-20 / 2 + 220, -1 / 2, 20, 1);
        this.ctx.restore();

        const x = (250 + 180 * Math.cos(rotation));
        const y = (250 + 180 * Math.sin(rotation));

        this.ctx.font = "700 20px Open Sans";
        this.ctx.fillText(speed, x, y);

        rotation += Math.PI / 180;
    },

    calculateSpeedAngle(x, a, b) {
        const degree = (a - b) * (x) + b;
        const radian = (degree * Math.PI) / 180;
        return radian <= 1.45 ? radian : 1.45;
    },

    calculateRPMAngel(x, a, b) {
        const degree = (a - b) * (x) + b;
        const radian = (degree * Math.PI) / 180;
        return radian >= -0.46153862656807704 ? radian : -0.46153862656807704;
    },

    drawSpeedo(speed, gear, rpm, topSpeed) {
        if (speed == undefined) {
            return false;
        } else {
            speed = Math.floor(speed);
            rpm = rpm * 10;
        }

        this.ctx.clearRect(0, 0, 500, 500);
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(0, 0, 0, .9)';
        this.ctx.arc(250, 250, 240, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.save()
        this.ctx.restore();
        this.ctx.fillStyle = "#FFF";
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#333";
        this.ctx.lineWidth = 10;
        this.ctx.arc(250, 250, 100, 0, 2 * Math.PI);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.arc(250, 250, 240, 0, 2 * Math.PI);
        this.ctx.stroke();

        this.ctx.font = "700 70px Open Sans";
        this.ctx.textAlign = "center";
        this.ctx.fillText(speed, 250, 220);

        this.ctx.font = "700 15px Open Sans";
        this.ctx.fillText("mph", 250, 235);

        if (gear == 0 && speed > 0) {
            this.ctx.fillStyle = "#999";
            this.ctx.font = "700 70px Open Sans";
            this.ctx.fillText('R', 250, 460);

            this.ctx.fillStyle = "#333";
            this.ctx.font = "50px Open Sans";
            this.ctx.fillText('N', 290, 460);
        } else if (gear == 0 && speed == 0) {
            this.ctx.fillStyle = "#999";
            this.ctx.font = "700 70px Open Sans";
            this.ctx.fillText('N', 250, 460);

            this.ctx.fillStyle = "#333";
            this.ctx.font = "700 50px Open Sans";
            this.ctx.fillText('R', 210, 460);

            this.ctx.font = "700 50px Open Sans";
            this.ctx.fillText(parseInt(gear) + 1, 290, 460);
        } else if (gear - 1 <= 0) {
            this.ctx.fillStyle = "#999";
            this.ctx.font = "700 70px Open Sans";
            this.ctx.fillText(gear, 250, 460);

            this.ctx.fillStyle = "#333";
            this.ctx.font = "50px Open Sans";
            this.ctx.fillText('R', 210, 460);

            this.ctx.font = "700 50px Open Sans";
            this.ctx.fillText(parseInt(gear) + 1, 290, 460);
        } else {
            this.ctx.font = "700 70px Open Sans";
            this.ctx.fillStyle = "#999";
            this.ctx.fillText(gear, 250, 460);

            this.ctx.font = "700 50px Open Sans";
            this.ctx.fillStyle = "#333";
            this.ctx.fillText(gear - 1, 210, 460);
            if (parseInt(gear) + 1 < 7) {
                this.ctx.font = "700 50px Open Sans";
                this.ctx.fillText(parseInt(gear) + 1, 290, 460);
            }
        }

        this.ctx.fillStyle = "#FFF";
        for (let i = 10; i <= Math.ceil(topSpeed / 20) * 20; i += 10) {
            this.drawMiniNeedle(this.calculateSpeedAngle(i / topSpeed, 83.07888, 34.3775) * Math.PI, i % 20 == 0 ? 3 : 1, i%20 == 0 ? i : '');
            
            if(i<=100) { 
                this.drawMiniNeedle(this.calculateSpeedAngle(i / 47, 0, 22.9183) * Math.PI, i % 20 == 0 ? 3 : 1, i % 20 ==
                0 ?
                i / 10 : '');
            }
        }

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#41dcf4";
        this.ctx.lineWidth = 25;
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = "#00c6ff";

        this.ctx.strokeStyle = this.speedGradient;
        this.ctx.arc(250, 250, 228, .6 * Math.PI, this.calculateSpeedAngle(speed / topSpeed, 83.07888, 34.3775) * Math.PI);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.lineWidth = 25;
        this.ctx.strokeStyle = this.rpmGradient;
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = "#f7b733";

        this.ctx.arc(250, 250, 228, .4 * Math.PI, this.calculateRPMAngel(rpm / 4.7, 0, 22.9183) * Math.PI, true);
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;


        this.ctx.strokeStyle = '#41dcf4';
        this.speedNeedle(this.calculateSpeedAngle(speed / topSpeed, 83.07888, 34.3775) * Math.PI);

        this.ctx.strokeStyle = this.rpmGradient;
        this.rpmNeedle(this.calculateRPMAngel(rpm / 4.7, 0, 22.9183) * Math.PI);

        this.ctx.strokeStyle = "#000";
        this.clearInterval(this.timer);
    },
    clearInterval(timer) {
      console.log(timer);
    },
    setSpeed () {
      let speedM = 0;
      let gear = 0;
      let rpm = 0;
      this.timer = setInterval(() => {
        if (speedM > 240){
            speedM = 0;
            rpm = 0;
        }
        if (speedM > 1 && speedM< 30){
          gear = 1;
        } else if (speedM > 30 && speedM < 50) {
          gear = 2;
        } else if (speedM > 50 &&   speedM < 70) {
          gear = 3;
        } else if (speedM > 70 &&   speedM < 100) {
          gear = 4;
        } else if (speedM > 100) {
          gear = 5;
        }
        
        speedM++;
        if (rpm < 1){
          rpm += .03; 
        }
        this.drawSpeedo(speedM,gear,rpm,240); 
      }, 40);
      console.log(this.timer);
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

      // if the result has content
      if (result.hasContent) {
        // alert(result.content);
        console.log(result.content); // log the raw scanned content
      }
    }
    return {     
      startScan,
    }
  }
});
</script>

<style scoped>
canvas {
  margin: 0 auto;
  display: block;
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
