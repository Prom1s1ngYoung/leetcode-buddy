import React from 'react'

type Problem = {
  rating: number
  id: number
  title: string
  titleZh: string
  titleSlug: string
  contestSlug: string
  problemIndex: string
  status: string
}

type ProblemTableProps = {
  problems: Problem[]
  onStatusChange: (id: number, newStatus: string) => void
}

const ProblemTable: React.FC<ProblemTableProps> = ({
  problems,
  onStatusChange,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Rating</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p) => (
            <tr key={p.id} className="hover:bg-gray-100">
              <td className="p-2 border text-center">{p.id}</td>
              <td className="p-2 border">{p.title}</td>
              <td className="p-2 border text-center">{p.rating}</td>
              <td className="p-2 border text-center">
                <select
                  className="border p-1 rounded"
                  value={p.status}
                  onChange={(e) => onStatusChange(p.id, e.target.value)}>
                  {/* 三个选项：null、attempted、ac */}
                  <option value="null">null</option>
                  <option value="attempted">attempted</option>
                  <option value="ac">ac</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProblemTable
