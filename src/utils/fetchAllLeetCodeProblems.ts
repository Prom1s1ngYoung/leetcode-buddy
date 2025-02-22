import { OriginalQuestion } from '../../types/leetcodeChunk'
import { fetchLeetCodeChunk } from './fetchLeetCodeChunk'

export async function fetchAllLeetCodeProblems(
  token: string
): Promise<Map<number, OriginalQuestion>> {
  const results = new Map<number, OriginalQuestion>()
  let skip = 0
  const limit = 50
  let total = Infinity

  while (true) {
    const { total: currentTotal, questions } = await fetchLeetCodeChunk(
      token,
      skip,
      limit
    )
    if (total === Infinity) {
      total = currentTotal
    }

    for (const q of questions) {
      const problem: OriginalQuestion = {
        acRate: parseFloat(q.acRate),
        difficulty: q.difficulty,
        frontendQuestionId: parseInt(q.frontendQuestionId),
        isFavor: q.isFavor,
        paidOnly: q.paidOnly,
        status: q.status ?? 'null',
        title: q.title,
        titleSlug: q.titleSlug,
      }
      results.set(problem.frontendQuestionId, problem)
    }
    skip += limit

    if (skip >= total) {
      break
    }
  }

  return results
}
