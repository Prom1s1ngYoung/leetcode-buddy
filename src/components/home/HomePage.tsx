import { useEffect, useMemo, useState } from 'react'
import FilterBar from '../FilterBar'
import Pagination from '../Pagination'
import ProblemTable from '../ProblemTable'
import { OriginalQuestion } from '../../../types/leetcodeChunk'
import Policy from './Policy'

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

type HomeProps = {
  initialProblems: ProblemData[]
}

const HomePage: React.FC<HomeProps> = ({ initialProblems }) => {
  const [problems, setProblems] = useState<ProblemData[]>(initialProblems)
  const [keyword, setKeyword] = useState('')
  const [ratingRange, setRatingRange] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [showSyncDialog, setShowSyncDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const pageSize = 15

  const handleSyncStatus = () => {
    setShowSyncDialog(true)
  }

  const handleCancelSync = () => {
    setShowSyncDialog(false)
  }

  /* const handleConfirmSync = async () => {
    setIsLoading(true)
    if (
      typeof window === 'undefined' ||
      typeof window.chrome === 'undefined' ||
      typeof window.chrome.runtime === 'undefined'
    ) {
      alert('Chrome Extension is needed!!!')
      setShowSyncDialog(false)
      setIsLoading(false)
      return
    }
    const extensionId = process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID
    window.chrome.runtime.sendMessage(
      extensionId,
      { action: 'getLeetCodeSession' },
      async (response) => {
        if (response && response.success) {
          const token = response.token
          if (token === null) {
            alert(
              'Cannot find token from leetcode, please login to leetcode and install the Chrome Extension!'
            )
            setShowSyncDialog(false)
            setIsLoading(false)
            return
          }
          try {
            const problemMap = await fetchAllLeetCodeProblems(token)
            setProblems((prevProblems) =>
              prevProblems.map((p) =>
                problemMap.has(p.id)
                  ? { ...p, status: problemMap.get(p.id)?.status ?? p.status }
                  : p
              )
            )
            setShowSyncDialog(false)
            setIsLoading(false)
          } catch (error) {
            alert('Fetch failed: ' + error)
            setShowSyncDialog(false)
            setIsLoading(false)
          }
        } else {
          alert(
            'Cannot find token from leetcode, please login to leetcode and install the Chrome Extension!'
          )
          setShowSyncDialog(false)
          setIsLoading(false)
        }
      }
    )
  } */

  const handleConfirmSync = async () => {
    setIsLoading(true)
    console.log(window.location.origin)
    if (
      typeof window === 'undefined' ||
      typeof window.chrome === 'undefined' ||
      typeof window.chrome.runtime === 'undefined'
    ) {
      alert('Chrome Extension is needed!!!')
      setShowSyncDialog(false)
      setIsLoading(false)
      return
    }
    const extensionId = process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID

    // 发送消息给扩展，action: 'fetchAllLeetCodeProblems'
    window.chrome.runtime.sendMessage(
      extensionId,
      { action: 'fetchAllLeetCodeProblems' },
      (response) => {
        if (!response) {
          alert('No response from extension. Check extensionId or permission.')
          setShowSyncDialog(false)
          setIsLoading(false)
          return
        }
        if (!response.success) {
          alert('Failed to fetch data: ' + response.error)
          setShowSyncDialog(false)
          setIsLoading(false)
          return
        }
        const problemArray = response.data
        const arrayForMap = problemArray.map((q: OriginalQuestion) => [
          q.frontendQuestionId,
          q,
        ])
        const problemMap: Map<number, OriginalQuestion> = new Map(arrayForMap)
        // response.data 即扩展返回的题目信息数组
        console.log('Got data from extension:', response.data)
        setProblems((prevProblems) =>
          prevProblems.map((p) =>
            problemMap.has(p.id)
              ? { ...p, status: problemMap.get(p.id)?.status ?? p.status }
              : p
          )
        )
        setShowSyncDialog(false)
        setIsLoading(false)
      }
    )
  }

  const handleStatusChange = (id: number, newStatus: string) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    )
  }

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const matchKeyword =
        p.id.toString().includes(keyword) ||
        p.title.toLowerCase().includes(keyword.toLowerCase())
      let matchRating = true
      switch (ratingRange) {
        case 'le1200':
          matchRating = p.rating <= 1200
          break
        case '1201-1400':
          matchRating = p.rating >= 1201 && p.rating <= 1400
          break
        case '1401-1600':
          matchRating = p.rating >= 1401 && p.rating <= 1600
          break
        case '1601-1900':
          matchRating = p.rating >= 1601 && p.rating <= 1900
          break
        case '1901-2100':
          matchRating = p.rating >= 1901 && p.rating <= 2100
          break
        case '2101-2400':
          matchRating = p.rating >= 2101 && p.rating <= 2400
          break
        case 'ge2400':
          matchRating = p.rating >= 2400
          break
        case 'all':
        default:
          matchRating = true
      }

      return matchKeyword && matchRating
    })
  }, [problems, keyword, ratingRange])

  const total = filteredProblems.length
  const totalPages = Math.ceil(total / pageSize)
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return filteredProblems.slice(start, end)
  }, [filteredProblems, currentPage, pageSize])

  useEffect(() => {
    setCurrentPage(1)
  }, [keyword, ratingRange])
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Problem List</h1>

      {/* Filter Bar */}
      <FilterBar
        keyword={keyword}
        setKeyword={setKeyword}
        ratingRange={ratingRange}
        setRatingRange={setRatingRange}
        onSyncStatus={handleSyncStatus}
      />

      {/* Table */}
      <ProblemTable
        problems={currentData}
        onStatusChange={handleStatusChange}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={setCurrentPage}
      />
      {showSyncDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Dialog Container */}
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto transition-all transform scale-100">
            <Policy />

            {/* Buttons */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCancelSync}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                disabled={isLoading}>
                Cancel
              </button>
              <button
                onClick={handleConfirmSync}
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={isLoading}>
                Sync
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
