// @flow

export type ReturnConsumedCapacity = "INDEXES" | "TOTAL" | "NONE";
export type ConditionalOperator = "AND" | "OR";
export type Select =
  | "ALL_ATTRIBUTES"
  | "ALL_PROJECTED_ATTRIBUTES"
  | "SPECIFIC_ATTRIBUTES"
  | "COUNT";

export type GetParams = {
  key: { [string]: mixed },
  tableName?: string,
  consistentRead?: boolean,
  returnConsumedCapacity?: ReturnConsumedCapacity,
  attributesToGet?: string[],
  expressionAttributeNames?: { [string]: string },
  projectionExpression?: string
};

export type DynamoDBGetParams = {
  TableName: string,
  Key: { [string]: mixed },
  ConsistentRead: boolean,
  ReturnConsumedCapacity: ReturnConsumedCapacity,
  AttributesToGet?: string[],
  ExpressionAttributeNames?: { [string]: string },
  ProjectionExpression?: string
};

export type AllParams = {
  tableName?: string,
  attributesToGet?: string[],
  conditionalOperator?: ConditionalOperator,
  consistentRead?: boolean,
  exclusiveStartKey?: { [string]: mixed },
  expressionAttributeNames?: { [string]: string },
  expressionAttributeValues?: { [string]: mixed },
  filterExpression?: string,
  indexName?: string,
  keyConditionExpression?: string,
  keyConditions?: { [string]: mixed },
  limit?: number,
  projectionExpression?: string,
  returnConsumedCapacity?: ReturnConsumedCapacity,
  scanIndexForward?: boolean,
  segment?: number,
  totalSegments?: number,
  select?: Select
};

export type DynamoDBQueryParams = {
  TableName: string,
  AttributesToGet?: string[],
  ConditionalOperator?: ConditionalOperator,
  ConsistentRead?: boolean,
  ExclusiveStartKey?: { [string]: mixed },
  ExpressionAttributeNames?: { [string]: string },
  ExpressionAttributeValues?: { [string]: mixed },
  FilterExpression?: string,
  IndexName?: string,
  KeyConditionExpression?: string,
  KeyConditions?: { [string]: mixed },
  Limit?: number,
  ProjectionExpression?: string,
  ReturnConsumedCapacity?: ReturnConsumedCapacity,
  ScanIndexForward?: boolean,
  Segment?: number,
  TotalSegments?: number,
  Select?: Select
};
