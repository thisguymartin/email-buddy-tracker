/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "email-buddy-tracker",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    // create aws components here

    // Create a new DynamoDB table called "UserRecords"
    const userRecordsTable = new sst.aws.Dynamo("UserRecords", {
      fields: {
        pk: "string",
        sk: "string"
      },
      primaryIndex: { hashKey: "pk", rangeKey: "sk" }
    });

    // Create an email component with the sender email address
    const email = new sst.aws.Email("MyEmail", {
      sender: "martin@gizmodlabs.com",
    });

  
    // Create a new AWS Lambda function called "HonoApi" and link it to the table
    new sst.aws.Function("HonoApi", { 
      url: true, // Enable URL for the function endpoint (default: false)
      handler: "src/index.handler",
      link:[userRecordsTable, email], // Link the function to the table
    });
    
  },
});
