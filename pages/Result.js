import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Result = () => {
  const [result, setResult] = useState([])
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
      <div className="flex h-screen w-full flex-wrap items-center justify-around rounded bg-gray-200 p-10 pt-6 shadow-lg sm:w-full">
        <h1 className="text-center text-4xl font-bold uppercase text-gray-600">
          Final Results
        </h1>
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
            <form className="flex flex-col">
              <div className=" flex flex-row space-x-4">
                <label className="text-xl font-semibold capitalize">
                  {' '}
                  Total votes for NO : {64 - data.votes}
                </label>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Result
