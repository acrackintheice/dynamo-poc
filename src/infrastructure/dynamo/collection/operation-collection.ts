import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { NonFunctionProperties } from "../../../core/types";
import { Operation } from "../../../domain/operation";
import { DocumentItem } from "../item/document-item";
import { OperationItem } from "../item/operation-item";

export class OperationCollection {
  // TODO - Perhaps we could centralize this "schema" information in a single place
  private static readonly Operation_SK = "METADATA";
  private static readonly DOCUMENT_SK = "DOCUMENT#";

  public readonly operationItem: OperationItem;

  constructor(data: NonFunctionProperties<OperationCollection>) {
    this.operationItem = data.operationItem;
  }

  static fromDynamoCollection(dynamoItems: DocumentClient.ItemList): OperationCollection {
    const dynamoOperationItem = dynamoItems.find((item) => this.isOperationItem(item));
    return new OperationCollection({
      operationItem: OperationItem.fromDynamoItem(dynamoOperationItem),
    });
  }

  static isOperationItem(item: DocumentClient.AttributeMap): boolean {
    return item.sk && item.sk.startsWith(this.Operation_SK);
  }

  static isDocumentItem(item: DocumentClient.AttributeMap): boolean {
    return item.sk && item.sk.startsWith(this.DOCUMENT_SK);
  }

  static fromDomain(Operation: Operation): OperationCollection {
    return new OperationCollection(undefined);
  }

  public toDomain(): Operation {
    return new Operation(undefined);
  }
}
