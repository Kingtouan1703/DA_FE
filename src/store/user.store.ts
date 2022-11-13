import create from 'zustand'
import { UserData } from '../api/admin/admin.api'

interface LoginState {
  isLoggin: boolean
  setIsLoggin: (isLoggin: boolean) => void
  name: string
  setName: (name: string) => void
  username: string
  setUsername2: (username: string) => void
  user_id: string
  setUserId: (user_id: string) => void
  userDetail: UserData | undefined
  setUserDetai: (userDetail: UserData) => void
}

const useUserStore = create<LoginState>((set) => ({
  isLoggin: false,
  setIsLoggin: (isLoggin) =>
    set((state) => ({
      ...state,
      isLoggin
    })),
  name: '',
  setName: (name) =>
    set((state) => ({
      ...state,
      name
    })),

  username: '',
  setUsername2: (username) =>
    set((state) => ({
      ...state,
      username
    })),

  user_id: '',
  setUserId: (user_id) =>
    set((state) => ({
      ...state,
      user_id
    })),
  userDetail: undefined,
  setUserDetai: (userDetail) =>
    set((state) => ({
      ...state,
      userDetail
    }))
}))

export default useUserStore
