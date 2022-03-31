import { FleetService } from "../Domain/FleetService";
import { IRep } from "../Domain/IRep";
import { RepMemory } from "../Infra/RepMemory";
import { RepMysql } from "../Infra/RepMysql";

export class App {

    public rep: IRep | null = null;
    public fleet_service: FleetService | null = null;

    constructor(params: any) {

        let rep: IRep | null = null;

        let driver = "memory";
        if (params.driver !== undefined)
            driver = params.driver;
        else
            console.log("\nusing default memory driver.");

        if (driver === "mysql") {

            if (params.connection === undefined)
                throw new Error("error : missing connection string for mysql driver.");

            rep = new RepMysql(params.connection);

        }
        else {
            rep = new RepMemory();
        }



        this.rep = rep;
        this.fleet_service = new FleetService(rep!);

    }

    async start() {
        await this.rep!.start();
    }

    async stop() {
        await this.rep!.stop();
    }

}