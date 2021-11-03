"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentItem = void 0;
const document_1 = require("../../../domain/document");
class DocumentItem {
    constructor(data) {
        this.pk = data.pk;
        this.sk = data.sk;
        this.documentMask = data.documentMask;
        this.documentName = data.documentName;
    }
    toDomain() {
        return new document_1.Document({
            documentMask: this.documentMask,
            documentName: this.documentName,
            countryCode: this.extractCountryCodeFromPk(),
        });
    }
    extractCountryCodeFromPk() {
        return this.pk.split("#")[1];
    }
    static fromDynamoItem(item) {
        return new DocumentItem({
            pk: item.pk,
            sk: item.sk,
            documentMask: item.documentMask,
            documentName: item.documentName,
        });
    }
    static fromDomain(document) {
        return new DocumentItem({
            pk: `COUNTRY#${document.countryCode}`,
            sk: `DOCUMENT#${document.documentName}`,
            documentMask: document.documentMask,
            documentName: document.documentName,
        });
    }
}
exports.DocumentItem = DocumentItem;
//# sourceMappingURL=document-item.js.map