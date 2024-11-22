exports.config = {
    runner: 'local',
    hostname: 'testapps-production.up.railway.app', // Cambiar localhost por la URL de Railway
    port: 443, // Puerto para HTTPS
    path: '/wd/hub', // Ruta base de Appium
    protocol: 'https', // Asegúrate de usar HTTPS
    specs: ['./test/specs/**/*.js'], // Tus pruebas
    maxInstances: 1,
    capabilities: [
        {
            platformName: process.env.PLATFORM || 'Android',
            'appium:deviceName': process.env.PLATFORM === 'ios' ? 'iPhone 16' : 'emulator-5554',
            'appium:platformVersion': process.env.PLATFORM === 'ios' ? '18.0' : undefined,
            'appium:automationName': process.env.PLATFORM === 'ios' ? 'XCUITest' : 'UiAutomator2',
            'appium:app': process.env.PLATFORM === 'ios'
                ? 'https://appsreservamos2024r1.s3.us-east-2.amazonaws.com/gfa.app.zip'
                : 'https://appsreservamos2024r1.s3.us-east-2.amazonaws.com/gfa22112024.apk',
            'appium:newCommandTimeout': 3600,
            'appium:connectHardwareKeyboard': true
        }
    ],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 240000,
    connectionRetryCount: 3,
    services: [['appium', { args: { relaxedSecurity: true, port: 4723 } }]],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    before: function () {
        const brand = process.env.BRAND || 'default';
        console.log(`Marca seleccionada en wdio.conf.js: ${brand}`);
        global.brand = brand;
        global.platform = process.env.PLATFORM || 'Android';
    }
};
