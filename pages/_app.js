import { ToastContainer } from 'react-toastify'
import '../styles/globals.css'
import UserContext from './context/context'
import 'react-toastify/dist/ReactToastify.css'
function MyApp({ Component, pageProps }) {
  return (
    <UserContext>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} hideProgressBar />
    </UserContext>
  )
}

export default MyApp
