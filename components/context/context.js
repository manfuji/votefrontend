import { createContext, useContext, useReducer } from 'react'
import Reducer from './reducer'

const appData = createContext()
const UserContext = ({ children }) => {
  let stateToken = ''
  let stateIsAuthenticated = ''
  let stateUsername = ''

  if (typeof window !== 'undefined') {
    stateToken = JSON.parse(localStorage.getItem('token'))
    stateIsAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'))
    stateUsername = JSON.parse(localStorage.getItem('username'))
  }

  // const state_token = localStorage.getItem('')
  const [user, dispatchAction] = useReducer(Reducer, {
    token: stateToken || '',
    isAuthenticated: stateIsAuthenticated || false,
    isAdmin: false,
    username: stateUsername || '',
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
