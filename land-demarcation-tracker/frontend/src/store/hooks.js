import { useDispatch, useSelector } from 'react-redux'

// Use these for consistent dispatch & selector throughout your app
export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
