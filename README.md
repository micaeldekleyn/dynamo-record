# Dynamo Record

This package aims to provide an *“humanize"* and more readable support of DynamoDB DocumentClient.

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

The library generates the config for DynamoDB for you.

In some cases where a method will not allow you to accomplish what you would like, each method has an optional params `config` where you can override each DocumentClient basic params. API documentation specify which *basic method* from DocumentClient is extended.

In Dynamo Record, all params for `config` are **camelize** key insteaf of **pascalize**.

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