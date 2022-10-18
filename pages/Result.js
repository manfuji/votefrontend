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
import { useQuery } from 'react-query'
import Logo from './puc.jpg'

const Results = () => {
  const router = useRouter()
  const { user, dispatchAction } = userState()
  const [candidatePosition, setCandidatePosition] = useState()
  const [selected, setSelected] = useState(true)
  const [positions, setPositions] = useState([])
  const positionRef = useRef(null)
  const [candidate, setCandidate] = useState({
    candidate_name: 0,
  })
  const [allCandidates, setAllCandidates] = useState([])
  const [secretary, setSecretary] = useState([])
  const [wocom, setWocom] = useState([])

  const [trasurer, setTrasurer] = useState([])
  // casting a vote chnages
  const handleChange = (e) => {
    setCandidate({
      ...candidate,
      [e.target.name]: e.target.value,
    })
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
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (candidate.candidate_name === '') {
  //   toast.info('please select a candidate')
  //   }

  //   // candidate.candidate_position = 'President'
  //   console.log(candidate)
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Token ${user.token}`,
  //     },
  //   }
  //   const body = {
  //     option : parseInt(candidate.candidate_name)
  //   }
  //   console.log(body)
  //   axios
  //     .post('https://polls.pythonanywhere.com/api/votes/', body, config)
  //     .then((res) => {
  //       console.log(res.data.option)
  //       setCandidate({candidate_name: 0})
  //       toast.info(res.data.message)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       setCandidate({candidate_name: 0})

  //       toast.error("You already voted for this position")
  //     })
  // }
  // end

  // polling all positions

  // president
  // useEffect(() => {
  //   // fetching all positions available
  //   axios
  //     .get('https://polls.pythonanywhere.com/api/polls/')
  //     .then((res) => {
  //       setPositions(res.data)
  //       console.log('hellooooooo')
  //       // setIsLoading(false)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })

  // fetching all the candidates https://polls.pythonanywhere.com/api/candidates/
  // const CandidateConfig = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Token ${user.token}`,
  //   },
  // }
  // axios
  //   .get('https://polls.pythonanywhere.com/api/candidates/', CandidateConfig)
  //   .then((res) => {
  //     // console.log(res.data)
  //     console.log(res.data)
  //     setAllCandidates(res.data)
  //     toast.success(res.data.message)
  //     // setIsLoading(false)
  //   })
  //   .catch((err) => {
  //     toast.error(err.response.data.message)
  //   })

  // end
  // }, [data?.data])

  // polling the data from the server
  const { isLoading, data: allCandidatesData } = useQuery(
    'candidate',
    () => {
      const CandidateConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
      }
      return axios.get(
        'https://polls.pythonanywhere.com/api/candidates/',
        CandidateConfig
      )
    },
    { refetchInterval: 10000 }
  )
  // positions pollings
  const { data: allPositions } = useQuery(
    'positions',
    () => {
      const CandidateConfig = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${user.token}`,
        },
      }
      return axios.get('https://polls.pythonanywhere.com/api/polls/')
    },
    { refetchInterval: 10000 }
  )

  const Logout = (e) => {
    e.preventDefault()
    localStorage.clear()
    window.location.reload()

    router.push('/')
  }
  console.log('alllllll', allCandidatesData?.data)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Results</title>
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
            <h1 className=" mt-3 text-center text-3xl font-bold uppercase">
              Live results
            </h1>
            {allPositions?.data.map((position, index) => (
              <div key={index}>
                <span className="mt-3 text-lg font-bold uppercase text-blue-700">
                  {position.title}
                </span>

                <div className="mt-3 flex w-full flex-wrap items-center justify-around rounded bg-gray-200 p-5 shadow-lg sm:w-full md:max-w-4xl">
                  {allCandidatesData?.data
                    .filter((candidate) => candidate.position === position.id)
                    .map((data) => (
                      // {position?.candidates?.map((data) => (
                      <div
                        key={data.name}
                        className="mx-4 mt-6 flex h-44 w-64 flex-col flex-wrap items-center justify-evenly rounded-xl border bg-gray-50 p-2 text-left shadow-xl "
                      >
                        <div className="relative h-16 w-14">
                          <Image
                            src={data.image}
                            alt="PUC Logo"
                            layout="fill"
                            objectFit="contain"
                            className="absolute z-10 h-full w-full"
                          />
                        </div>
                        <div>
                          <h3 className="text-center text-xs uppercase text-blue-700">
                            {data.name}
                          </h3>
                          {/* <p className=" mt-4 text-justify text-xl uppercase">
                          {data.description}
                        </p> */}
                          <div className="flex flex-col text-center">
                            <div className=" flex flex-row items-center justify-center space-x-2">
                              <label className="text-center text-base font-bold capitalize">
                                {' '}
                                Total vote: {data.votes} <br />
                              </label>
                              {/* <input
                              type="radio"
                              className=" mt-1 h-6 w-6 outline-none"
                              name="candidate_name"
                              value={data.id}
                              // checked={candidate.candidate_name !==null}
                              disabled={candidate.candidate_name !==0?true:false}
                              onChange={handleChange}
                            /> */}
                            </div>
                            {/* <button
                            type="submit"
                            className=" mt-4 rounded bg-blue-700 text-white ring ring-blue-600"
                          >
                            Toa
                          </button> */}
                          </div>
                        </div>
                        <div className="mb-6 flex h-2 w-[90%] overflow-hidden rounded bg-yellow-100 text-xs  ring-1 ring-blue-600">
                          <div
                            style={{
                              width: `${
                                (data.votes / position.total_votes) * 100
                              }%`,
                            }}
                            className={`flex flex-col justify-center whitespace-nowrap bg-blue-500 text-center text-white shadow-none`}
                          ></div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
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

export default Results
