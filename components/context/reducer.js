import { AUTH, AUTH_FAILED, LOGOUT } from './constants'

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
    case LOGOUT:
      return {
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
