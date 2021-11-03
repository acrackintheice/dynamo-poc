"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationCollection = void 0;
const operation_1 = require("../../../domain/operation");
const operation_item_1 = require("../item/operation-item");
class OperationCollection {
    constructor(data) {
        this.operationItem = data.operationItem;
    }
    static fromDynamoCollection(dynamoItems) {
        const dynamoOperationItem = dynamoItems.find((item) => this.isOperationItem(item));
        return new OperationCollection({
            operationItem: operation_item_1.OperationItem.fromDynamoItem(dynamoOperationItem),
        });
    }
    static isOperationItem(item) {
        return item.sk && item.sk.startsWith(this.Operation_SK);
    }
    static isDocumentItem(item) {
        return item.sk && item.sk.startsWith(this.DOCUMENT_SK);
    }
    static fromDomain(Operation) {
        return new OperationCollection(undefined);
    }
    toDomain() {
        return new operation_1.Operation(undefined);
    }
}
exports.OperationCollection = OperationCollection;
// TODO - Perhaps we could centralize this "schema" information in a single place
OperationCollection.Operation_SK = "METADATA";
OperationCollection.DOCUMENT_SK = "DOCUMENT#";
//# sourceMappingURL=operation-collection.js.map