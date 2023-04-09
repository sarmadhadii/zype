import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zype.app',
  appName: 'Zype',
  webDir: 'dist/zype-app',
  bundledWebRuntime: false,
  "server": {
    "url": "http://192.168.1.102:4200",
    "cleartext": true
  },
  
  
};

export default config;
