import { NonFunctionProperties } from "../core/types";
import { AddressUsage } from "./address-usage";
import { Establishment } from "./establishment";
import { OperationConfiguration } from "./operation-configuration";

export class Operation {
  public readonly countryCode: string;
  public readonly countryId: number;
  public readonly createdAt: Date;
  public readonly createdBy: string;
  public readonly configuration: OperationConfiguration;
  public readonly establishments: Establishment[];
  public readonly addressUsages: AddressUsage[];
  public readonly defaultDocument: Document;

  constructor(data: NonFunctionProperties<Operation>) {
  }
}
