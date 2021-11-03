"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryModel = void 0;
const country_1 = require("../../../domain/country");
const document_model_1 = require("./document-model");
class CountryModel {
    constructor(data) {
        this.countryCode = data.countryCode;
        this.countryId = data.countryId;
        this.documents = data.documents;
        this.language = data.language;
        this.currency = data.currency;
        this.currencySymbol = data.currencySymbol;
        this.timeZone = data.timeZone;
    }
    static fromItem(countryItem, documents) {
        return new CountryModel({
            countryCode: countryItem.country_code,
            countryId: Number(countryItem.country_id),
            documents: documents,
            language: "NAN",
            currency: "$",
            currencySymbol: "S",
            timeZone: "BRT",
        });
    }
    static fromItems(items) {
        const countryItem = items.find((item) => this.isCountryItem(item));
        const documentItems = items.filter((item) => this.isDocumentItem(item));
        const documents = documentItems.map((item) => document_model_1.DocumentModel.fromItem(item));
        return this.fromItem(countryItem, documents);
    }
    static isCountryItem(item) {
        return item.sk && item.sk.startsWith(this.COUNTRY_SK);
    }
    static isDocumentItem(item) {
        return item.sk && item.sk.startsWith(this.DOCUMENT_SK);
    }
    toDomain() {
        return new country_1.Country({
            countryCode: this.countryCode,
            countryId: this.countryId,
            documents: this.documents ? this.documents.map((document) => document.toDomain()) : undefined,
            language: this.language,
            currency: this.currency,
            currencySymbol: this.currencySymbol,
            timeZone: this.timeZone,
        });
    }
}
exports.CountryModel = CountryModel;
CountryModel.COUNTRY_SK = "METADATA";
CountryModel.DOCUMENT_SK = "DOCUMENT#";
//# sourceMappingURL=country-model.js.map