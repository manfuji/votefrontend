import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Result = () => {
  const [result, setResult] = useState([])
  const navigator = useRouter()
  useEffect(() => {
    axios
      .get('https://comculthero.pythonanywhere.com/api/candidate')
      .then((res) => {
        setResult(res.data)
      })
      .catch((err) => alert('something went wrong'))
  })
  return (
    <div>
      <div className="flex h-full w-full flex-wrap items-center justify-around rounded bg-gray-200 p-10 pt-6 shadow-lg sm:w-full">
        <a onClick={(e)=>{
e.preventDefault()
          navigator.push('Home')}} className='bg-blue-600 rounded-full px-3 py-2 text-slate-100 cursor-pointer'>go Back</a>
        <h1 className="text-center text-4xl font-bold uppercase text-gray-600">
          Final Results
        </h1>
        <div className="flex flex-col sm:flex-row space-x-3 justify-center items-center flex-wrap space-y-3">

        {result.map((data) => (
          <div
            key={data.name}
            className="mt-6 flex w-72 flex-col flex-wrap items-center justify-center rounded-xl border bg-gray-50 p-2 text-left shadow-xl "
          >
            <div className="relative h-64 w-full">
              <Image
                src={data.picture}
                alt="PUC Logo"
                layout="fill"
                objectFit="contain"
                className="absolute z-10 h-full w-full"
              />
            </div>
            <h3 className="text-2xl font-bold uppercase text-green-700">
              {data.name}
            </h3>
            <p className=" mt-4 text-justify text-xl font-bold uppercase">
              Total Votes For Yes :{data.votes}
            </p>
            <div className="flex flex-col">
              <div className=" flex flex-row space-x-4">
                <label className="text-xl font-semibold capitalize">
                  {' '}
                  Total votes for NO : {64 - data.votes}
                </label>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Result
