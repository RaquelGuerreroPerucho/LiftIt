import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.raquelguerreroperucho.liftit',
  appName: 'liftIt',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    Filesystem: {
      allowedSchemes: ["file", "http", "https"]
    }
  },
  ios:{},
cordova: {},
/*
  server: {
    url: "http://localhost:8100",
    cleartext: true
  }
  */
};

export default config;
