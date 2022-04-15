import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { LOGOUT } from '../components/context/constants'
import { userState } from '../components/context/context'

import Logo from './puc.jpg'

const Election = () => {
  const router = useRouter()
  const { user, dispatchAction } = userState()
  const [president, setPresident] = useState([])
  const [candidate, setCandidate] = useState({
    candidate_name: '',
    candidate_position: '',
  })
  const [secretary, setSecretary] = useState([])
  const [wocom, setWocom] = useState([])

  const [trasurer, setTrasurer] = useState([])
  const handleChange = (e) => {
    setCandidate({
      ...candidate,
      [e.target.name]: e.target.value,
    })
  }
  //protected router
  useEffect(() => {
    if (user.isAuthenticated === false) {
      router.push('/')
    }
  }, [])
  // president
  useEffect(() => {
    const body = {
      positions: 'President',
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    axios
      .post(
        'https://comculthero.pythonanywhere.com/api/category/',
        body,
        config
      )
      .then((res) => {
        setPresident(res.data)
      })
      .catch((err) => {
        formData
        console.log(err)
      })
  }, [])
  // wocom
  useEffect(() => {
    const body = {
      positions: 'Wocom',
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    axios
      .post(
        'https://comculthero.pythonanywhere.com/api/category/',
        body,
        config
      )
      .then((res) => {
        setWocom(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        formData
        console.log(err)
      })
  }, [])

  // secretary
  useEffect(() => {
    const body = {
      positions: 'Secretary',
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    axios
      .post(
        'https://comculthero.pythonanywhere.com/api/category/',
        body,
        config
      )
      .then((res) => {
        setSecretary(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        formData
        console.log(err)
      })
  }, [])

  // trasurer
  useEffect(() => {
    const body = {
      positions: 'Trasurer',
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    axios
      .post(
        'https://comculthero.pythonanywhere.com/api/category/',
        body,
        config
      )
      .then((res) => {
        setTrasurer(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  //   const { user, dispatchAction } = userState()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (candidate.candidate_name === '') {
      alert('please select a candidate')
    }
    candidate.candidate_position = 'President'
    console.log(candidate)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${user.token}`,
      },
    }
    axios
      .post(
        'https://comculthero.pythonanywhere.com/api/vote/',
        candidate,
        config
      )
      .then((res) => {
        // console.log(res.data)
        toast.success(res.data.message)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }
  //secretary
  const handleSecretary = (e) => {
    e.preventDefault()
    if (candidate.candidate_name === '') {
      alert('please select a candidate')
    }
    candidate.candidate_position = 'Secretary'
    console.log(candidate)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${user.token}`,
      },
    }
    axios
      .post(
        'https://comculthero.pythonanywhere.com/api/vote/',
        candidate,
        config
      )
      .then((res) => {
        toast.success(res.data.message)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }
  //Wocom
  const handleWocom = (e) => {
    e.preventDefault()
    if (candidate.candidate_name === '') {
      alert('please select a candidate')
    }
    candidate.candidate_position = 'Wocom'
    console.log(candidate)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${user.token}`,
      },
    }
    axios
      .post(
        'https://comculthero.pythonanywhere.com/api/vote/',
        candidate,
        config
      )
      .then((res) => {
        toast.success(res.data.message)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }
  //Trasurer
  const handleTrasurer = (e) => {
    e.preventDefault()
    if (candidate.candidate_name === '') {
      alert('please select a candidate')
    }
    candidate.candidate_position = 'Trasurer'
    console.log(candidate)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${user.token}`,
      },
    }
    axios
      .post(
        'https://comculthero.pythonanywhere.com/api/vote/',
        candidate,
        config
      )
      .then((res) => {
        toast.success(res.data.message)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
  }
  const Logout = (e) => {
    e.preventDefault()
    window.location.reload()
    // router.push('/')
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Election</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=" sticky top-0 z-50 mb-8 w-full bg-slate-700 py-7 text-lg font-bold uppercase text-gray-100 md:text-xl">
        <ul className="flex flex-row justify-between md:px-56">
          <li>Your Vote is Your Power</li>
          <li>PUC E-VOTING</li>
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

          <li>Student ID: {user.username}</li>
        </ul>
      </div>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <span className="text-3xl font-bold uppercase text-green-700">
          SRC Presidential Aspirant
        </span>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around rounded bg-gray-200 p-10 shadow-lg sm:w-full">
          {president.map((data) => (
            <div
              key={data.name}
              className="mt-6 flex w-72 flex-col flex-wrap items-center justify-center rounded-xl border bg-gray-50 p-2 text-left shadow-xl "
            >
              <div className="relative h-64 w-full">
                <Image
                  src={`https://comculthero.pythonanywhere.com${data.picture}`}
                  alt="PUC Logo"
                  layout="fill"
                  objectFit="contain"
                  className="absolute z-10 h-full w-full"
                />
              </div>
              <h3 className="text-2xl font-bold uppercase text-green-700">
                {data.name}
              </h3>
              <p className=" mt-4 text-justify text-xl uppercase">
                {data.slogan}
              </p>
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className=" flex flex-row space-x-4">
                  <label className="text-xl font-semibold capitalize">
                    {' '}
                    Select to vote:
                  </label>
                  <input
                    type="radio"
                    className=" mt-1 h-6 w-6 outline-none"
                    name="candidate_name"
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className=" mt-6 rounded bg-green-700 text-white ring ring-green-600"
                >
                  Cast Vote{' '}
                </button>
              </form>
            </div>
          ))}
        </div>
        {/* wocom selections  */}
        <span className="mt-8 text-3xl font-bold uppercase text-green-700">
          SRC Women's Commision Aspirant
        </span>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around rounded bg-gray-200 p-10 shadow-lg sm:w-full">
          {wocom.map((data) => (
            <div
              key={data.name}
              className="mt-6 flex w-72 flex-col flex-wrap items-center justify-center rounded-xl border bg-gray-50 p-3 shadow-xl "
            >
              <div className="relative h-64 w-64">
                <Image
                  src={`https://comculthero.pythonanywhere.com${data.picture}`}
                  alt="PUC Logo"
                  layout="fill"
                  objectFit="contain"
                  className="absolute h-full w-full"
                />
              </div>
              <h3 className="text-2xl font-bold uppercase text-green-700">
                {data.name}
              </h3>
              <p className=" mt-4 text-justify text-xl uppercase">
                {data.slogan}
              </p>
              <form className="flex flex-col" onSubmit={handleWocom}>
                <div className=" flex flex-row space-x-4">
                  <label className="text-xl font-semibold capitalize">
                    {' '}
                    Select to vote:
                  </label>
                  <input
                    type="radio"
                    className=" mt-1 h-6 w-6 outline-none"
                    name="candidate_name"
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className=" mt-6 rounded bg-green-700 text-white ring ring-green-600"
                >
                  Cast Vote{' '}
                </button>
              </form>
            </div>
          ))}
        </div>
        {/* secretary */}
        <span className="mt-8 text-3xl font-bold uppercase text-green-700">
          SRC Secretary Election Aspirant
        </span>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around rounded bg-gray-200 p-10 shadow-lg sm:w-full">
          {secretary.map((data) => (
            <div
              key={data.name}
              className="mt-6 flex w-72 flex-wrap items-center justify-center rounded-xl border bg-gray-50 p-3 text-left shadow-xl "
            >
              <div className="relative h-64 w-64">
                <Image
                  src={`https://comculthero.pythonanywhere.com${data.picture}`}
                  alt="PUC Logo"
                  layout="fill"
                  objectFit="contain"
                  className="absolute h-full w-full"
                />
              </div>
              <h3 className="text-2xl font-bold uppercase text-green-700">
                {data.name}
              </h3>
              <p className=" mt-4 text-justify text-xl uppercase">
                {data.slogan}
              </p>
              <form className="flex flex-col" onSubmit={handleSecretary}>
                <div className=" flex flex-row space-x-4">
                  <label className="text-xl font-semibold capitalize">
                    {' '}
                    Select to vote:
                  </label>
                  <input
                    type="radio"
                    className=" mt-1 h-6 w-6 outline-none"
                    name="candidate_name"
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className=" mt-6 rounded bg-green-700 text-white ring ring-green-600"
                >
                  Cast Vote{' '}
                </button>
              </form>
            </div>
          ))}
        </div>
        {/* Trasure / */}
        <span className="mt-8 text-3xl font-bold uppercase text-green-700">
          SRC Trasurer Election Aspirant
        </span>
        <div className="mt-6 flex max-w-4xl   flex-wrap items-center justify-around rounded bg-gray-200 p-10 shadow-lg sm:w-full">
          {trasurer.map((data) => (
            <div
              key={data.name}
              className="mt-6 flex w-72 flex-col flex-wrap items-center justify-center rounded-xl border bg-gray-50 p-3 text-left shadow-xl "
            >
              <div className="relative h-64 w-64">
                <Image
                  src={`https://comculthero.pythonanywhere.com${data.picture}`}
                  alt="PUC Logo"
                  layout="fill"
                  objectFit="contain"
                  className="absolute h-full w-full"
                />
              </div>
              <h3 className="text-2xl font-bold uppercase text-green-700">
                {data.name}
              </h3>
              <p className=" mt-4 text-justify text-xl uppercase">
                {data.slogan}
              </p>
              <form className="flex flex-col" onSubmit={handleTrasurer}>
                <div className=" flex flex-row space-x-4">
                  <label className="text-xl font-semibold capitalize">
                    {' '}
                    Select to vote:
                  </label>
                  <input
                    type="radio"
                    className=" mt-1 h-6 w-6 outline-none"
                    name="candidate_name"
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className=" mt-6 rounded bg-green-700 text-white ring ring-green-600"
                >
                  Cast Vote{' '}
                </button>
              </form>
            </div>
          ))}
        </div>
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
