import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ScannerQR-V5',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    "PhonegapPluginBarcodeScanner": {}
  }
};

export default config;
