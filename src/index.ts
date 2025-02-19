import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import { UserRecord } from './core/entity/user'
import { sendEmail } from './core/sendEmail'

const app = new Hono()

app.post('/', async (ctx) => {
    const body = await ctx.req.json()

    // using the UserRecord entity imported from core/entity/user.ts to create a new record
    const record = await UserRecord.create({ 
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        createdAt: new Date().toISOString()
    })

    // using the sendEmail function imported from core/sendEmail.ts to send an email
   const sentEmail = await sendEmail(body.email, "Welcome to SST and following my blog around SST!")

   // return the response with the emailMessageId and the dbRecord
    return ctx.json({
        emailMessageId: sentEmail.MessageId || null,
        dbRecord: record
    })
})

export const handler = handle(app)