const Helpers = require('./helpers.page.js');

class Insurance {
    /** UI Selectors */
    
    get insuranceModal() {
        return $('android=new UiSelector().className("android.widget.TextView").text("¿Quieres utilizar la cobertura adicional?")');
    }

    get btnTrueInsurance() {
        return $('android=new UiSelector().className("android.view.ViewGroup").description("Sí, agregar")');
    }

    get btnFalseInsurance() {
        return $('android=new UiSelector().className("android.view.ViewGroup").description("No, gracias")');
    }


    /**
     * Selects the insurance option based on the boolean value.
     * @param {boolean} addInsurance - true to add insurance, false to decline.
     */
    async selectInsuranceOption(addInsurance) {
        const modalVisible = await Helpers.waitObjt(this.insuranceModal);
        if (modalVisible) {
            if (addInsurance) {
                const btnAddVisible = await Helpers.waitObjt(this.btnTrueInsurance);
                if (btnAddVisible) {
                    await this.btnTrueInsurance.click();
                }
            } else {
                const btnDeclineVisible = await Helpers.waitObjt(this.btnFalseInsurance);
                if (btnDeclineVisible) {
                    await this.btnFalseInsurance.click();
                }
            }
        } else {
        }
    }
}

module.exports = new Insurance();
