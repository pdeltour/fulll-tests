#! /usr/bin/env node


import { program, Command } from 'commander';
import { create } from "./commands/create"
import { registerVehicule } from "./commands/register-vehicle"
import { localizeVehicle } from "./commands/localize-vehicle"

const DEBUG_CONNECTION_URI = "mysql://root:pwd@localhost:3306/backend-test";

function generateAppParams(cmd: Command) {

    const options = cmd.opts();
    const connection_uri = options.connectionUri ? options.connectionUri : DEBUG_CONNECTION_URI;

    return {
        "driver": "mysql",
        "connection": connection_uri
    }

}

const mainCommand = new Command()

{
    const cmd = mainCommand.command('create <userId>')
    cmd.description('create a fleet for userId. fleetId is returned on stdout.')
        .option('-c, --connection-uri <connection>')
        .action(() => create(cmd, generateAppParams(cmd)));
}

{
    const cmd = mainCommand.command('register-vehicle <fleetId> <vehiclePlateNumber>')
    cmd.description('register a vehicle in a fleet.')
        .option('-c, --connection-uri <connection>')
        .action(() => registerVehicule(cmd, generateAppParams(cmd)));
}

{
    const cmd = mainCommand.command('localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]')
    cmd.description('localize a vehicle in a fleet.')
        .option('-c, --connection-uri <connection>')
        .action(() => localizeVehicle(cmd, generateAppParams(cmd)));
}



mainCommand.parse(process.argv);
