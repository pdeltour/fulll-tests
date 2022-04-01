import { Fleet } from "./Fleet";
import { Vehicle } from "./Vehicle";

/**
 *  access to the Repository / database service
 */
export interface IRep {

    /**
     * start database engine
     */
    start(): Promise<void>;

    /**
     * stop database engine
     */
    stop(): Promise<void>;

    /**
     * clean the database data. Useful for cleanup before each test 
     * 
     */
    cleanDatabase(): Promise<void>

    /**
     * save a fleet in the database
     * @param fleet 
     */
    fleetSave(fleet: Fleet): Promise<void>;


    /**
     * save a vehicle in the database
     * @param vehicle 
     */
    vehicleSave(vehicle: Vehicle): Promise<void>;

    /**
     * list all the vehicles belonging to a fleet founded in the database
     * @param fleet 
     */
    fleetListVehicles(fleet: Fleet): Promise<Vehicle[]>;

    /**
     * register a vehicle in a fleet in the database
     * @param fleet 
     * @param vehicle 
     */
    fleetRegisterVehicle(fleet: Fleet, vehicle: Vehicle): Promise<void>;


    /**
     * get a vehicle from the database
     * @param id 
     */
    getVehicle(id: string): Promise<Vehicle | undefined>;


    /**
     * get a fleet from the database
     * @param id 
     */
    getFleet(id: string): Promise<Fleet | undefined>;


}