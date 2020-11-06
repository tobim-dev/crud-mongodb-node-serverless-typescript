import httpTrigger from "./index";
import { Context } from "@azure/functions";

const defaultContext = {
  log: jest.fn(),
};

// TODO Create a real unit test
it("should be called once", async function () {
  const request = {
    query: { name: "Bill" },
  };

  await httpTrigger((defaultContext as unknown) as Context, request);
  expect(defaultContext.log.mock.calls.length).toBe(1);
});
