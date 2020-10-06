import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import createMongoClient from "../shared/mongo";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { db, connection } = await createMongoClient()

  const JournalEntries = db.collection('journalEntries')
  const res = JournalEntries.find({})
  const body = await res.toArray()

  connection.close()

  context.res = {
    status: 200,
    body
  }

};

export default httpTrigger;