/*jshint esversion: 6 */
/*jslint node: true */
"use strict";
process.env.DATABASE_URI="mongodb://localhost:27017/test";

const {CompanyService, ServiceContext} = require("./index").default;
const context = new ServiceContext({
    system: false
});

async function kenan () {
    const output = await CompanyService.addCompany(context, {
        name: "test",
        description: "test",
        address: "test",
        user: {
            name: "Kenan Berbic",
            email: "kberbic@devlogic.eu",
            password: "test1234"
        }
    });
}

kenan();