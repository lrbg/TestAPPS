const Helpers = require('./helpers.page.js');

class Purchase {
    /** UI Selectors */
    get purchaseDataTitle() {
        return $('android=new UiSelector().className("android.widget.TextView").text("DATOS DEL COMPRADOR")');
    }

    get nameField() {
        return $('android=new UiSelector().className("android.widget.EditText").text("Nombre (s)*")');
    }

    get surnameField() {
        return $('android=new UiSelector().className("android.widget.EditText").text("Apellido (s)*")');
    }

    get emailField() {
        return $('android=new UiSelector().className("android.widget.EditText").text("Correo Electrónico * (Obligatorio)")');
    }

    get phoneFieldContainer() {
        return $('android=new UiSelector().className("android.view.ViewGroup").index(1)');
    }

    get phoneField() {
        return this.phoneFieldContainer.$('android=new UiSelector().className("android.widget.EditText").textContains("Teléfono celular")');
    }

    get endPurchaseButton() {
        return $('android=new UiSelector().className("android.view.ViewGroup").descriptionContains("Pagar").clickable(true).enabled(true)');
    }

    get successMessage() {
        return $('android=new UiSelector().className("android.widget.TextView").textContains("Tu compra por").textContains("fue exitosa")');
    }

    /**
     * Waits for the "Purchaser's Data" title to be visible and enabled with an extended timeout.
     */
    async waitForPurchaseDataTitle() {
        await Helpers.waitObjt(this.purchaseDataTitle);
        const isEnabled = await this.purchaseDataTitle.isEnabled();
    }

    /**
     * Fills in the purchaser's data.
     * @param {Object} purchaseData - Data for the purchaser.
     */
    async fillPurchaseData({ name, lastName, email, phone }) {
        await this.waitForPurchaseDataTitle();
        await this.nameField.setValue(name);
        await this.surnameField.setValue(lastName);
        await this.emailField.setValue(email);
        await this.phoneField.setValue(phone);
        await this.scrollDown(0);
    }

    /**
     * Selects the payment method based on the specified type.
     * @param {string} paymentType - Type of payment: "creditDebit", "paypal", "coppel"
     */
    async selectPaymentOption(paymentType) {
        let paymentButton;
        switch (paymentType) {
            case "creditDebit":
                paymentButton = await $('android=new UiSelector().className("android.view.ViewGroup").description("Crédito o débito")');
                break;
            case "paypal":
                paymentButton = await $('android=new UiSelector().className("android.view.ViewGroup").description("PayPal")');
                break;
            case "coppel":
                paymentButton = await $('android=new UiSelector().className("android.view.ViewGroup").description("Nuevo, Crédito")');
                break;
            default:
                throw new Error(`Unsupported payment type "${paymentType}"`);
        }
        await Helpers.waitObjt(paymentButton);
        await paymentButton.click();
        await this.scrollDown(1);
    }

    /**
     * Fills in the credit card information.
     * @param {Object} cardData - Data for the credit card.
     */
    async fillCardData({ name, number, expiration, cvv }) {
        const cardNameField = await $('android=new UiSelector().className("android.widget.EditText").text("Nombre del propietario de la tarjeta")');
        const cardNumberField = await $('android=new UiSelector().className("android.widget.EditText").index(0)');
        const cardExpiryField = await $('android=new UiSelector().resourceId("CC_EXPIRY")');
        const cardCVVField = await $('android=new UiSelector().resourceId("CC_CVC")');

        await Helpers.waitObjt(cardNameField);
        await cardNameField.setValue(name);
        await Helpers.waitObjt(cardNumberField);
        await cardNumberField.setValue(number);
        await Helpers.waitObjt(cardExpiryField);
        await cardExpiryField.setValue(expiration);
        await Helpers.waitObjt(cardCVVField);
        await cardCVVField.setValue(cvv);
        await this.scrollDown(3);
    }

    /**
     * Completes the purchase by clicking the "Pay" button.
     */
    async completePurchase() {
        await Helpers.waitObjt(this.endPurchaseButton);
        const maxAttempts = 5;
        for (let i = 0; i < maxAttempts; i++) {
            await this.endPurchaseButton.click();
        }
    }

    /**
     * Validates that the success message for purchase completion is displayed.
     */
    async validateSuccessfulPurchaseMessage() {
        await Helpers.waitObjt(this.successMessage);
        const isDisplayed = await this.successMessage.isDisplayed();
    }

    /**
     * Performs a scroll down with a customizable percentage.
     * @param {number} percent - Percentage of the scroll down.
     */
    async scrollDown(percent = 1.0) {
        await driver.execute('mobile: scrollGesture', {
            left: 500,
            top: 1500,
            width: 500,
            height: 500,
            direction: 'down',
            percent: percent
        });
    }
}

module.exports = new Purchase();
