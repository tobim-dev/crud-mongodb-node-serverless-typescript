import { AzureFunction, Context } from "@azure/functions"
import createConnection from "../shared/mongoose";

const httpTrigger: AzureFunction = async function (context: Context): Promise<void> {
    const { db } = await createConnection()

  const JournalEntries = db.collection('journalEntries')
  const res = JournalEntries.find({})
  const body = await res.toArray()

  await db.close()

  context.res = {
    status: 200,
    body
  }

};

export default httpTrigger;