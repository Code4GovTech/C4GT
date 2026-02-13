// src/pages/Login.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api/api'
import { getCircles, getOfficers, loginUserUrl } from '../api/url'
import { useDispatch } from 'react-redux'
import { login, setCirclesAndOfficers } from '../store/slices/authSlice'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([email, password].some(f => f.trim() === '')) {
      toast.error('Email and password both are required')
      return
    }

    setLoading(true)
    try {
      const { data } = await api.post(loginUserUrl(), { email, password });
      toast.success(data?.message || 'Logged in successfully');
      dispatch(login(data.data));
      (async function () {
        try {
          const circles = await api.get(getCircles());
          const officers = await api.get(getOfficers());
          console.log(`Officers: ${(officers.data)}`);
          console.log(`Circles: ${circles.data}`);
          dispatch(setCirclesAndOfficers({ circles: circles.data.data, officers: officers.data.data }));
        } catch (error) {
          console.log(`Error fetching circles and officers: ${error}`);
        }
      })();   
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md -translate-y-24">
        <h1 className="text-2xl font-bold text-center mb-2">Login to your account</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your email and password to access the system
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your.email@gov.org"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-800 hover:bg-indigo-900 text-white font-semibold py-3 rounded
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}
