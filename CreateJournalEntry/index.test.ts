import httpTrigger from "./index";
import {Context} from "@azure/functions";
import createConnection from "../shared/createConnection";
import {connect} from "mongoose";

// Mocks
jest.mock("../shared/createConnection");

const mockCreateConnection = <jest.Mock<typeof createConnection>><unknown>createConnection;

// @ts-ignore
mockCreateConnection.mockImplementation(async () => {
    const mongooseConnection = await connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongooseConnection.connection;
    return {
        db,
    };
})

const context = {
    log: jest.fn(),
};

describe("Tests for CreateJournalEntry Endpoint", () => {

    const stubJournalEntry = {
        title: "Again Entry",
        content: "Try This",
        date: new Date(),
        entryDayTime: "Morning",
        userId: "3az0Cc3FAheYUJq5nOJ8GrAPbuE3"
    }

    it("should return a 201 with a correct journalEntry inside the body", async () => {
        const request = {
            body: {...stubJournalEntry},
        };

        await httpTrigger((context as unknown) as Context, request);
        expect((context as unknown as Context).res.status).toEqual(201)
    });

    it('should return a 400 with an empty body in the request', async () => {
        const request = {
            body: {},
        };
        await httpTrigger((context as unknown) as Context, request);
        expect((context as unknown as Context).res.status).toEqual(400)
    });
})


