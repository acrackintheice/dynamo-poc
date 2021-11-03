import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { NonFunctionProperties } from "../../../core/types";
import { Country } from "../../../domain/country";
import { CountryItem } from "../item/country-item";
import { DocumentItem } from "../item/document-item";

export class CountryCollection {
  // TODO - Perhaps we could centralize this "schema" information in a single place
  private static readonly COUNTRY_SK = "COUNTRY#";
  private static readonly DOCUMENT_SK = "DOCUMENT#";

  public readonly countryItem: CountryItem;
  public readonly documentItems?: DocumentItem[];

  constructor(data: NonFunctionProperties<CountryCollection>) {
    this.countryItem = data.countryItem;
    this.documentItems = data.documentItems;
  }

  static fromDynamoCollection(dynamoItems: DocumentClient.ItemList): CountryCollection {
    const dynamoCountryItem = dynamoItems.find((item) => this.isCountryItem(item)); // Todo - Adicionar verificação caso o find retorne null
    const dynamoDocumentItems = dynamoItems.filter((item) => this.isDocumentItem(item));
    return new CountryCollection({
      countryItem: CountryItem.fromDynamoItem(dynamoCountryItem),
      documentItems: dynamoDocumentItems.map((item) => DocumentItem.fromDynamoItem(item)),
    });
  }

  static isCountryItem(item: DocumentClient.AttributeMap): boolean {
    return item.sk && item.sk.startsWith(this.COUNTRY_SK);
  }

  static isDocumentItem(item: DocumentClient.AttributeMap): boolean {
    return item.sk && item.sk.startsWith(this.DOCUMENT_SK);
  }

  static fromDomain(country: Country): CountryCollection {
    return new CountryCollection({
      countryItem: CountryItem.fromDomain(country),
      documentItems: country.documents ? country.documents.map((doc) => DocumentItem.fromDomain(doc)) : [],
    });
  }

  public toDomain(): Country {
    return new Country({
      ...this.countryItem.toDomain(),
      documents: this.documentItems ? this.documentItems.map((document) => document.toDomain()) : undefined,
    });
  }
}
