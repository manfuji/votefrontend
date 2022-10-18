import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { LOGOUT } from '../components/context/constants'
import { userState } from '../components/context/context'
import { DoubleBounce } from 'better-react-spinkit'

import Logo from './puc.jpg'

const Election = () => {
  const router = useRouter()
  const { user, dispatchAction } = userState()
  const [candidatePosition, setCandidatePosition] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [positions, setPositions] = useState([])
  const [selected, setSelected] = useState(false)
  const positionRef = useRef(null)
  const [candidate, setCandidate] = useState()
  const [allCandidates, setAllCandidates] = useState([])
  const [secretary, setSecretary] = useState([])
  const [wocom, setWocom] = useState([])

  const [trasurer, setTrasurer] = useState([])
  // casting a vote chnages
  const handleChange = (e) => {
    setCandidate(e.target.value)
    console.log(e.target.value)
    setSelected(true)
  }
  // end

  //protected router
  useEffect(() => {
    if (user.isAuthenticated === false) {
      router.push('/')
    }
  }, [])
  // handle submit vote
  //   const { user, dispatchAction } = userState()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (candidate === '') {
      toast.info('please select a candidate')
    }

    // candidate.candidate_position = 'President'
    console.log(candidate)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${user.token}`,
      },
    }
    const body = {
      option: parseInt(candidate),
    }
    console.log(body)
    axios
      .post('https://polls.pythonanywhere.com/api/votes/', body, config)
      .then((res) => {
        setSelected(false)
        console.log(res.data.option)
        toast.info(res.data.message)
      })
      .catch((err) => {
        setSelected(false)
        console.log(err)

        toast.error('You already voted for this position')
      })
  }
  // end
  // president
  useEffect(() => {
    // fetching all positions available
    axios
      .get('https://polls.pythonanywhere.com/api/polls/')
      .then((res) => {
        setPositions(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })

    // fetching all the candidates https://polls.pythonanywhere.com/api/candidates/
    const CandidateConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${user.token}`,
      },
    }
    axios
      .get('https://polls.pythonanywhere.com/api/candidates/', CandidateConfig)
      .then((res) => {
        // console.log(res.data)
        console.log(res.data)
        setAllCandidates(res.data)
        toast.success(res.data.message)
        setIsLoading(false)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })

    // end
  }, [])

  const Logout = (e) => {
    e.preventDefault()
    localStorage.clear()
    window.location.reload()
    router.push('/')
  }
  console.log(positions)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Election</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <div className=" sticky top-0 z-50 mb-8 w-full bg-slate-700 py-7  font-bold uppercase text-gray-100 md:text-xl">
        <ul className="flex flex-row justify-between px-12 text-sm md:text-lg">
          <li className="text-sm md:text-lg">
            {/* <Link href="/" > */}
            <a
              className="mr-4 cursor-pointer font-bold tracking-wider text-green-600"
              onClick={(e) => {
                e.preventDefault()
                router.push('Home')
              }}
            >
              Go Back
            </a>
            {/* </Link> */}
          </li>

          <li>Student ID: {user.username}</li>
          <li>
            {/* <Link href="/" > */}
            <a
              className="mr-4 cursor-pointer font-bold tracking-wider text-red-600"
              onClick={Logout}
            >
              Logout
            </a>
            {/* </Link> */}
          </li>
        </ul>
      </div>
      <main className="flex w-full flex-1 flex-col items-center justify-center space-y-6 text-center md:px-20">
        {!isLoading ? (
          <>
            <h1 className=" mb-6 mt-3 text-center text-3xl font-bold uppercase">
              Candidates
            </h1>
            {positions.map((position, index) => (
              <form key={index} onSubmit={handleSubmit}>
                <span className="mt-6 text-3xl font-bold uppercase text-blue-700">
                  {position.title}
                </span>

                <div className="mt-6 flex w-full flex-wrap items-center justify-around rounded bg-gray-200 p-10 shadow-lg sm:w-full md:max-w-4xl">
                  {allCandidates
                    .filter((candidate) => candidate.position === position.id)
                    .map((data) => (
                      // {position?.candidates?.map((data) => (
                      <div
                        key={data.name}
                        className="mx-4 mt-6 flex h-96 w-72 flex-col flex-wrap items-center justify-between rounded-xl border bg-gray-50 p-2 text-left shadow-xl "
                      >
                        <div className="relative h-44 w-full">
                          <Image
                            src={data.image}
                            alt="Compsa Logo"
                            layout="fill"
                            objectFit="contain"
                            className="absolute z-10 h-full w-full"
                          />
                        </div>
                        <h3 className="text-center font-semibold uppercase text-blue-700">
                          {data.name}
                        </h3>
                        {/* <p className=" mt-4 text-justify text-xl uppercase">
                          {data.description}
                        </p> */}
                        <div className="flex flex-col">
                          <div className=" flex flex-row space-x-4">
                            <label className="font-semibold capitalize md:text-xl">
                              {' '}
                              Select to vote:
                            </label>
                            <input
                              type="radio"
                              className=" mt-1 h-6 w-6 outline-none"
                              name={position.title}
                              value={data.id}
                              disabled={selected}
                              onChange={handleChange}
                            />
                          </div>
                          <button
                            type="submit"
                            className=" mt-4 rounded bg-blue-700 text-white ring ring-blue-600"
                          >
                            Cast Vote{' '}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </form>
            ))}
          </>
        ) : (
          <DoubleBounce size={30} color={'green'} />
        )}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src={Logo} alt="Vercel Logo" width={50} height={50} />
        </a>
      </footer>
    </div>
  )
}

export default Election
