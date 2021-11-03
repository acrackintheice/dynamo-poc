import { NonFunctionProperties } from "../core/types";
import { Document } from "./document";

export class Country {
  public readonly countryName: string;
  public readonly countryCode: string;
  public readonly countryId: number;
  public readonly language: string;
  public readonly currency: string;
  public readonly currencySymbol: string;
  public readonly timeZone: string;
  public readonly documents?: Document[];

  constructor(data: NonFunctionProperties<Country>) {
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
