import httpTrigger from "./index";
import { Context } from "@azure/functions";

// Mocks
jest.mock("../shared/createConnection");

const defaultContext = {
  log: jest.fn(),
};

describe("Tests for CreateJournalEntry Endpoint", () => {
  // Stub Data

  const stubJournalEntry = {
    title: "Again Entry",
    content: "Try This",
    date: new Date(),
    entryDayTime: "Morning",
    userId: "3az0Cc3FAheYUJq5nOJ8GrAPbuE3",
  };

  const stubWrongJournalEntry = {
    content: "Try This",
    entryDayTime: "Morning",
    userId: "3az0Cc3FAheYUJq5nOJ8GrAPbuE3",
  };

  const emptyJournalEntry = {};

  it("should return a 201 with a correct journalEntry inside the body", async () => {
    const request = {
      body: { ...stubJournalEntry },
    };

    await httpTrigger((defaultContext as unknown) as Context, request);
    expect(((defaultContext as unknown) as Context).res.status).toEqual(201);
  });

  it("should return a 400 with an empty body in the request", async () => {
    const request = {
      body: { ...emptyJournalEntry },
    };
    await httpTrigger((defaultContext as unknown) as Context, request);
    expect(((defaultContext as unknown) as Context).res.status).toEqual(400);
  });

  it("should return a 500 with a false database connection", async () => {
    const request = {
      body: { ...stubWrongJournalEntry },
    };
    await httpTrigger((defaultContext as unknown) as Context, request);
    expect(((defaultContext as unknown) as Context).res.status).toEqual(500);
    expect(defaultContext.log.mock.calls.length).toBe(1);
  });
});
