const Helpers = require('./helpers.page.js');

class SplashScreen {
    /**
     * Retrieves an element based on a selector.
     * @param {string} selector - Selector of the element.
     * @returns {WebdriverIO.Element} - Found element.
     */
    getElement(selector) {
        return $(selector);
    }

    get iconStepOne() {
        return this.getElement('android=new UiSelector().className("android.widget.ImageView").index(1)');
    }

    get logoBrand() {
        return this.getElement('android=new UiSelector().className("android.widget.ImageView").index(0)');
    }

    get txtStepOne() {
        return this.getElement('android=new UiSelector().className("android.widget.TextView").index(2)');
    }

    get iconStepTwo() {
        return this.getElement('android=new UiSelector().className("android.widget.ImageView").index(0)');
    }

    get txtStepTwo() {
        return this.getElement('android=new UiSelector().className("android.widget.TextView").text("Con Doters el punto es que ganes").index(1)');
    }

    get iconStepThree() {
        return this.getElement('android=new UiSelector().className("android.widget.ImageView").index(0)');
    }

    get txtStepThree() {
        return this.getElement('android=new UiSelector().className("android.widget.TextView").text("Ahora comprar tus boletos será muy fácil y ¡con descuento!").index(1)');
    }

    getButtonByText(text) {
        return this.getElement(`android=new UiSelector().className("android.widget.TextView").text("${text}").index(0)`);
    }

    get btnNextStepOne() {
        return this.getButtonByText("Siguiente");
    }

    get btnNextStepTwo() {
        return this.getButtonByText("Siguiente");
    }

    get btnNextStepThree() {
        return this.getButtonByText("Cerrar guía rápida");
    }

    /**
     * Waits for an element to be displayed and clicks it using the helper wait function.
     * @param {WebdriverIO.Element} element - The element to click.
     */
    async waitForElementAndClick(element) {
        await Helpers.waitObjt(element, 1000);
        await element.click();
    }

    /**
     * Validates the presence of the splash module and interacts with elements.
     */
    async validateAndCaptureElements() {
        if (!(await this.iconStepOne.isDisplayed())) {
            return;
        }
        await this.waitForElementAndClick(this.btnNextStepOne);
        await this.waitForElementAndClick(this.btnNextStepTwo);
        await this.waitForElementAndClick(this.btnNextStepThree);
    }
}

module.exports = new SplashScreen();
