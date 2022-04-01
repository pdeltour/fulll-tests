import { Fleet } from "../Domain/Fleet";
import { IRep } from "../Domain/IRep";
import { Vehicle } from "../Domain/Vehicle";

class VehicleFleetMap extends Map<string, Array<Vehicle>> {

}

/**
 *  In memory database / repository implementation
 */
export class RepMemory implements IRep {

    private vehicles: Map<string, Vehicle> = new Map<string, Vehicle>();
    private fleets: Map<string, Fleet> = new Map<string, Fleet>();

    private fleets_map = new VehicleFleetMap()

    constructor() {

    }

    async start(): Promise<void> {
        return Promise.resolve();
    }

    async stop(): Promise<void> {
        return Promise.resolve();
    }

    async cleanDatabase(): Promise<void> {
        return Promise.resolve();
    }

    async getVehicle(id: string): Promise<Vehicle | undefined> {

        return Promise.resolve(this.vehicles.get(id));
    }


    async vehicleSave(vehicle: Vehicle): Promise<void> {
        this.vehicles.set(vehicle.vehiclePlateNumber, vehicle);
        //return Promise.resolve();
    }

    async getFleet(id: string): Promise<Fleet | undefined> {

        return Promise.resolve(this.fleets.get(id));
    }

    fleetSave(fleet: Fleet): Promise<void> {
        this.fleets.set(fleet.id, fleet);
        return Promise.resolve();
    }

    async fleetRegisterVehicle(fleet: Fleet, vehicle: Vehicle): Promise<void> {
        const vehicles = await this.fleetListVehicles(fleet);

        vehicles.push(vehicle);
        this.fleets_map.set(fleet.id, vehicles);
        //  return Promise.resolve();
    }

    fleetListVehicles(fleet: Fleet): Promise<Vehicle[]> {
        let vehicles = this.fleets_map.get(fleet.id);
        if (vehicles === undefined)
            return Promise.resolve([]);
        else
            return Promise.resolve(vehicles);

    }
}