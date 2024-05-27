import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '.'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppState>()
