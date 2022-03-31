import { Given, When, Then } from "@cucumber/cucumber";
import { assert } from "chai"

import { Location } from "../src/Domain/Location"

Given('a location', function () {
    this.a_location = new Location(100, 100);
});


When('I park my vehicle at this location', async function () {

    await this.app.fleet_service.vehiclePark(this.a_vehicle, this.a_location);
});



Then('the known location of my vehicle should verify this location', async function () {

    const vehicle = await this.app.rep.getVehicle(this.a_vehicle.vehiclePlateNumber);
    //    console.log(vehicle);
    if (vehicle !== undefined)
        assert.isTrue(Location.equal(vehicle.location, this.a_location));

});




Given('my vehicle has been parked into this location', async function () {

    await this.app.fleet_service.vehiclePark(this.a_vehicle, this.a_location);
});



When('I try to park my vehicle at this location', async function () {
    this.park_same_location_error = false;
    try {
        await this.app.fleet_service.vehiclePark(this.a_vehicle, this.a_location);
    }
    catch (e) {
        this.park_same_location_error = true;
    }

});



Then('I should be informed that my vehicle is already parked at this location', function () {

    assert.isTrue(this.park_same_location_error);
});