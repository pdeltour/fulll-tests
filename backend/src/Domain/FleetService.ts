import { Fleet } from "./Fleet";
import { IRep } from "./IRep";
import { Vehicle } from "./Vehicle";
import { Location } from "./Location";

/**
 *  general services to manage fleet and vehicle
 */
export class FleetService {


    constructor(private rep: IRep) {

    }


    /**
     * 
     * @param fleet 
     * @param vehicle_plate_number 
     * @returns true if vehicle with a given plate number is included in the fleet, false otherwise
     */
    async fleetDoesIncludesVehicle(fleet: Fleet, vehicle_plate_number: string): Promise<boolean> {

        const vehicles = await this.rep.fleetListVehicles(fleet);
        const founded = vehicles.filter((vehicle) => { return vehicle.vehiclePlateNumber === vehicle_plate_number });

        return founded.length > 0;
    }

    /**
     * register a vehicle in a fleet. 
     * @throw Error if vehicle is already registered;
     * @param fleet 
     * @param vehicle 
     */
    async fleetRegisterVehicle(fleet: Fleet, vehicle: Vehicle): Promise<void> {

        const do_include_vehicle = await this.fleetDoesIncludesVehicle(fleet, vehicle.vehiclePlateNumber);


        if (do_include_vehicle)
            throw new Error(`error : vehicle "${vehicle.vehiclePlateNumber}" is already registered to fleet "${fleet.id}."`);
        else
            await this.rep.fleetRegisterVehicle(fleet, vehicle);

    }


    /**
     * park a vehicle
     * @throws if vehicle is parked twice at the same location
     * @param vehicle 
     * @param location 
     */
    async vehiclePark(vehicle: Vehicle, location: Location): Promise<void> {


        if (vehicle.location && Location.equal(vehicle.location, location)) {
            throw new Error(`error : trying to park the vehicle "${vehicle.vehiclePlateNumber}" twice at the same location (${location.lat},${location.long},${location.alt})`)
        }
        vehicle.location = location;
        await this.rep.vehicleSave(vehicle);
    }


}