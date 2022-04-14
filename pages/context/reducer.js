import { AUTH, AUTH_FAILED } from './constants'

export const Reducer = (state, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        isAuthenticated: true,
        isAdmin: action.payload.isAdmin,
        username: action.payload.username,
        token: action.payload.token,
      }

    case AUTH_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        isAdmin: false,
        token: '',
      }

    default:
      return {
        state,
      }
  }
}

export default Reducer
