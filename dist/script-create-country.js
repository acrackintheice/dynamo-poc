"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const country_repository_1 = require("./src/infrastructure/dynamo/repository/country-repository");
const country_seed_1 = require("./dev/seed/country-seed");
const handle = async () => {
    const country = country_seed_1.countries_seed["PE"];
    await country_repository_1.CountryRepository.insert(country);
    const find = await country_repository_1.CountryRepository.findByCountryCode(country.countryCode);
    const countries = await country_repository_1.CountryRepository.findAll();
    console.log("Finished handler execution");
};
handle()
    .then(() => {
    console.log("Execution finished sucessfuly");
})
    .catch((error) => {
    console.log(error);
    console.log("Execution finished with errors");
});
//# sourceMappingURL=script-create-country.js.map