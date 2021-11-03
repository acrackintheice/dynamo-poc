import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { NonFunctionProperties } from "../../../core/types";
import { Document } from "../../../domain/document";

export class DocumentItem {
  public readonly pk;
  public readonly sk;
  public readonly documentMask;
  public readonly documentName;

  constructor(data: NonFunctionProperties<DocumentItem>) {
    this.pk = data.pk;
    this.sk = data.sk;
    this.documentMask = data.documentMask;
    this.documentName = data.documentName;
  }

  public toDomain(): Document {
    return new Document({
      documentMask: this.documentMask,
      documentName: this.documentName,
      countryCode: this.extractCountryCodeFromPk(),
    });
  }

  private extractCountryCodeFromPk() {
    return this.pk.split("#")[1];
  }

  static fromDynamoItem(item: DocumentClient.AttributeMap) {
    return new DocumentItem({
      pk: item.pk,
      sk: item.sk,
      documentMask: item.documentMask,
      documentName: item.documentName,
    });
  }

  static fromDomain(document: Document) {
    return new DocumentItem({
      pk: `COUNTRY#${document.countryCode}`,
      sk: `DOCUMENT#${document.documentName}`,
      documentMask: document.documentMask,
      documentName: document.documentName,
    });
  }
}
