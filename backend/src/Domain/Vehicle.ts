import { Location } from "./Location";

export class Vehicle {

    public location: Location | null = null;

    constructor(public readonly vehiclePlateNumber: string) {

    }

}