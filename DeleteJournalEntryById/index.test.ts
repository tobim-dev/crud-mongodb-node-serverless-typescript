import httpTrigger from "./index";
import { Context } from "@azure/functions";
import createConnection from "../shared/createConnection";
import { JournalEntry, JournalEntrySchema } from "../models/journalEntry.model";

// Mocks
jest.mock("../shared/createConnection");

const defaultContext = {
  log: jest.fn(),
};

describe("Test DeleteJournalEntry", () => {
  const stubUserId = "123131414";
  const stubJournalEntryId = "123123144";
  const stubJournalEntry = {
    title: "Again Entry",
    content: "Try This",
    date: new Date(),
    entryDayTime: "Morning",
    userId: "3az0Cc3FAheYUJq5nOJ8GrAPbuE3",
  };

  it("should return a 400 with missing params", async () => {
    const request = {
      params: {},
    };

    await httpTrigger((defaultContext as unknown) as Context, request);
    expect(((defaultContext as unknown) as Context).res.status).toEqual(400);
  });

  it("should return a 500 with wrong params", async () => {
    const { db } = await createConnection();

    const request = {
      params: {
        id: stubJournalEntryId,
        userId: stubUserId,
      },
    };

    await httpTrigger((defaultContext as unknown) as Context, request);
    expect(((defaultContext as unknown) as Context).res.status).toEqual(500);
    await db.close();
  });

  it("should return a 204 if an entry is sucessfully deleted", async () => {
    const { db } = await createConnection();

    const journalEntryModel = db.model<JournalEntry>(
      "JournalEntry",
      JournalEntrySchema
    );
    const result = await journalEntryModel.create(
      stubJournalEntry as JournalEntry
    );
    const request = {
      params: {
        id: result._id,
        userId: result.userId,
      },
    };

    await httpTrigger((defaultContext as unknown) as Context, request);
    expect(((defaultContext as unknown) as Context).res.status).toEqual(204);
    await db.close();
  });
});
