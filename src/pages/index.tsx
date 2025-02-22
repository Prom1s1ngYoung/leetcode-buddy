import HomePage from '@/components/home/HomePage'

type ProblemData = {
  rating: number
  id: number
  title: string
  titleZh: string
  titleSlug: string
  contestSlug: string
  problemIndex: string
  status: string
}

type IndexPageProps = {
  initialProblems: ProblemData[]
}

export default function IndexPage({ initialProblems }: IndexPageProps) {
  return <HomePage initialProblems={initialProblems} />
}

export async function getServerSideProps() {
  const res = await fetch(
    'https://raw.githubusercontent.com/zerotrac/leetcode_problem_rating/main/ratings.txt'
  )
  const textData = await res.text()

  // 解析ratings.txt，每行示例格式：
  // "1       Two Sum                        219  "
  // 也可能含Contest信息等，你可以根据实际字段做更详细的处理
  const lines = textData
    .split('\n')
    .map((line) => line.trim()) //
    .filter(Boolean)
  const header = lines[0]
  if (header.includes('Rating') && header.includes('Title')) {
    lines.shift() // 去掉标题行
  }
  const initialProblems: ProblemData[] = lines
    .map((line) => {
      // 这里用tab(\t)来split，如果源文件的确是tab分隔
      // 若是纯空格分隔，可以考虑 line.split(/\s+/)
      const parts = line.split('\t')
      // parts应该有7项，不够就视为异常行
      if (parts.length < 7) {
        return null
      }

      const rating = Math.round(parseFloat(parts[0])) || 0
      const id = parseInt(parts[1]) || -1
      const title = parts[2] || ''
      const titleZh = parts[3] || ''
      const titleSlug = parts[4] || ''
      const contestSlug = parts[5] || ''
      const problemIndex = parts[6] || ''
      const status = ''

      // 如果id出现-1，说明解析失败，也可以return null
      if (id === -1) {
        return null
      }

      return {
        rating,
        id,
        title,
        titleZh,
        titleSlug,
        contestSlug,
        problemIndex,
        status,
      }
    })
    .filter(Boolean) as ProblemData[]

  return {
    props: {
      initialProblems,
    },
  }
}
