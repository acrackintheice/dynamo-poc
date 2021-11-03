import { NonFunctionProperties } from "../core/types";

export class Document {
  public readonly documentMask: string;
  public readonly documentName: string;
  public readonly countryCode: string;

  constructor(data: NonFunctionProperties<Document>) {
    this.documentMask = data.documentMask;
    this.documentName = data.documentName;
    this.countryCode = data.countryCode;
  }
}
