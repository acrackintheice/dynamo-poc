"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentModel = void 0;
const document_1 = require("../../../domain/document");
class DocumentModel {
    constructor(data) {
        this.documentMask = data.documentMask;
        this.documentName = data.documentName;
    }
    toDomain() {
        return new document_1.Document({
            documentMask: this.documentMask,
            documentName: this.documentName,
        });
    }
    static fromItem(item) {
        return new DocumentModel({
            documentMask: item.document_mask,
            documentName: item.document_name,
        });
    }
}
exports.DocumentModel = DocumentModel;
//# sourceMappingURL=document-model.js.map