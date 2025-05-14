import { tool } from "ai";
import { z } from "zod";

export const electricityState = tool({
  description: "Electricity account state finder tool",
  parameters: z.object({
    firstName: z.string().describe("User's first name"),
    lastName: z.string().describe("User's last name"),
    address: z.string().describe("User's address"),
  }),
  execute: async ({ address, firstName, lastName }) => {
    return `${firstName} ${lastName} your current state for ${address} is 375,000 UZS in advance payment`;
  },
});
