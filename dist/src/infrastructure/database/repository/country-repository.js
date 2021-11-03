"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryRepository = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const country_model_1 = require("../entity/country-model");
// This is just an example. In the real app this must be an Inversify component
// The DocumentClient should be injected aswell.
class CountryRepository {
    static async findCountry(countryCode) {
        aws_sdk_1.default.config.update({
            region: "localhost",
            accessKeyId: "access_key_id",
            secretAccessKey: "secret_access_key",
        });
        const client = new aws_sdk_1.default.DynamoDB.DocumentClient({
            endpoint: "http://localhost:8000",
        });
        const params = {
            KeyConditionExpression: "pk = :pk",
            ExpressionAttributeValues: {
                ":pk": `COUNTRY#${countryCode}`,
            },
            TableName: "configuration",
        };
        try {
            const result = await client.query(params).promise();
            return country_model_1.CountryModel.fromItems(result.Items).toDomain();
        }
        catch (error) {
            console.log(error);
        }
    }
    static async findAll() {
        aws_sdk_1.default.config.update({
            region: "localhost",
            accessKeyId: "access_key_id",
            secretAccessKey: "secret_access_key",
        });
        const client = new aws_sdk_1.default.DynamoDB.DocumentClient({
            endpoint: "http://localhost:8000",
        });
        const params = {
            KeyConditionExpression: "GSI1PK = :pk",
            ExpressionAttributeValues: {
                ":pk": `COUNTRIES`,
            },
            TableName: "configuration",
            IndexName: "GSI1",
        };
        try {
            const result = await client.query(params).promise();
            return result.Items.map((item) => country_model_1.CountryModel.fromItem(item).toDomain());
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.CountryRepository = CountryRepository;
//# sourceMappingURL=country-repository.js.map