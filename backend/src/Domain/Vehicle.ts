import { Location } from "./Location";

/**
 * Vehicle: a car, truck, motocycle, or any transportation mode that can help me to move from point A to point B on planet earth.
 */
export class Vehicle {

    public location: Location | null = null;

    constructor(public readonly vehiclePlateNumber: string) {

    }

}