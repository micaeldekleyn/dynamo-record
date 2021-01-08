import { DynamoDB } from "aws-sdk";

type ReturnConsumedCapacity = "INDEXES" | "TOTAL" | "NONE";
type ConditionalOperator = "AND" | "OR";
type Select =
  | "ALL_ATTRIBUTES"
  | "ALL_PROJECTED_ATTRIBUTES"
  | "SPECIFIC_ATTRIBUTES"
  | "COUNT";

type DynamoDBGetParams<W> = {
  TableName: string;
  Key: W;
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

type QueryResponse<T> = {
  /**
   * An array of item attributes that match the query criteria. Each element in this array consists of an attribute name and the value for that attribute.
   */
  Items?: T[];
  /**
   * The number of items in the response. If you used a QueryFilter in the request, then Count is the number of items returned after the filter was applied, and ScannedCount is the number of matching items before the filter was applied. If you did not use a filter in the request, then Count and ScannedCount are the same.
   */
  Count?: number;
  /**
   * The number of items evaluated, before any QueryFilter is applied. A high ScannedCount value with few, or no, Count results indicates an inefficient Query operation. For more information, see Count and ScannedCount in the Amazon DynamoDB Developer Guide. If you did not use a filter in the request, then ScannedCount is the same as Count.
   */
  ScannedCount?: number;
  /**
   * The primary key of the item where the operation stopped, inclusive of the previous result set. Use this value to start a new operation, excluding this value in the new request. If LastEvaluatedKey is empty, then the "last page" of results has been processed and there is no more data to be retrieved. If LastEvaluatedKey is not empty, it does not necessarily mean that there is more data in the result set. The only way to know when you have reached the end of the result set is when LastEvaluatedKey is empty.
   */
  LastEvaluatedKey?: DynamoDB.Key;
  /**
   * The capacity units consumed by the Query operation. The data returned includes the total provisioned throughput consumed, along with statistics for the table and any indexes involved in the operation. ConsumedCapacity is only returned if the ReturnConsumedCapacity parameter was specified For more information, see Provisioned Throughput in the Amazon DynamoDB Developer Guide.
   */
  ConsumedCapacity?: DynamoDB.ConsumedCapacity;
};

type WhereFilterExpression = {
  condition: string;
  keys: { [key: string]: any };
};

declare module "dynamo-record" {
  /**
   * @template T Data type without the primary key
   * @template W Primary key type
   * @template S Full data type composed by primary key and data types
   */
  export class DynamoRecord<T, W, S = W & T> {
    constructor(
      tableName: string,
      config?: DynamoDB.Types.ClientConfiguration,
      tracing?: boolean = false
    );

    /**
     * find() return one item based on his primary key.
     * @param {*} primaryKey, an object with HASH and RANGE key.
     * @param {*} config, an object with params for the request. (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property)
     */
    find(primaryKey: W, config?: Object): Promise<S>;

    /**
     * where() return items based on primary key.
     * @param {*} primaryKey, an object with HASH and RANGE key.
     * @param {*} config, an object with params for the request. (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property)
     */
    where(
      primaryKey?: Partial<W>,
      filterExpression?: WhereFilterExpression,
      config?: Object
    ): Promise<QueryResponse<S>>;

    /**
     * getAll() return all items from table.
     * @param {*} config, an object with params for the request. (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property)
     */
    getAll(config?: Object): Promise<QueryResponse<S>>;

    /**
     * create() add an item into table
     * @param {*} createData, data to store into table
     * @param {*} config, an object with params for the request. (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property)
     */
    create(
      createData: S,
      config?: Object
    ): Promise<DynamoDB.DocumentClient.PutItemOutput>;

    /**
     * batchCreate() add items into table
     * @param {*} createData array of data to store into table max of 25 items
     * @param {*} config an object with params for the request. (https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#batchWriteItem-property)
     */
    batchCreate(
      createData: S[],
      config?: Object
    ): Promise<DynamoDB.DocumentClient.BatchWriteItemOutput>;

    /**
     * update() an item into table based on his primary key.
     * @param {*} primaryKey
     * @param {*} updateData
     * @param {*} config
     */
    update(
      primaryKey: W,
      updateData: Partial<T>,
      config?: Object
    ): Promise<DynamoDB.DocumentClient.UpdateItemOutput>;

    /**
     * deepUpdate() an item into table based on his primary key.
     * @param {*} primaryKey
     * @param {*} updateData
     * @param {*} config
     */
    deepUpdate(
      primaryKey: W,
      updateData: Partial<T>,
      config?: Object
    ): Promise<DynamoDB.DocumentClient.UpdateItemOutput>;

    destroy(
      primaryKey: W,
      config?: Object
    ): Promise<DynamoDB.DocumentClient.DeleteItemOutput>;
  }
}
