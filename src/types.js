// @flow
import { DynamoDB } from "aws-sdk";

export type ReturnConsumedCapacity = "INDEXES" | "TOTAL" | "NONE";
export type ConditionalOperator = "AND" | "OR";
export type Select =
  | "ALL_ATTRIBUTES"
  | "ALL_PROJECTED_ATTRIBUTES"
  | "SPECIFIC_ATTRIBUTES"
  | "COUNT";

export type DynamoDBGetParams<W> = {
  TableName: string,
  Key: W,
  ConsistentRead: boolean,
  ReturnConsumedCapacity: ReturnConsumedCapacity,
  AttributesToGet?: string[],
  ExpressionAttributeNames?: { [string]: string },
  ProjectionExpression?: string
};

export type DynamoDBQueryParams = {
  TableName: string,
  AttributesToGet?: string[],
  ConditionalOperator?: ConditionalOperator,
  ConsistentRead?: boolean,
  ExclusiveStartKey?: { [string]: any },
  ExpressionAttributeNames: { [string]: string },
  ExpressionAttributeValues: { [string]: any },
  FilterExpression?: string,
  IndexName?: string,
  KeyConditionExpression?: string,
  KeyConditions?: { [string]: any },
  Limit?: number,
  ProjectionExpression?: string,
  ReturnConsumedCapacity?: ReturnConsumedCapacity,
  ScanIndexForward?: boolean,
  Segment?: number,
  TotalSegments?: number,
  Select?: Select
};

export type WhereFilterExpression = {
  condition: string,
  keys: { [key: string]: any }
};

export type QueryResponse<T> = {
  /**
   * An array of item attributes that match the query criteria. Each element in this array consists of an attribute name and the value for that attribute.
   */
  Items?: T[],
  /**
   * The number of items in the response. If you used a QueryFilter in the request, then Count is the number of items returned after the filter was applied, and ScannedCount is the number of matching items before the filter was applied. If you did not use a filter in the request, then Count and ScannedCount are the same.
   */
  Count?: number,
  /**
   * The number of items evaluated, before any QueryFilter is applied. A high ScannedCount value with few, or no, Count results indicates an inefficient Query operation. For more information, see Count and ScannedCount in the Amazon DynamoDB Developer Guide. If you did not use a filter in the request, then ScannedCount is the same as Count.
   */
  ScannedCount?: number,
  /**
   * The primary key of the item where the operation stopped, inclusive of the previous result set. Use this value to start a new operation, excluding this value in the new request. If LastEvaluatedKey is empty, then the "last page" of results has been processed and there is no more data to be retrieved. If LastEvaluatedKey is not empty, it does not necessarily mean that there is more data in the result set. The only way to know when you have reached the end of the result set is when LastEvaluatedKey is empty.
   */
  LastEvaluatedKey?: DynamoDB.Key,
  /**
   * The capacity units consumed by the Query operation. The data returned includes the total provisioned throughput consumed, along with statistics for the table and any indexes involved in the operation. ConsumedCapacity is only returned if the ReturnConsumedCapacity parameter was specified For more information, see Provisioned Throughput in the Amazon DynamoDB Developer Guide.
   */
  ConsumedCapacity?: DynamoDB.ConsumedCapacity
};
