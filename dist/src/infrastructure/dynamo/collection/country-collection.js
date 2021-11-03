"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryCollection = void 0;
const country_1 = require("../../../domain/country");
const country_item_1 = require("../item/country-item");
const document_item_1 = require("../item/document-item");
class CountryCollection {
    constructor(data) {
        this.countryItem = data.countryItem;
        this.documentItems = data.documentItems;
    }
    static fromDynamoCollection(dynamoItems) {
        const dynamoCountryItem = dynamoItems.find((item) => this.isCountryItem(item));
        const dynamoDocumentItems = dynamoItems.filter((item) => this.isDocumentItem(item));
        return new CountryCollection({
            countryItem: country_item_1.CountryItem.fromDynamoItem(dynamoCountryItem),
            documentItems: dynamoDocumentItems.map((item) => document_item_1.DocumentItem.fromDynamoItem(item)),
        });
    }
    static isCountryItem(item) {
        return item.sk && item.sk.startsWith(this.COUNTRY_SK);
    }
    static isDocumentItem(item) {
        return item.sk && item.sk.startsWith(this.DOCUMENT_SK);
    }
    static fromDomain(country) {
        return new CountryCollection({
            countryItem: country_item_1.CountryItem.fromDomain(country),
            documentItems: country.documents ? country.documents.map((doc) => document_item_1.DocumentItem.fromDomain(doc)) : [],
        });
    }
    toDomain() {
        return new country_1.Country(Object.assign(Object.assign({}, this.countryItem.toDomain()), { documents: this.documentItems ? this.documentItems.map((document) => document.toDomain()) : undefined }));
    }
}
exports.CountryCollection = CountryCollection;
// TODO - Perhaps we could centralize this "schema" information in a single place
CountryCollection.COUNTRY_SK = "METADATA";
CountryCollection.DOCUMENT_SK = "DOCUMENT#";
//# sourceMappingURL=country-collection.js.map