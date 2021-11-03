"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryRepository = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const country_collection_1 = require("../collection/country-collection");
const country_item_1 = require("../item/country-item");
// This is just an example. In the real app this must be an Inversify component
// The DocumentClient should be injected aswell.
// All methods must return a Result
class CountryRepository {
    static createDynamoClient() {
        aws_sdk_1.default.config.update({
            region: "localhost",
            accessKeyId: "access_key_id",
            secretAccessKey: "secret_access_key",
        });
        return new aws_sdk_1.default.DynamoDB.DocumentClient({
            endpoint: "http://localhost:8000",
        });
    }
    static async findByCountryCode(countryCode) {
        const params = {
            KeyConditionExpression: "pk = :pk",
            ExpressionAttributeValues: {
                ":pk": `COUNTRY#${countryCode}`,
            },
            TableName: "configuration",
        };
        try {
            const client = this.createDynamoClient();
            const result = await client.query(params).promise();
            return country_collection_1.CountryCollection.fromDynamoCollection(result.Items).toDomain();
        }
        catch (error) {
            console.log(error);
        }
    }
    static async findAll() {
        const params = {
            KeyConditionExpression: "GSI1PK = :pk",
            ExpressionAttributeValues: {
                ":pk": `COUNTRIES`,
            },
            TableName: "configuration",
            IndexName: "GSI1",
        };
        try {
            const client = this.createDynamoClient();
            const result = await client.query(params).promise();
            return result.Items.map((item) => country_item_1.CountryItem.fromDynamoItem(item).toDomain());
        }
        catch (error) {
            console.log(error);
        }
    }
    // TODO - Do the writes inside a transaction using the transactWrite operation from DocumentClient
    static async insert(country) {
        try {
            const countryCollection = country_collection_1.CountryCollection.fromDomain(country);
            await this.insertCountryItem(countryCollection.countryItem);
            await this.insertDocumentItems(countryCollection.documentItems);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    static async insertCountryItem(countryItem) {
        const client = this.createDynamoClient();
        const params = {
            TableName: "configuration",
            Item: countryItem,
        };
        return await client.put(params).promise();
    }
    static async insertDocumentItems(documentItems) {
        return await Promise.all(documentItems.map((item) => this.insertDocumentItem(item)));
    }
    static async insertDocumentItem(documentItem) {
        const client = this.createDynamoClient();
        const params = {
            TableName: "configuration",
            Item: documentItem,
        };
        return await client.put(params).promise();
    }
    static async update(country) {
        // TODO
        return !!country;
    }
    static async delete(country) {
        // TODO
        return !!country;
    }
}
exports.CountryRepository = CountryRepository;
//# sourceMappingURL=country-repository.js.map