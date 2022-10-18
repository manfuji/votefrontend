import { ToastContainer } from 'react-toastify'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import UserContext from '../components/context/context'
import {QueryClientProvider,QueryClient} from "react-query"
const queryClient = new QueryClient()
function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
    <UserContext>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} hideProgressBar />
    </UserContext>
    </QueryClientProvider>
  )
}

export default MyApp
