import create from 'zustand'

interface LoginState {
  isLoggin: boolean
  setIsLoggin: (isLoggin: boolean) => void
  name: string
  setName: (name: string) => void
  username: string
  setUsername2: (username: string) => void
  finger_register: boolean | null
  setFingerRegister: (finger_register: boolean) => void
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

  finger_register: null,
  setFingerRegister: (finger_register) =>
    set((state) => ({
      ...state,
      finger_register
    }))
}))

export default useUserStore
