// @flow

import { DynamoDB } from "aws-sdk";
import { forEach, upperFirst, join } from "lodash";
import { type DynamoDBGetParams, type DynamoDBQueryParams } from "./types";

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
   * find() return one item based on his primary key.
   * @param {*} primaryKey, an object with HASH and RANGE key.
   * @param {*} config, an object with params for the request. (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property)
   */
  find(primaryKey: Object, config?: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      const params: DynamoDBGetParams = {
        TableName: this.tableName,
        Key: primaryKey,
        ConsistentRead: true,
        ReturnConsumedCapacity: "TOTAL"
      };

      if (config) {
        forEach(config, (value, key) => {
          params[upperFirst(key)] = value;
        });
      }

      this.dynamoClient.get(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * where() return items based on primary key.
   * @param {*} primaryKey, an object with HASH and RANGE key.
   * @param {*} config, an object with params for the request. (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property)
   */
  where(primaryKey: Object, config?: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      const params: DynamoDBQueryParams = {
        TableName: this.tableName,
        ExpressionAttributeValues: {},
        ReturnConsumedCapacity: "TOTAL",
        ScanIndexForward: true,
        Select: "ALL_ATTRIBUTES"
      };
      const primaryKeyArray: string[] = [];

      // Create an array with each primary key part
      // Assign :key / value (data interpolation syntax from Dynamo) to ExpressionAttributeValues
      forEach(primaryKey, (value, key) => {
        primaryKeyArray.push(`${key} = :${key}`);
        params.ExpressionAttributeValues[":" + key] = value;
      });

      // Join with 'AND' each primary key part
      params.KeyConditionExpression = join(primaryKeyArray, " AND ");

      if (config) {
        forEach(config, (value, key) => {
          params[upperFirst(key)] = value;
        });
      }

      // Directly access items from a table by primary key or a secondary index.
      this.dynamoClient.query(params, (error: any, data: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * create() add an item into table
   * @param {*} createData, data to store into table
   * @param {*} config, an object with params for the request. (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property)
   */
  create(createData: Object, config?: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      const params: any = {
        TableName: this.tableName,
        Item: createData
      };

      if (config) {
        forEach(config, (value, key) => {
          params[upperFirst(key)] = value;
        });
      }

      this.dynamoClient.put(params, (error: any, data: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}
