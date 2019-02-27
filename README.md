# Dynamo Record

This package aims to provide a *“humanized"* and more readable support of DynamoDB DocumentClient.

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

``` javascript
// assumes AWS.config is set up already
import { DynamoRecord } from "dynamo-record";

const repo = new DynamoRecord(
	tableName,
	tableRegion
);
```

## Key concept

The library generates the DynamoDB config for you.

In some cases where a method will not allow you to accomplish what you would like, each method has an optional params `config` where you can override each DocumentClient basic params. API documentation specify which *basic method* from DocumentClient is extended.

In Dynamo Record, all params for `config` are **camelize** (fooBar) key insteaf of **pascalize** (FooBar).

## API

*The following methods are available. All DocumentClient methods are not already implemented* 

## find

**Return a single element based on his primary key**

``` javascript
repo.find(primaryKey, config)
```

Extend: [get()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property)

### Parameters

-   `primaryKey` **object** with hash and range key. Provided keys must match dynamoDB schema.
-   `config` **optional** - **object** with DocumentClient params.

## where

**Return all items that match primary key and/or condition**

``` javascript
repo.where(primaryKey, filterExpression, config)
```

Extend: [query()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property)
[scan()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property)

### Parameters

-   `primaryKey` **optional** - **object** with hash and range key. Provided keys must match dynamoDB schema.
-   `filterExpression` **optional** - **object** with required condition and keys property.
-   `config` **optional** - **object** with DocumentClient params.

## getAll

**Return all items**

``` javascript
repo.getAll(config)
```

Extend: [scan()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property)

### Parameters

-   `config` **optional** - **object** with DocumentClient params.

## create

**Add a new item**

``` javascript
repo.create(createData, config)
```

Extend: [put()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property)

### Parameters

-   `createData` **object** with data to add into table.
-   `config` **optional** - **object** with DocumentClient params.

## update

**Update an item based on his primary key**

``` javascript
repo.update(primaryKey, updateData, config)
```

Extend: [update()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property)

### Parameters

-   `primaryKey` **object** with hash and range key. Provided keys must match dynamoDB schema.
-   `updateData` **object** with item data to update.
-   `config` **optional** - **object** with DocumentClient params.

## destroy

**Remove an item**

``` javascript
repo.delete(primaryKey, config)
```

Extend: [delete()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#delete-property)

### Parameters

-   `primaryKey` **object** with hash and range key. Provided keys must match dynamoDB schema.
-   `config` **optional** - **object** with DocumentClient params.
