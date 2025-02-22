import React from 'react'

type FilterBarProps = {
  keyword: string
  setKeyword: (val: string) => void
  ratingRange: string
  setRatingRange: (val: string) => void
  onSyncStatus: () => void
}

const FilterBar: React.FC<FilterBarProps> = ({
  keyword,
  setKeyword,
  ratingRange,
  setRatingRange,
  onSyncStatus,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
      {/* keywords */}
      <input
        className="border p-2 rounded w-full sm:w-1/2"
        type="text"
        placeholder="Type a keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {/* Rating */}
      <select
        className="border p-2 rounded w-full sm:w-1/3"
        value={ratingRange}
        onChange={(e) => setRatingRange(e.target.value)}>
        <option value="all">All Ratings</option>
        <option value="le1200">{'<=1200'}</option>
        <option value="1201-1400">1201-1400</option>
        <option value="1401-1600">1401-1600</option>
        <option value="1601-1900">1601-1900</option>
        <option value="1901-2100">1901-2100</option>
        <option value="2101-2400">2101-2400</option>
        <option value="ge2400">{'>=2400'}</option>
      </select>
      <button
        type="button"
        onClick={onSyncStatus}
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Sync Status
      </button>
    </div>
  )
}

export default FilterBar
