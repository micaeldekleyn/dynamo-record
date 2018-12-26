// @flow

import { DynamoDB } from "aws-sdk";
import { forEach, upperFirst } from "lodash";
import type {
  GetParams,
  DynamoDBGetParams,
  AllParams,
  DynamoDBQueryParams
} from "./types";

export class DynamoRecord {
  tableName: string;

  dynamoClient: DynamoDB.DocumentClient;

  constructor(tableName: string, tableRegion: string) {
    this.tableName = tableName;

    this.dynamoClient = new DynamoDB.DocumentClient({
      tableRegion
    });
  }

  /**
   *  get() retrieve one item based on his primary key.
   * @param {*} clientParams
   * @param {*} onlyItem
   */
  get(clientParams: GetParams, onlyItem?: boolean = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const params: DynamoDBGetParams = {
        TableName: this.tableName,
        Key: clientParams.key,
        ConsistentRead: true,
        ReturnConsumedCapacity: "TOTAL"
      };

      forEach(clientParams, (value, key) => {
        params[upperFirst(key)] = value;
      });

      this.dynamoClient.get(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(onlyItem ? data.Item : data);
        }
      });
    });
  }

  query(clientParams: AllParams, onlyItems?: boolean = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const params: DynamoDBQueryParams = {
        TableName: this.tableName
        // ConsistentRead: true,
        // ConditionalOperator: "AND",
        // ReturnConsumedCapacity: "TOTAL",
        // ScanIndexForward: true,
        // Select: "ALL_ATTRIBUTES"
      };

      forEach(clientParams, (value, key) => {
        params[upperFirst(key)] = value;
      });

      // Directly access items from a table by primary key or a secondary index.
      this.dynamoClient.query(params, (error: any, data: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(onlyItems ? data.Items : data);
        }
      });
    });
  }
}
