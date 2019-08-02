# Dynamo Record

This package aims to provide a _“humanized"_ and more readable support of DynamoDB DocumentClient.

## Getting started

### Installation

```sh
$ npm install dynamo-record --save
```

OR

```sh
$ yarn add dynamo-record
```

### Import & initialization

```javascript
// assumes AWS.config is set up already
import { DynamoRecord } from "dynamo-record";

const repo = new DynamoRecord(tableName, tableRegion);
```

## Key concept

The library generates the DynamoDB config for you.

In some cases where a method will not allow you to accomplish what you would like, each method has an optional params `config` where you can override each DocumentClient basic params. API documentation specify which _basic method_ from DocumentClient is extended.

In Dynamo Record, all params for `config` are **camelize** (fooBar) key instead of **pascalize** (FooBar).

## API

_The following methods are available. All DocumentClient methods are not already implemented_

## find

**Return a single element based on his primary key**

```javascript
repo.find(primaryKey, config);
```

Extend: [get()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property)

### Parameters

- `primaryKey` **object** with hash and range key. Provided keys must match dynamoDB schema.
- `config` **optional** - **object** with DocumentClient params.

## where

**Return all items that match primary key and/or condition**

```javascript
repo.where(primaryKey, filterExpression, config);
```

Extend: [query()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property)
[scan()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property)

### Parameters

- `primaryKey` **optional** - **object** with hash and range key. Provided keys must match dynamoDB schema.
- `filterExpression` **optional** - **object** with required condition and keys property.
- `config` **optional** - **object** with DocumentClient params.

## getAll

**Return all items**

```javascript
repo.getAll(config);
```

Extend: [scan()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property)

### Parameters

- `config` **optional** - **object** with DocumentClient params.

## create

**Add a new item**

```javascript
repo.create(createData, config);
```

Extend: [put()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property)

### Parameters

- `createData` **object** with data to add into table.
- `config` **optional** - **object** with DocumentClient params.

## batchCreate

**Add an array of items**

```javascript
repo.batchCreate(createData, config);
```

Extend: [batchWrite()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#batchWriteItem-property)

### Parameters

- `createData` **array** of items to add into table.
- `config` **optional** - **object** with DocumentClient params.

## update

**Deep update an item based on his primary key**

The updated object must have a full existing tree of all nested object before the update. _DynamoDB_ can't update a property and create it's parent object on the same request.

If user wants to update a whole object without knowing the nested content, he can pass a custom config through _updateExpression_, _expressionAttributeNames_ and _expressionAttributeValues_.

```javascript
repo.update(primaryKey, updateData, config);
```

Extend: [update()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property)

### Parameters

- `primaryKey` **object** with hash and range key. Provided keys must match dynamoDB schema.
- `updateData` **object** with item data to update.
- `config` **optional** - **object** with DocumentClient params.

## destroy

**Remove an item**

```javascript
repo.delete(primaryKey, config);
```

Extend: [delete()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#delete-property)

### Parameters

- `primaryKey` **object** with hash and range key. Provided keys must match dynamoDB schema.
- `config` **optional** - **object** with DocumentClient params.
