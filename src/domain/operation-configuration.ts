import { NonFunctionProperties } from "../core/types";

export class OperationConfiguration {
  public readonly emailConfiguration: string;
  public readonly addressConfiguration: string;
  public readonly attachmentConfiguration: number;
  public readonly telephoneConfiguration: string;

  constructor(data: NonFunctionProperties<OperationConfiguration>) {
  }
}
