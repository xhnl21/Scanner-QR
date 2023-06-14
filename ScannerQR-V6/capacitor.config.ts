import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ScannerQR-V6',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    "@capacitor-community/mlkit-barcode-scanning": {
      enable: true
    }
  }
};

export default config;
