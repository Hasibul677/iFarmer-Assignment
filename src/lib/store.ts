import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import ticTacToeReducer from '@/features/ticTacToe/ticTacToeSlice'
import productsReducer from '@/features/products/productsSlice'

export const store = configureStore({
  reducer: {
    ticTacToe: ticTacToeReducer,
    products: productsReducer,
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector