import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import api from '../api/api'
import { getCircles, getOfficers, registerUserUrl } from '../api/url'
import { setCirclesAndOfficers } from '../store/slices/authSlice'

export default function RegisterPage() {
  const navigate = useNavigate()
  const circles = useSelector(state => state.user.circles) || [];
  
  const [fullName, setFullName]             = useState('')
  const [email, setEmail]                   = useState('')
  const [password, setPassword]             = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole]                     = useState('officer')
  const [circle, setCircle]                 = useState('')  // now an ID from the dropdown
  const [loading, setLoading]               = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if ([ fullName, email, password, role, circle ].some(f => f.trim() === '')) {
      toast.error('Please fill out all fields')
      return
    }

    setLoading(true)
    try {
      const { data } = await api.post(registerUserUrl(), {
        name:   fullName,
        email,
        password,
        role,
        circle: [circle], // send circle as an array of IDs
      })
      toast.success(data?.message || 'User registered successfully')
      navigate('/login')
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const circles = await api.get(getCircles());
      const officers = await api.get(getOfficers());
      console.log(`Officers: ${(officers.data)}`);
      console.log(`Circles: ${circles.data}`);
      dispatch(setCirclesAndOfficers({ circles: circles.data.data, officers: officers.data.data }));
    })();
    
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-2">Create your account</h1>
        <p className="text-gray-600 text-center mb-6">
          Register to access the land demarcation system
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="officer">Officer</option>
            </select>
          </div>

          {/* Circle (dropdown from state.common.circles) */}
          <div>
            <label className="block text-sm font-medium mb-1">Circle</label>
            <select
              value={circle}
              onChange={e => setCircle(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select circle</option>
              {circles.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-800 hover:bg-indigo-900 text-white font-semibold py-3 rounded
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {loading ? 'Registering…' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}
