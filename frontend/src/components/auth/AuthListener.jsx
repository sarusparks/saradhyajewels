// src/components/auth/AuthListener.jsx — Synchronize Firebase Auth with Zustand
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/firebase'
import { useAuthStore } from '@/store'

export default function AuthListener() {
  const { setUser, setLoading } = useAuthStore()

  useEffect(() => {
    setLoading(true)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [setUser, setLoading])

  return null
}
