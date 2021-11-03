import { Country } from "./src/domain/country";
import { Document } from "./src/domain/document";
import { CountryRepository } from "./src/infrastructure/dynamo/repository/country-repository";
import { countries_seed } from "./dev/seed/country-seed"

const handle = async () => {

  const country = countries_seed["PE"];

  await CountryRepository.insert(country);

  const find = await CountryRepository.findByCountryCode(country.countryCode);
  const countries = await CountryRepository.findAll();

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
