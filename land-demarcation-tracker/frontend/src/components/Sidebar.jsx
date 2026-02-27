import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  HomeIcon,
  MapIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  ViewColumnsIcon,
} from '@heroicons/react/24/outline'
import { useDispatch } from 'react-redux'
import { logoutUserUrl } from '../api/url'
import { logout } from '../store/slices/authSlice'
import { toast } from 'react-toastify'
import api from '../api/api'

const navItems = [
  { name: 'Dashboard',                   to: '/dashboard', icon: ViewColumnsIcon },
  { name: 'Plot Management',        to: '/plots',     icon: MapIcon },
  { name: 'Demarcation Logs',       to: '/logs',      icon: ClipboardDocumentListIcon },
  { name: 'Duplication & Unresolved', to: '/disputes', icon: ExclamationTriangleIcon },
]

export default function Sidebar({ isOpen, onClose }) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.post(logoutUserUrl())
      dispatch(logout())
      toast.success('Logged out successfully')
      navigate('/login', { replace: true })
    } catch (err) {
      const msg = err.response?.data?.message || 'Logout failed'
      toast.error(msg)
    }
  }

  return (
    // off-canvas responsive
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform transition-transform
        flex flex-col        /* make it a column flex container */
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:static md:translate-x-0
      `}
    >
      {/* Mobile close button */}
      <div className="flex items-center justify-between h-16 px-6 border-b md:hidden">
        <span className="text-xl font-bold text-blue-900">
          Land Tracker
        </span>
        <button onClick={onClose}>
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Desktop logo */}
      <div className="hidden md:flex items-center h-16 px-6 border-b">
        <span className="text-xl font-bold text-blue-900">
          Land Demarcation Tracker
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map(({ name, to, icon: Icon }) => (
          <NavLink
            key={name}
            to={to}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
               ${
                 isActive
                   ? 'bg-blue-100 text-blue-900'
                   : 'text-gray-700 hover:bg-gray-50'
               }`
            }
          >
            <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
            {name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3 flex-shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  )
}