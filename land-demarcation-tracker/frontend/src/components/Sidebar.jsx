import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  MapIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const navItems = [
  { name: 'Home',                   to: '/dashboard', icon: HomeIcon },
  { name: 'Plot Management',        to: '/plots',     icon: MapIcon },
  { name: 'Demarcation Logs',       to: '/logs',      icon: ClipboardDocumentListIcon },
  { name: 'Duplication & Unresolved', to: '/disputes', icon: ExclamationTriangleIcon },
]

export default function Sidebar({ isOpen, onClose }) {
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
          onClick={() => {/* logout */}}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3 flex-shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  )
}