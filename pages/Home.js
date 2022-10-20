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
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center text-center md:px-20">
        <span className="text-xl font-bold capitalize text-blue-700 md:text-2xl">
          Welcome {user.username}, to{' '}
          <h1 className="">
            HTU COMPUTER SCIENCE DEPARTMENT <br />( COMPSSA) Voting Portal
          </h1>
        </span>

        <p className="mt-3 w-full text-2xl">
          Please kindly take the following instructions seriously
          <p className="rounded-md  p-3 text-2xl">
            and abide by them. Thank you
          </p>
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <span className="mt-6 w-96 rounded-xl border p-6 text-left">
            <h3 className="text-2xl font-bold text-green-700">How To Vote</h3>
            <p className="mt-4 text-xl">
              Simply select your favorate candidate to vote for, and press the
              vote button to cast your vote. scroll down and continue voting.
            </p>
          </span>

          <span className="mt-6 w-96 rounded-xl border p-6 text-left ">
            <h3 className="text-2xl font-bold text-red-700">Warning </h3>
            <p className="mt-4 text-xl">
              Please when you are done voting you can logout or check the live
              results.
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
          {user.isAdmin && (
            <span className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
              <Link href="/Result">
                <a className="text-2xl font-bold capitalize text-blue-700">
                  Procceed to check Live Result &rarr;
                </a>
              </Link>
            </span>
          )}
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
