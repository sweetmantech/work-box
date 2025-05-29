import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    body: v.string(),
    user: v.id("users"),
  }),
  investments: defineTable({
    amount: v.number(),
    percentage: v.number(),
    user: v.id("users"),
  }),
  properties: defineTable({
    description: v.string(),
    price: v.number(),
    tokenIdentifier: v.string(),
    user: v.id("users"),
  }).index("by_token", ["tokenIdentifier"]),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});