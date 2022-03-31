
import { Before, After } from "@cucumber/cucumber";
import { App } from "../src/App/app";

const DEBUG = false;

Before(async function () {

    if (DEBUG)
        console.log(this.parameters);

    this.app = new App(this.parameters);
    await this.app.start();

    await this.app.rep.cleanDatabase();
})

After(async function () {

    await this.app.stop();


})
