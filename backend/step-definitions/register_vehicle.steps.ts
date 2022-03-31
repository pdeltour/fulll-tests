//const assert = require("assert");
import { Given, When, Then, Before } from "@cucumber/cucumber";
import { assert } from "chai"


import { Fleet } from "../src/Domain/Fleet";
import { Vehicle } from "../src/Domain/Vehicle";





Given('my fleet', async function () {

    this.my_fleet = new Fleet("pierre");
    await this.app.rep.fleetSave(this.my_fleet);

});



Given('a vehicle', async function () {
    this.a_vehicle = new Vehicle("AFK330");
    await this.app.rep.vehicleSave(this.a_vehicle);
});



When('I register this vehicle into my fleet', async function () {

    await this.app.fleet_service.fleetRegisterVehicle(this.my_fleet, this.a_vehicle);

});



Then('this vehicle should be part of my vehicle fleet', async function () {

    const do_include_vehicle = await this.app.fleet_service.fleetDoesIncludesVehicle(this.my_fleet, this.a_vehicle.vehiclePlateNumber);
    assert.isTrue(do_include_vehicle, "vehicle not founded in fleet");
});

Given('I have registered this vehicle into my fleet', async function () {
    await this.app.fleet_service.fleetRegisterVehicle(this.my_fleet, this.a_vehicle);
});



When('I try to register this vehicle into my fleet', async function () {
    this.already_registered_exception = false;
    try {
        await this.app.fleet_service.fleetRegisterVehicle(this.my_fleet, this.a_vehicle);
    }
    catch (e) {
        this.already_registered_exception = true;
    }
});



Then('I should be informed this this vehicle has already been registered into my fleet', function () {
    assert.isTrue(this.already_registered_exception);

});

Given('the fleet of another user', function () {

    this.other_user_fleet = new Fleet("paul");

});



Given('this vehicle has been registered into the other user\'s fleet', async function () {

    await this.app.fleet_service.fleetRegisterVehicle(this.other_user_fleet, this.a_vehicle);

});