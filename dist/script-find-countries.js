"use strict";
// import AWS from "aws-sdk";
// import { Entity, Table } from "dynamodb-onetable";
Object.defineProperty(exports, "__esModule", { value: true });
const country_repository_1 = require("./src/infrastructure/dynamo/repository/country-repository");
const handle = async () => {
    const country_br = await country_repository_1.CountryRepository.findByCountryCode("BR");
    const country_ar = await country_repository_1.CountryRepository.findByCountryCode("AR");
    const countries = await country_repository_1.CountryRepository.findAll();
    console.log("Finished handler execution");
};
handle().then(() => {
    console.log("Execution finished sucessfuly");
}).catch(error => {
    console.log(error);
    console.log("Execution finished with errors");
});
//# sourceMappingURL=script-find-countries.js.map