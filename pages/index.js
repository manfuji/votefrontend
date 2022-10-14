import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { userState } from '../components/context/context'
import { AUTH } from '../components/context/constants'
import Logo from './htu_logo.png'
import { toast } from 'react-toastify'

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
    if (formData.username.trim() === '') {
      toast.error('Student ID field is empty')
    } else if (formData.password.trim() === '') {
      toast.error('password field is empty')
    } else {
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
          toast.success('Login Successfully')
          router.push('/Home')
        })
        .catch((err) => {
          toast.error('Invalid Credentials')
        })
    }
    // console.log(user)
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center bg-slate-50 pb-20 text-center shadow-lg md:px-20">
        <span className="text-xl font-bold capitalize text-blue-700 md:text-2xl">
          Welcome {user.username}, to{' '}
          <h1 className="">
            HTU COMPUTER SCIENCE DEPARTMENT <br />( COMPSA) Voting Portal
          </h1>
        </span>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex w-full w-full flex-col flex-wrap items-center justify-around space-y-6 rounded-md  bg-gray-200 px-2 py-16 shadow-xl shadow-gray-300 sm:w-full md:max-w-2xl md:py-20 md:px-24"
        >
          <span className="mt-4 text-3xl font-bold">
            <h1 className="uppercase text-blue-700">Login Form</h1>
          </span>
          <div className="relative h-20 w-80 rounded">
            <Image
              src={Logo}
              alt="PUC Logo"
              objectFit="contain"
              className="absolute h-20 w-80 rounded-xl"
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
              required
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
              required
              placeholder="Index Number + OTP"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <span className="cursor-pointer text-gray-700">
              Didn't OTP?{' '}
              <a
                className="text-blue-500"
                onClick={(e) => {
                  e.preventDefault()

                  router.push('/RequestOTP')
                }}
              >
                Request
              </a>
            </span>
          </div>
          <button className="w-3/4 rounded bg-blue-600 px-16 py-2 text-xl font-bold text-white outline-none  hover:bg-blue-500 hover:shadow-lg ">
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
          <Image src={Logo} alt="Vercel Logo" width={130} height={50} />
        </a>
      </footer>
    </div>
  )
}

export default Home
