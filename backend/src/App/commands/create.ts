import { Command } from "commander";
import { Fleet } from "../../Domain/Fleet";
import { App } from "../app";
/**
 * create fleet command
 * @param cmd 
 * @param params 
 * @returns 
 */
export async function create(cmd: Command, params: any): Promise<void> {

    if (cmd.args.length < 1) {
        cmd.help();
        return;
    }

    const user_id = cmd.args[0];

    const app = new App(params);
    try {
        await app.start();

        const fleet = new Fleet(user_id);
        app.rep?.fleetSave(fleet);

        // return fleet id to standard output
        console.log(fleet.id);
    }
    catch (e: any) {
        console.error(e.message);
    }

    finally {
        await app.stop();
    }
}
