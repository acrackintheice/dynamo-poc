// import AWS from "aws-sdk";
// import { Entity, Table } from "dynamodb-onetable";

import { Country } from "./src/domain/country";
import { CountryRepository } from "./src/infrastructure/dynamo/repository/country-repository";


const handle = async () => {

  const country_br = await CountryRepository.findByCountryCode("BR");
  const country_ar = await CountryRepository.findByCountryCode("AR");

  const countries = await CountryRepository.findAll();

  console.log("Finished handler execution");
};

handle().then(() => {
    console.log("Execution finished sucessfuly")
}).catch(error => {
    console.log(error)
    console.log("Execution finished with errors")
})
