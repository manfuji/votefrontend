import { ToastContainer } from 'react-toastify'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import UserContext from '../components/context/context'
function MyApp({ Component, pageProps }) {
  return (
    <UserContext>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} hideProgressBar />
    </UserContext>
  )
}

export default MyApp
