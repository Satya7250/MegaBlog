import React, { useState } from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: "Create Post",
      slug: "/add-post",
      active: authStatus
    },
  ]

  const handleNavClick = (slug) => {
    navigate(slug)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className='sticky top-0 z-50 bg-slate-900 shadow-xl border-b border-slate-700'>
      <Container>
        <nav className='flex items-center justify-between py-4'>
          {/* Logo Section */}
          <div className='flex items-center space-x-4'>
            <Link to='/' className='flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200'>
              {/* <Logo /> */}
              <span className='text-2xl font-bold text-white hidden sm:block tracking-tight border-2 rounded-md p-1'>SBLOG</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1'>
            {navItems.map((item) => 
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.slug)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm uppercase tracking-wide cursor-pointer
                    ${
                      location.pathname === item.slug
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }
                  `}
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && (
              <div className='ml-4 pl-4 border-l border-slate-600'>
                <LogoutBtn />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className='md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors duration-200'
            aria-label='Toggle mobile menu'
          >
            <svg
              className={`w-6 h-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className='py-4 space-y-2 border-t border-slate-700'>
            {navItems.map((item) => 
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.slug)}
                  className={`
                    w-full px-4 py-3 rounded-lg font-medium text-left transition-all duration-200 text-sm uppercase tracking-wide cursor-pointer
                    ${
                      location.pathname === item.slug
                        ? 'bg-blue-600 text-white border-l-4 border-blue-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }
                  `}
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && (
              <div className='pt-4 mt-4 border-t border-slate-700'>
                <LogoutBtn />
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header