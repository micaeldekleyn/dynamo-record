type ReturnConsumedCapacity = "INDEXES" | "TOTAL" | "NONE";
type ConditionalOperator = "AND" | "OR";
type Select =
  | "ALL_ATTRIBUTES"
  | "ALL_PROJECTED_ATTRIBUTES"
  | "SPECIFIC_ATTRIBUTES"
  | "COUNT";

type DynamoDBGetParams = {
  TableName: string;
  Key: { [key: string]: any };
  ConsistentRead: boolean;
  ReturnConsumedCapacity: ReturnConsumedCapacity;
  AttributesToGet?: string[];
  ExpressionAttributeNames?: { [key: string]: string };
  ProjectionExpression?: string;
};

type DynamoDBQueryParams = {
  TableName: string;
  AttributesToGet?: string[];
  ConditionalOperator?: ConditionalOperator;
  ConsistentRead?: boolean;
  ExclusiveStartKey?: { [key: string]: any };
  ExpressionAttributeNames?: { [key: string]: string };
  ExpressionAttributeValues: { [key: string]: any };
  FilterExpression?: string;
  IndexName?: string;
  KeyConditionExpression?: string;
  KeyConditions?: { [key: string]: any };
  Limit?: number;
  ProjectionExpression?: string;
  ReturnConsumedCapacity?: ReturnConsumedCapacity;
  ScanIndexForward?: boolean;
  Segment?: number;
  TotalSegments?: number;
  Select?: Select;
};

declare module "dynamo-record" {
  export class DynamoRecord {
    constructor(tableName: string, tableRegion: string, tracing: boolean);

    /**
     * find() return one item based on his primary key.
     * @param {*} primaryKey, an object with HASH and RANGE key.
     * @param {*} config, an object with params for the request. (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property)
     */
    find(primaryKey: Object, config?: Object): Promise<any>;

    /**
     * where() return items based on primary key.
     * @param {*} primaryKey, an object with HASH and RANGE key.
     * @param {*} config, an object with params for the request. (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property)
     */
    where(
      primaryKey?: Object,
      filterExpression?: Object,
      config?: Object
    ): Promise<any>;

    /**
     * getAll() return all items from table.
     * @param {*} config, an object with params for the request. (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property)
     */
    getAll(config?: Object): Promise<any>;

    /**
     * create() add an item into table
     * @param {*} createData, data to store into table
     * @param {*} config, an object with params for the request. (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property)
     */
    create(createData: any, config?: Object): Promise<any>;

    /**
     * batchCreate() add items into table
     * @param {*} createData array of data to store into table max of 25 items
     * @param {*} config an object with params for the request. (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#batchWriteItem-property)
     */
    batchCreate(createData: Object[], config?: Object): Promise<any>;

    /**
     * update() an item into table based on his primary key.
     * @param {*} primaryKey
     * @param {*} updateData
     * @param {*} config
     */
    update(primaryKey: Object, updateData: any, config?: Object): Promise<any>;

    /**
     * deepUpdate() an item into table based on his primary key.
     * @param {*} primaryKey
     * @param {*} updateData
     * @param {*} config
     */
    deepUpdate(
      primaryKey: Object,
      updateData: any,
      config?: Object
    ): Promise<any>;

    destroy(primaryKey: Object, config?: Object): Promise<any>;
  }
}
