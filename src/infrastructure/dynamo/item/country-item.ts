import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { NonFunctionProperties } from "../../../core/types";
import { Country } from "../../../domain/country";
// import { DocumentModel } from "./document-item";

export class CountryItem {
  private static readonly COUNTRY_GSI1PK = "COUNTRIES";

  public readonly pk: string;
  public readonly sk: string;
  public readonly countryName: string;
  public readonly countryCode: string;
  public readonly countryId: number;
  public readonly language: string;
  public readonly currency: string;
  public readonly currencySymbol: string;
  public readonly timeZone: string;
  public readonly GSI1PK: string;
  public readonly GSI1SK: string;

  constructor(data: NonFunctionProperties<CountryItem>) {
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

  static fromDynamoItem(dynamoItem: DocumentClient.AttributeMap): CountryItem {
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

  static fromDomain(country: Country): CountryItem {
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

  public toDomain(): Country {
    return new Country({
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
