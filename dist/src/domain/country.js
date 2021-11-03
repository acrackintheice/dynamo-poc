"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
class Country {
    constructor(data) {
        this.countryName = data.countryName;
        this.countryCode = data.countryCode;
        this.countryId = data.countryId;
        this.language = data.language;
        this.currency = data.currency;
        this.currencySymbol = data.currencySymbol;
        this.timeZone = data.timeZone;
        this.documents = data.documents;
    }
}
exports.Country = Country;
//# sourceMappingURL=country.js.map