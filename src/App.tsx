import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Cookies from 'universal-cookie'
import SignIn from './components/SignIn/SignIn'
import toroTheme from './themes/toro-theme'
import { ThemeProvider } from '@emotion/react'

export default function App() {

  const[user, setUser] = useState(false)
  
  const theme = toroTheme('light')

  function checkUser() {
    const c = new Cookies()
    if (c.get('auth-service-platform-token')) {
      setUser(true)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <SignIn />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div>Artemis</div>
    </ThemeProvider>
  )
}