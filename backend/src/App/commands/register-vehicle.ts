import { Command } from "commander";
import { Vehicle } from "../../Domain/Vehicle";
import { App } from "../app";

/**
 * register vehicle command
 * @param cmd 
 * @param params 
 * @returns 
 */
export async function registerVehicule(cmd: Command, params: any) {

    if (cmd.args.length < 2) {
        cmd.help();
        return;
    }

    const fleet_id = cmd.args[0];
    const vehicle_plate_number = cmd.args[1];

    const app = new App(params);
    try {
        await app.start();

        // create vehicle if needed
        const vehicle = new Vehicle(vehicle_plate_number);
        await app.rep?.vehicleSave(vehicle);

        const fleet = await app.rep?.getFleet(fleet_id);
        if (fleet !== undefined) {
            // add vehicle to fleet 
            await app.fleet_service?.fleetRegisterVehicle(fleet, vehicle);
            console.log(`vehicle "${vehicle_plate_number}" successfully added to fleet "${fleet_id}".`)
        }
        else
            throw new Error(`ERROR : invalid fleetId "${fleet_id}".`);

    }
    catch (e: any) {
        console.error(e.message);
    }
    finally {
        await app.stop();
    }


}