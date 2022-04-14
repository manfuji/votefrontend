import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AUTH } from './context/constants'
import { userState } from './context/context'
import Logo from './puc.jpg'

const Home = () => {
  const { user, dispatchAction } = userState()
  const router = useRouter()
  useEffect(() => {
    if (user.isAuthenticated === true) {
      router.push('/Home')
    }
  }, [])
  const initialState = {
    username: '',
    password: '',
  }
  const [formData, setFormData] = useState(initialState)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    axios
      .post(
        'https://comculthero.pythonanywhere.com/api/login',
        formData,
        config
      )
      .then((res) => {
        dispatchAction({
          type: AUTH,
          payload: {
            token: res.data.token,
            username: res.data.user.username,
          },
        })
        console.log(res.data)
        router.push('/Home')
      })
      .catch((err) => {
        console.log(err.response.data)
      })
    // console.log(user)
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center bg-slate-50 px-20 pb-20 text-center shadow-lg">
        <span className="mt-8 text-3xl font-bold">
          Welcome to <h1 className="text-green-700">EP University E-Voting</h1>
        </span>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex max-w-4xl flex-col flex-wrap items-center justify-around space-y-6    rounded-md bg-gray-200 px-24 py-10 shadow-xl   sm:w-full"
        >
          <span className="mt-4 text-5xl font-bold">
            <h1 className="text-green-700">Login Form</h1>
          </span>
          <div className="relative h-40 w-40 rounded">
            <Image
              src={Logo}
              alt="PUC Logo"
              objectFit="contain"
              className="absolute h-40 w-40 rounded-xl"
            />
          </div>
          <div>
            <label className="mr-7 mb-3 text-xl font-bold uppercase tracking-widest text-gray-700 md:mb-0">
              Student ID :
            </label>
            <input
              className="my-2 rounded-xl py-2 px-10 placeholder-slate-700 outline-none ring-1 ring-blue-500"
              type="text"
              name="username"
              placeholder="0322022"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mr-7 mb-3 text-xl font-bold uppercase tracking-widest text-gray-700 md:mb-0">
              Password :
            </label>
            <input
              className="my-2 rounded-xl py-2 px-10 placeholder-slate-700 outline-none ring-1 ring-blue-500"
              type="password"
              name="password"
              placeholder="***********"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className="w-1/2 rounded bg-green-600 px-16 py-2 text-xl font-bold text-white outline-none  hover:bg-green-500 hover:shadow-lg ">
            Login
          </button>
        </form>
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

export default Home
