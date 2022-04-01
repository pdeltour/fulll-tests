import { Fleet } from "../Domain/Fleet";
import { IRep } from "../Domain/IRep";
import { Vehicle } from "../Domain/Vehicle";
import { Connection, createConnection, RowDataPacket } from 'mysql2/promise';
import { Location } from "../Domain/Location";



/**
 *  Mysql repository / database implementation
 */
export class RepMysql implements IRep {

    private connection: Connection | null = null;

    constructor(private connection_uri: string) {

    }

    async start(): Promise<void> {
        await this.createConnection();
    }

    async stop(): Promise<void> {
        await this.endConnection();
    }

    async cleanDatabase(): Promise<void> {
        await this.connection!.query('TRUNCATE FLEET')
        await this.connection!.query('TRUNCATE VEHICLE')
        await this.connection!.query('TRUNCATE FLEET_VEHICLE')

    }


    async getFleet(id: string): Promise<Fleet | undefined> {

        let fleet: Fleet | undefined = undefined;

        const query = `SELECT * FROM FLEET  WHERE FLEET.FLT_ID = ?`
        const [res, fields] = await this.connection!.query(query, [id]);
        const data = res as RowDataPacket[];
        //        console.log(data);
        if (data.length > 0) {
            const row = data[0];
            fleet = new Fleet(row.flt_id)
        }


        //  console.log(vehicles);
        return fleet;
    }


    async fleetSave(fleet: Fleet): Promise<void> {

        const query = `INSERT INTO FLEET ( flt_id ) VALUES  ( ? ) ON DUPLICATE KEY UPDATE flt_id = flt_id`
        await this.connection!.query(query, [fleet.id]);


    }
    async fleetListVehicles(fleet: Fleet): Promise<Vehicle[]> {
        const query = `SELECT * FROM FLEET_VEHICLE 
       INNER JOIN VEHICLE ON FLEET_VEHICLE.VCL_PLATE_NUMBER = VEHICLE.VCL_PLATE_NUMBER
       WHERE FLEET_VEHICLE.FLT_ID = ?`

        const vehicles: Vehicle[] = [];
        const [res, fields] = await this.connection!.query(query, [fleet.id]);
        const data = res as RowDataPacket[];
        //    console.log(data);
        data.forEach((row) => {
            const vehicle = new Vehicle(row.vcl_plate_number)
            vehicle.location = new Location(row.vcl_lat, row.vcl_long, row.vcl_alt);
            vehicles.push(vehicle)
        });

        //  console.log(vehicles);
        return vehicles;

    }

    async fleetRegisterVehicle(fleet: Fleet, vehicle: Vehicle): Promise<void> {
        const query = `INSERT INTO FLEET_VEHICLE ( flt_id, vcl_plate_number ) VALUES  ( ? , ? )`
        await this.connection!.query(query, [fleet.id, vehicle.vehiclePlateNumber]);

    }

    async vehicleSave(vehicle: Vehicle): Promise<void> {
        const query = `INSERT INTO VEHICLE ( vcl_plate_number, vcl_lat, vcl_long, vcl_alt ) VALUES  ( ?, ?, ?, ? ) ON DUPLICATE KEY UPDATE vcl_lat = ?,vcl_long = ?,vcl_alt = ?  `
        await this.connection!.query(query, [
            vehicle.vehiclePlateNumber,
            vehicle.location?.lat,
            vehicle.location?.long,
            vehicle.location?.alt,
            vehicle.location?.lat,
            vehicle.location?.long,
            vehicle.location?.alt]);

    }

    async getVehicle(id: string): Promise<Vehicle | undefined> {

        let vehicle: Vehicle | undefined = undefined;

        const query = `SELECT * FROM VEHICLE  WHERE VEHICLE.VCL_PLATE_NUMBER = ?`
        const [res, fields] = await this.connection!.query(query, [id]);
        const data = res as RowDataPacket[];
        //        console.log(data);
        if (data.length > 0) {
            const row = data[0];
            vehicle = new Vehicle(row.vcl_plate_number)
            vehicle.location = new Location(row.vcl_lat, row.vcl_long, row.vcl_alt);
        }


        //  console.log(vehicles);
        return vehicle;
    }

    //////////// PRIVATE ////////////

    private async createConnection(): Promise<void> {
        this.connection = await createConnection(this.connection_uri);
        if (this.connection == undefined)
            throw new Error(`unable to connect to mysql database with connection uri ${this.connection_uri}.`);
        // else
        //     console.log("connection created.");
    }

    private async endConnection(): Promise<void> {
        if (this.connection !== null)
            this.connection.end();
    }

}