const { expect } = require('@wdio/globals');
const Locator = require('../pageobjects/locator.page');
const SplashScreen = require('../pageobjects/splash.page');
const SearchPage = require('../pageobjects/search.page');
const SelectTrip = require('../pageobjects/trip.page');
const Seats = require('../pageobjects/seats.page');
const Pax = require('../pageobjects/pax.page');
const Insurance = require('../pageobjects/insurance.page');
const Purchase = require('../pageobjects/purchase.page');

const { searchValues, creditCardValues, purchaserValues, passengers } = require('./input.value');

    describe('it should complete a simple purchase @e2e_001', () => {

        it('should validate and handle modal and GPS permissions', async () => {
            await Locator.handleModalAndContinueWithGps();
        });

        it('Should validate splash component', async () => {
            await SplashScreen.validateAndCaptureElements();
        });

        it('You should perform a one-way search', async () => {
            const origin = searchValues[global.brand]?.origin_text || searchValues.default.origin_text;
            const destination = searchValues[global.brand]?.destination_text || searchValues.default.destination_text;
            await SearchPage.searchTripTomorrow(origin, destination);
        });

        it('You should make a selection of a trip by schedule', async () => {
            await SelectTrip.selectRandomChooseButton();
        });

        it('Should check and capture available and occupied seats', async () => {
            const numberOfSeatsToSelect = 1;
            await Seats.processSeats(numberOfSeatsToSelect);
        });

        it('Should load passenger information', async () => {
            const numberOfPassengers = 1;
            const passengersData = passengers.slice(0, numberOfPassengers).map(pax => ({
                name: pax.name,
                surname: pax.lastName,
                category: 'Adulto'
            }));
            await Pax.loadPassengerData(passengersData);
        });

        it('You should select medical insurance', async () => {
            const addInsurance = true;
            await Insurance.selectInsuranceOption(addInsurance);
        });

        it('You should complete the purchase process', async () => {
            const purchaserData = purchaserValues;
            const paymentType = 'creditDebit';
            await Purchase.fillPurchaseData(purchaserData);
            await Purchase.selectPaymentOption(paymentType);
            if (paymentType === 'creditDebit') {
                await Purchase.fillCardData(creditCardValues);
            }
            await Purchase.completePurchase();
            await Purchase.validateSuccessfulPurchaseMessage();
        });
    });
