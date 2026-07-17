import { openai } from "../lib/openai"
import { getRecordsByUser } from "../repositories/record.repository"

export const askDashboardQuestion = async (userId: string, message: string) => {
  const records = await getRecordsByUser(userId)

  const summary = records
    .map((r) => `${r.date.toISOString().slice(0, 10)} | ${r.category} | ${r.amount} | ${r.description ?? ""}`)
    .join("\n")

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant inside a personal finance ledger app. " +
          "Answer only questions about the user's own income, expenses, and investments, using the records provided below. " +
          "Keep answers short and concrete. If the question isn't about their finances, say you can only help with their dashboard data.\n\n" +
          `Records (date | category | amount | description):\n${summary || "No records yet."}`,
      },
      { role: "user", content: message },
    ],
  })

  return completion.choices[0]?.message?.content ?? "I couldn't come up with an answer."
}
