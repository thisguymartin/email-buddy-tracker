import { Resource } from "sst";
import { SESv2Client, SendEmailCommand, type SendEmailCommandOutput } from "@aws-sdk/client-sesv2";

const client = new SESv2Client();

export const sendEmail = (email: string, body: string): Promise<SendEmailCommandOutput> => {
    return client.send(
        new SendEmailCommand({
        FromEmailAddress: Resource.MyEmail.sender,
        Destination: {
            ToAddresses: [email]
        },
        Content: {
            Simple: {
            Subject: { Data: "Hello from SST" },
            Body: { Text: { Data: body } }
            }
        }
        })
    );
}
