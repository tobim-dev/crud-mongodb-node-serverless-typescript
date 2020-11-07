import httpTrigger from "./index";
import { Context } from "@azure/functions";
import createConnection from "../shared/createConnection";
import { JournalEntry, JournalEntrySchema } from "../models/journalEntry.model";

// Mocks
jest.mock("../shared/createConnection");

const defaultContext = {
  log: jest.fn(),
};

describe("Test GetAllJournalEntries", () => {
  const stubJournalEntry = {
    title: "Again Entry",
    content: "Try This",
    date: new Date(),
    entryDayTime: "Morning",
    userId: "3az0Cc3FAheYUJq5nOJ8GrAPbuE3",
  };

  it("should return a 200 with an empty array", async () => {
    const { db } = await createConnection();
    const request = {
      params: {},
    };

    await httpTrigger((defaultContext as unknown) as Context, request);
    expect(((defaultContext as unknown) as Context).res.status).toEqual(200);
    expect(((defaultContext as unknown) as Context).res.body).toEqual([]);
    await db.close();
  });

  it("should return a 200 with one Journal Entry and the JournalEntry Data", async () => {
    const { db } = await createConnection();

    const journalEntryModel = db.model<JournalEntry>(
      "JournalEntry",
      JournalEntrySchema
    );
    await journalEntryModel.create(stubJournalEntry as JournalEntry);

    const request = {
      params: {
        userId: stubJournalEntry.userId,
      },
    };

    await httpTrigger((defaultContext as unknown) as Context, request);
    expect(((defaultContext as unknown) as Context).res.status).toEqual(200);
    expect(((defaultContext as unknown) as Context).res.body[0].content).toBe(
      stubJournalEntry.content
    );
    expect(((defaultContext as unknown) as Context).res.body[0].title).toBe(
      stubJournalEntry.title
    );
    expect(((defaultContext as unknown) as Context).res.body[0].userId).toBe(
      stubJournalEntry.userId
    );

    await db.close();
  });
});
