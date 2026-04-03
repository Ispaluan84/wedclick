import { createContext, useContext, useState, useEffect } from 'react'

const CookieContext = createContext()

export function CookieProvider({ children }) {
  const [consent, setConsent] = useState(null) // null | 'accepted' | 'rejected'

  useEffect(() => {
    const saved = localStorage.getItem('wedclick-cookies')
    if (saved) setConsent(saved)
  }, [])

  const acceptCookies = () => {
    setConsent('accepted')
    localStorage.setItem('wedclick-cookies', 'accepted')
  }

  const rejectCookies = () => {
    setConsent('rejected')
    localStorage.setItem('wedclick-cookies', 'rejected')
  }

  return (
    <CookieContext.Provider value={{ consent, acceptCookies, rejectCookies }}>
      {children}
    </CookieContext.Provider>
  )
}

export function useCookies() {
  return useContext(CookieContext)
}