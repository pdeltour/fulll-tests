import { Command } from "commander";
import { Location } from "../../Domain/Location";
import { App } from "../app";

/**
 * localize vehicle command
 * @param cmd 
 * @param params 
 * @returns 
 */
export async function localizeVehicle(cmd: Command, params: any) {
    //  console.log(cmd.args);

    if (cmd.args.length < 4) {
        cmd.help();
        return;
    }

    const fleet_id = cmd.args[0];
    const vehicle_plate_number = cmd.args[1];
    const lat = parseFloat(cmd.args[2]);
    const long = parseFloat(cmd.args[3]);
    const alt = cmd.args[4] ? parseFloat(cmd.args[4]) : 0;

    const app = new App(params);
    try {
        await app.start();

        // create vehicle if needed
        const vehicle = await app.rep?.getVehicle(vehicle_plate_number);
        if (vehicle) {

            // NOT USING FLEET TO LOCATE A VEHICLE
            //         const fleet = app.rep.getFleet ( fleet_id )
            //          if( fleet ) {

            await app.fleet_service?.vehiclePark(vehicle, new Location(lat, long, alt));

            //            }
            console.log(`vehicle "${vehicle.vehiclePlateNumber}" successfully localized at location (${lat},${long},${alt}).`)
        }

    }
    catch (e: any) {
        console.error(e.message);
    }

    finally {
        await app.stop();
    }




}