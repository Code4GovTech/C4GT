import React from 'react'

export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={
        `px-4 py-2 rounded font-medium transition 
         bg-indigo-600 hover:bg-indigo-700 text-white ` 
        + className
      }
      {...props}
    >
      {children}
    </button>
  )
}
