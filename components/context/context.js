import { createContext, useContext, useReducer } from 'react'
import Reducer from './reducer'

const appData = createContext()
const UserContext = ({ children }) => {
  const [user, dispatchAction] = useReducer(Reducer, {
    token: '',
    isAuthenticated: false,
    isAdmin: false,
    username: '',
  })

  return (
    <appData.Provider value={{ user, dispatchAction }}>
      {children}
    </appData.Provider>
  )
}

export default UserContext

export const userState = () => {
  return useContext(appData)
}
