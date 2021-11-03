"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryItem = void 0;
const country_1 = require("../../../domain/country");
// import { DocumentModel } from "./document-item";
class CountryItem {
    constructor(data) {
        this.pk = data.pk;
        this.sk = data.sk;
        this.countryName = data.countryName;
        this.countryCode = data.countryCode;
        this.countryId = data.countryId;
        this.language = data.language;
        this.currency = data.currency;
        this.currencySymbol = data.currencySymbol;
        this.timeZone = data.timeZone;
        this.GSI1PK = data.GSI1PK;
        this.GSI1SK = data.GSI1SK;
    }
    static fromDynamoItem(dynamoItem) {
        return new CountryItem({
            pk: dynamoItem.pk,
            sk: dynamoItem.sk,
            countryName: dynamoItem.countryName,
            countryCode: dynamoItem.countryCode,
            countryId: Number(dynamoItem.countryId),
            language: dynamoItem.language,
            currency: dynamoItem.currency,
            currencySymbol: dynamoItem.currencySymbol,
            timeZone: dynamoItem.timeZone,
            GSI1PK: dynamoItem.GSI1PK,
            GSI1SK: dynamoItem.GSI1SK,
        });
    }
    static fromDomain(country) {
        const pk = `COUNTRY#${country.countryCode}`;
        return new CountryItem({
            pk: pk,
            sk: pk,
            countryName: country.countryName,
            countryCode: country.countryCode,
            countryId: country.countryId,
            language: country.language,
            currency: country.currency,
            currencySymbol: country.currencySymbol,
            timeZone: country.timeZone,
            GSI1PK: this.COUNTRY_GSI1PK,
            GSI1SK: pk,
        });
    }
    toDomain() {
        return new country_1.Country({
            countryName: this.countryName,
            countryCode: this.countryCode,
            countryId: this.countryId,
            language: this.language,
            currency: this.currency,
            currencySymbol: this.currencySymbol,
            timeZone: this.timeZone,
        });
    }
}
exports.CountryItem = CountryItem;
CountryItem.COUNTRY_GSI1PK = "COUNTRIES";
//# sourceMappingURL=country-item.js.map