import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { userState } from '../components/context/context'

import Logo from './htu_logo.png'

const Instruction = () => {
  const router = useRouter()
  const { user, dispatchAction } = userState()
  console.log(user)
  useEffect(() => {
    if (user.isAuthenticated === false) {
      router.push('/')
    }
  }, [])
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Information</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center text-center md:px-20">
        <span className="text-xl font-bold capitalize text-blue-700 md:text-2xl">
          Welcome {user.username}, to{' '}
          <h1 className="">
            HTU COMPUTER SCIENCE DEPARTMENT <br />
             ( COMPSA) Voting Portal
          </h1>
        </span>

        <p className="mt-3 w-full text-2xl">
          Please kindly take the following instructions seriously
          <p className="rounded-md bg-gray-100 p-3 font-mono text-2xl">
            and abide by them. Thank you
          </p>
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <span className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold text-green-700">
              How To Vote &rarr;
            </h3>
            <p className="mt-4 text-xl">
              Simply select your favorate candidate to vote for, and press the
              vote button to cast your vote. scroll down and continue voting
            </p>
          </span>

          <span className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
            <h3 className="text-2xl font-bold text-red-700">Warning &rarr;</h3>
            <p className="mt-4 text-xl">
              Please when you are done voting, then logout from the system.
              <span className="text-xl font-bold text-red-600">
                {' '}
                Every individual is allowed to vote once!!
              </span>
            </p>
          </span>
          <span className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
            <Link href="/Vote">
              <a className="text-2xl font-bold capitalize text-blue-700">
                Procceed to Vote &rarr;
              </a>
            </Link>
          </span>
          <span className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
            <Link href="/Result">
              <a className="text-2xl font-bold capitalize text-blue-700">
                Procceed to check Result &rarr;
              </a>
            </Link>
          </span>
        </div>
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

export default Instruction
