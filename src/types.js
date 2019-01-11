// @flow

export type ReturnConsumedCapacity = "INDEXES" | "TOTAL" | "NONE";
export type ConditionalOperator = "AND" | "OR";
export type Select =
  | "ALL_ATTRIBUTES"
  | "ALL_PROJECTED_ATTRIBUTES"
  | "SPECIFIC_ATTRIBUTES"
  | "COUNT";

export type DynamoDBGetParams = {
  TableName: string,
  Key: { [string]: any },
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
