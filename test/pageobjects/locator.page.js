const Helpers = require('./helpers.page.js');

class Locator {
    /**
     * Retrieves the modal locator element.
     * @returns {Promise<WebdriverIO.Element>} The modal locator element.
     */
    async getModalLocator() {
        return $('android=new UiSelector().className("android.view.ViewGroup").index(1)');
    }

    /**
     * Retrieves the "Continue" button element.
     * @returns {Promise<WebdriverIO.Element>} The "Continue" button element.
     */
    async getBtnContinue() {
        return $('android=new UiSelector().className("android.view.ViewGroup").description("Continuar")');
    }

    /**
     * Retrieves the GPS permission modal element.
     * @returns {Promise<WebdriverIO.Element>} The GPS permission modal element.
     */
    async getModalGps() {
        return $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/grant_dialog")');
    }

    /**
     * Retrieves the "Allow GPS" button element.
     * @returns {Promise<WebdriverIO.Element>} The "Allow GPS" button element.
     */
    async getBtnAlwaysGps() {
        return $('android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_foreground_only_button")');
    }

    /**
     * Handles the modal locator by waiting for it, clicking the "Continue" button,
     * and then managing the GPS permission prompt.
     * @returns {Promise<void>}
     */
    async handleModalAndContinueWithGps() {
        const modalLocator = await this.getModalLocator();
        await Helpers.waitObjt(modalLocator);
        const btnContinue = await this.getBtnContinue();
        if (await btnContinue.isDisplayed()) {
            await btnContinue.click();
            const modalGps = await this.getModalGps();
            await Helpers.waitObjt(modalGps);
            if (await modalGps.isDisplayed()) {
                const btnAlwaysGps = await this.getBtnAlwaysGps();
                await btnAlwaysGps.click();
            }
        }
    }
}

module.exports = new Locator();
