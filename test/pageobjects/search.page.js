const Helpers = require('./helpers.page.js');

class SearchPage {
    /**
     * Retrieves an element based on a selector.
     * @param {string} selector - Selector of the element.
     * @returns {WebdriverIO.Element} - Found element.
     */
    getElement(selector) {
        return $(selector);
    }

    /** UI Selectors */
    get brandImage() {
        return this.getElement('android=new UiSelector().className("android.view.ViewGroup").index(1)');
    }

    get originInput() {
        return this.getElement('android=new UiSelector().className("android.widget.TextView").text("Selecciona tu Origen")');
    }

    get destinationInput() {
        return this.getElement('android=new UiSelector().className("android.widget.TextView").text("Selecciona tu Destino")');
    }

    get todayButton() {
        return this.getElement('android=new UiSelector().className("android.widget.TextView").text("Hoy")');
    }

    get tomorrowButton() {
        return this.getElement('android=new UiSelector().className("android.widget.TextView").text("Mañana")');
    }

    get openButton() {
        return this.getElement('android=new UiSelector().className("android.widget.TextView").text("Abierto")');
    }

    get chooseButton() {
        return this.getElement('android=new UiSelector().className("android.widget.TextView").text("Elegir")');
    }

    get searchButton() {
        return this.getElement('android=new UiSelector().className("android.widget.TextView").text("BUSCAR")');
    }

    get redeemButton() {
        return this.getElement('android=new UiSelector().className("android.widget.TextView").text("Canjear boleto")');
    }

    get departureDateInput() {
        return this.getElement('android=new UiSelector().className("android.widget.TextView").text("Fecha de Salida")');
    }

    get returnButton() {
        return this.getElement('android=new UiSelector().className("android.view.ViewGroup").descriptionContains("Regreso, (Opcional)")');
    }

    get closeButton() {
        return this.getElement('android=new UiSelector().className("android.widget.TextView").text("cerrar")');
    }

    get originSearchInput() {
        return this.getElement('android=new UiSelector().className("android.widget.EditText").text("Busca tu origen")');
    }

    get destinationSearchInput() {
        return this.getElement('android=new UiSelector().className("android.widget.EditText").text("Busca tu destino")');
    }

    /**
     * Selects a day element based on text.
     * @param {string} day - The day to select.
     * @returns {WebdriverIO.Element} - Day element.
     */
    selectDay(day) {
        return this.getElement(`android=new UiSelector().className("android.widget.TextView").text("${day}")`);
    }

    /**
     * Selects an option from the origin list.
     * @param {string} text - The origin to select.
     * @returns {WebdriverIO.Element} - Selected origin option.
     */
    selectOriginOption(text) {
        return this.getElement(`android=new UiSelector().className("android.widget.TextView").text("${text}")`);
    }

    /**
     * Selects an option from the destination list.
     * @param {string} text - The destination to select.
     * @returns {WebdriverIO.Element} - Selected destination option.
     */
    selectDestinationOption(text) {
        return this.getElement(`android=new UiSelector().className("android.widget.TextView").text("${text}")`);
    }

    /**
     * Searches for a trip tomorrow with specified origin and destination.
     * Uses waitObj from Helpers to ensure elements are ready before interacting.
     * @param {string} origin - Origin location.
     * @param {string} destination - Destination location.
     */
    async searchTripTomorrow(origin, destination) {
        await Helpers.waitObjt(this.originInput, 1000);
        await this.originInput.click();
        await Helpers.waitObjt(this.originSearchInput, 1000);
        await this.originSearchInput.setValue(origin);
        await Helpers.waitObjt(this.selectOriginOption(origin), 1000);
        await this.selectOriginOption(origin).click();
        await Helpers.waitObjt(this.destinationInput, 1000);
        await this.destinationInput.click();
        await Helpers.waitObjt(this.destinationSearchInput, 1000);
        await this.destinationSearchInput.setValue(destination);
        await Helpers.waitObjt(this.selectDestinationOption(destination), 1000);
        await this.selectDestinationOption(destination).click();
        await Helpers.waitObjt(this.tomorrowButton, 1000);
        await this.tomorrowButton.click();
        await Helpers.waitObjt(this.searchButton, 1000);
        await this.searchButton.click();
    }
}

module.exports = new SearchPage();
