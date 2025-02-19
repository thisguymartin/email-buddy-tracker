import DynamoDB from "aws-sdk/clients/dynamodb";
import { Entity } from "electrodb";
import { Resource } from "sst"; // Import the Resource from the SST stack 

const client = new DynamoDB.DocumentClient();

export const UserRecord = new Entity({
  model: {
    entity: "UserRecord",
    service: "user",
    version: "1",
  },
  attributes: {
    // This "entity" attribute can help differentiate this Entity from other
    // records if you share the table with multiple entity types.
    entity: {
      type: "string",
      required: true,
      default: "ENTITY#USER",
    },
    email: {
      type: "string",
      required: true,
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
      required: true,
    },
    createdAt: {
      type: "string",
      required: true,
      default: () => new Date().toISOString(),
    },
  },
  indexes: {
    primary: {
      pk: {
        // The "field" below must match the PK field in your DynamoDB table
        field: "pk",
        // The "composite" array defines which attributes combine to form the PK.
        // In this simple example, we use the `entity` and `email` attributes.
        composite: ["entity", "email"],
      },
      sk: {
        // The "field" below must match the SK field in your DynamoDB table
        field: "sk",
        // We only use `createdAt` to form the SK.
        composite: ["createdAt"],
      },
    },
  },
}, {
  table: Resource.UserRecords.name,
  client,
});