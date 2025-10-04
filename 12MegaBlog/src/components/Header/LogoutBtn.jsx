import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
      className='px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-all duration-200 text-sm uppercase tracking-wide border border-red-500 hover:border-red-600 shadow-sm'
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn