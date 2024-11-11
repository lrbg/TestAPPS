exports.config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.js'],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',
        'appium:automationName': 'UiAutomator2',
        'appium:app': '/Users/luisrogelio/Documents/appium-tests/apk/gfa22112024.apk',
        'appium:newCommandTimeout': 3600,
        'appium:connectHardwareKeyboard': true
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [['appium', { args: { relaxedSecurity: true, port: 4723 } }]],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    /**
     * Captura el parámetro de marca y lo guarda como variable global
     */
    before: function () {
        const brand = process.env.BRAND || 'default'; // Captura BRAND desde las variables de entorno
        console.log(`Marca seleccionada en wdio.conf.js: ${brand}`);
        global.brand = brand;
    }
};
