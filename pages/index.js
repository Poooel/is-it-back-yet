import { useEffect, useState } from "react"
import { useQuery } from "react-query"

export default function Home() {
  const { isLoading, error, data, refetch, isRefetching } = useQuery(
    'check-website', 
    () => fetch('/api/check').then(res => res.json())
  )

  if (isLoading) {
    return (
      <div className="text-xl flex h-screen">
        <div className="m-auto text-center">
          <div>Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-xl flex h-screen">
      <div className="m-auto text-center">
        <p>
          The last status is {' '} <span className="font-bold">{data.status || 'UNKNWON'}.</span> 
        </p>
        <p>
          It was last checked on{' '}<span className="font-bold">{new Date(data.lastTimeChecked).toLocaleString('en-US')}</span>
        </p>
        <button className="mt-4 px-4 py-2" type="button" onClick={refetch}>
          <div className={ isRefetching ? "animate-spin" : "" }>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 -scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}
