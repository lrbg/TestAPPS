const Helpers = require('./helpers.page.js');

class Pax {
    /**
     * Retrieves the passenger data container.
     * @returns {WebdriverIO.Element} The passenger data container element.
     */
    get paxDataContainer() {
        return $('android=new UiSelector().className("android.view.ViewGroup").index(0)');
    }

    /** UI Selectors */
    get nextButton() {
        return $('android=new UiSelector().className("android.view.ViewGroup").description("Siguiente")');
    }

    /** Utility Functions */
    
    /**
     * Scrolls down the page to bring the specified element into view.
     * @param {WebdriverIO.Element} element The element to make visible by scrolling.
     */
    async scrollUntilVisible(element) {
        while (!(await element.isDisplayed())) {
            await driver.execute('mobile: scrollGesture', {
                left: 500,
                top: 1500,
                width: 500,
                height: 500,
                direction: 'down',
                percent: 3.0
            });
        }
    }

    /**
     * Waits for the pax data container to be visible and enabled.
     */
    async waitForPaxDataContainer() {
        await Helpers.waitObjt(this.paxDataContainer);
        const isEnabled = await this.paxDataContainer.isEnabled();
        if (!isEnabled) throw new Error('Passenger data container is not available.');
    }

    /**
     * Loads passenger data one by one.
     * @param {Object[]} passengersData Array of passenger data objects.
     */
    async loadPassengerData(passengersData) {
        await this.waitForPaxDataContainer();
        for (let i = 0; i < passengersData.length; i++) {
            const passengerData = passengersData[i];
            let passengerBox = await this.findPassengerBox(i + 1);
            await this.scrollUntilVisible(passengerBox);
            await this.fillPassengerDetails(passengerBox, passengerData);
        }
        await this.clickNextButton();
    }

    /**
     * Finds and returns the passenger box by index.
     * @param {number} index The index of the passenger box.
     * @returns {Promise<WebdriverIO.Element>} The passenger box element.
     */
    async findPassengerBox(index) {
        return $(`android=new UiSelector().className("android.view.ViewGroup").index(${index})`);
    }

    /**
     * Fills in the details for a passenger.
     * @param {WebdriverIO.Element} passengerBox The passenger container element.
     * @param {Object} data Passenger data containing name, surname, and category.
     */
    async fillPassengerDetails(passengerBox, data) {
        const nameField = await passengerBox.$('android=new UiSelector().className("android.widget.EditText").text("Nombre (s)*")');
        await this.scrollUntilVisible(nameField);
        await nameField.setValue(data.name);
        const surnameField = await passengerBox.$('android=new UiSelector().className("android.widget.EditText").text("Apellido (s)*")');
        await this.scrollUntilVisible(surnameField);
        await surnameField.setValue(data.surname);
        const categoryField = await passengerBox.$('android=new UiSelector().className("android.view.ViewGroup").index(8)');
        await this.scrollUntilVisible(categoryField);
        await categoryField.click();
        await this.selectCategory(data.category);
    }

    /**
     * Selects the specified category in the category selection menu.
     * @param {string} category The category text to select.
     */
    async selectCategory(category) {
        const categoryOption = $(`android=new UiSelector().text("${category}")`);
        await Helpers.waitObjt(categoryOption);
        await categoryOption.click();
    }

    /**
     * Clicks on the 'Next' button after loading passenger data.
     */
    async clickNextButton() {
        await this.scrollUntilVisible(this.nextButton);
        await Helpers.waitObjt(this.nextButton);
        await this.nextButton.click();
    }
}

module.exports = new Pax();
