import AWS from "aws-sdk";
import { Country } from "../../../domain/country";
import { CountryCollection } from "../collection/country-collection";
import { CountryItem } from "../item/country-item";
import { DocumentItem } from "../item/document-item";

// TODO - This is just an example. In the real app this must be an Inversify component
// TODO - The DocumentClient should be injected aswell.
// TODO - All methods must return a Result
export class CountryRepository {
  private static createDynamoClient() {
    AWS.config.update({
      region: "localhost",
      accessKeyId: "access_key_id",
      secretAccessKey: "secret_access_key",
    });

    return new AWS.DynamoDB.DocumentClient({
      endpoint: "http://localhost:8000",
    });
  }

  static async findByCountryCode(countryCode: string): Promise<Country> {
    const params = {
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": `COUNTRY#${countryCode}`,
      },
      TableName: "configuration",
    };

    try {
      const client = this.createDynamoClient();
      const result = await client.query(params).promise();
      return CountryCollection.fromDynamoCollection(result.Items).toDomain();
    } catch (error) {
      console.log(error);
    }
  }

  static async findAll(): Promise<Country[]> {
    const params = {
      KeyConditionExpression: "GSI1PK = :pk",
      ExpressionAttributeValues: {
        ":pk": `COUNTRIES`,
      },
      TableName: "configuration",
      IndexName: "GSI1",
    };

    try {
      const client = this.createDynamoClient();
      const result = await client.query(params).promise();
      return result.Items.map((item) => CountryItem.fromDynamoItem(item).toDomain());
    } catch (error) {
      console.log(error);
    }
  }

  // TODO - Do the writes inside a transaction using the transactWrite operation from DocumentClient
  static async insert(country: Country): Promise<boolean> {
    try {
      const countryCollection = CountryCollection.fromDomain(country);
      await this.insertCountryItem(countryCollection.countryItem);
      await this.insertDocumentItems(countryCollection.documentItems);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private static async insertCountryItem(countryItem: CountryItem) {
    const client = this.createDynamoClient();
    const params = {
      TableName: "configuration",
      Item: countryItem,
    };

    return await client.put(params).promise();
  }

  private static async insertDocumentItems(documentItems: DocumentItem[]) {
    return await Promise.all(documentItems.map((item) => this.insertDocumentItem(item)));
  }

  private static async insertDocumentItem(documentItem: DocumentItem) {
    const client = this.createDynamoClient();
    const params = {
      TableName: "configuration",
      Item: documentItem,
    };

    return await client.put(params).promise();
  }

  static async update(country: Country): Promise<boolean> {
    // TODO
    return !!country;
  }

  static async delete(country: Country): Promise<boolean> {
    // TODO
    return !!country;
  }
}
