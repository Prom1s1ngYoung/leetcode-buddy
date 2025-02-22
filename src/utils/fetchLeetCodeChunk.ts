export async function fetchLeetCodeChunk(
  token: string,
  skip: number,
  limit: number
) {
  const response = await fetch('/api/leetcode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operationName: 'problemsetQuestionList',
      query: `
        query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
          problemsetQuestionList: questionList(
            categorySlug: $categorySlug
            limit: $limit
            skip: $skip
            filters: $filters
          ) {
            total: totalNum
            questions: data {
              acRate
              difficulty
              freqBar
              frontendQuestionId: questionFrontendId
              isFavor
              paidOnly: isPaidOnly
              status
              title
              titleSlug
              topicTags {
                name
                id
                slug
              }
              hasSolution
              hasVideoSolution
            }
          }
        }
      `,
      variables: {
        categorySlug: 'all-code-essentials',
        skip,
        limit,
        filters: {},
      },
      token,
    }),
  })

  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}`)
  }

  const result = await response.json()

  // 这里的结构会是:
  // result.data.problemsetQuestionList.total
  // result.data.problemsetQuestionList.questions (数组)
  const total = result.data.problemsetQuestionList.total
  const questions = result.data.problemsetQuestionList.questions

  return { total, questions }
}
