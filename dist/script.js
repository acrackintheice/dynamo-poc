"use strict";
// import AWS from "aws-sdk";
// import { Entity, Table } from "dynamodb-onetable";
Object.defineProperty(exports, "__esModule", { value: true });
const country_1 = require("./src/domain/country");
const country_repository_1 = require("./src/infrastructure/dynamo/repository/country-repository");
// AWS.config.update({
//   region: "localhost",
//   accessKeyId: "access_key_id",
//   secretAccessKey: "secret_access_key",
// });
// const client = new AWS.DynamoDB.DocumentClient({
//   endpoint: "http://localhost:8000",
// });
// const MySchema = {
//   version: "0.0.1",
//   indexes: {
//     primary: { hash: "pk", sort: "sk" },
//     GSI1: { hash: "GSI1PK", sort: "GSI1SK" },
//   },
//   models: {
//     Operation: {
//       pk: { type: String, value: "OPERATION#${company_name}#${country_code}" },
//       sk: { type: String, value: "METADATA" },
//       company_name: { type: String },
//       country_code: { type: String },
//       operation_created_at: { type: String },
//       operation_created_by: { type: String },
//     },
//     FullOperation: {
//       pk: { type: String, value: "OPERATION#${company_name}#${country_code}" },
//       sk: { type: String, value: "" },
//       company_name: { type: String },
//       country_code: { type: String },
//       operation_created_at: { type: String },
//       operation_created_by: { type: String },
//     },
//     Country: {
//       pk: { type: String, value: "COUNTRY#${country_code}" },
//       sk: { type: String, value: "METADATA" },
//       country_code: { type: String },
//       country_id: { type: Number },
//       GSI1PK: { type: String, value: "COUNTRIES" },
//       GSI1SK: { type: String, value: "COUNTRY#${country_code}" },
//     },
//     Countries: {
//       GSI1PK: { type: String, value: "COUNTRIES" },
//       GSI1SK: { type: String, value: "COUNTRY#${country_code}" },
//       country_code: { type: String },
//       country_id: { type: Number },
//     },
//   },
// };
// //  Fully typed Account object based on the schema
// type OperationType = Entity<typeof MySchema.models.Operation>;
// type FullOperationType = Entity<typeof MySchema.models.FullOperation>;
// type CountryType = Entity<typeof MySchema.models.Country>;
// type CountriesType = Entity<typeof MySchema.models.Countries>;
// const table = new Table({
//   client: client,
//   name: "configuration",
//   schema: MySchema,
// });
// let Operation = table.getModel<OperationType>("Operation");
// let Country = table.getModel<CountryType>("Country");
// let Countries = table.getModel<CountriesType>("Countries");
// let FullOperation = table.getModel<FullOperationType>("FullOperation");
// FullOperation.get({
//   pk: "OPERATION#NATURA#PE",
// })
//   .then((r) => console.log(JSON.stringify(r)))
//   .catch((e) => console.log(e));
// Country.get({
//   country_code: "PE",
// })
//   .then((r) => console.log(JSON.stringify(r)))
//   .catch((e) => console.log(e));
// Countries.find({}, { index: "GSI1" })
//   .then((r) => console.log(JSON.stringify(r)))
//   .catch((e) => console.log(e));
const handle = async () => {
    const kappa = await country_repository_1.CountryRepository.insert(new country_1.Country({
        countryCode: "AR",
        countryId: 2,
        currency: "Peso",
        language: "ES",
        currencySymbol: "P$",
        timeZone: "BRT",
    }));
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
//# sourceMappingURL=script.js.map