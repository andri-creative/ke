import { api } from '../config/api'

export const TOKEN_KEY = 'accessToken'
export const USER_KEY = 'loggedInUser'

export type LoggedInUser = {
  name?: string
  email?: string
  role?: string
}

export type MeResponse = {
  user?: LoggedInUser
  data?: LoggedInUser
}

export const authService = {
  getCachedUser(): LoggedInUser | null {
    const rawUser = localStorage.getItem(USER_KEY)
    if (!rawUser) {
      return null
    }

    try {
      return JSON.parse(rawUser) as LoggedInUser
    } catch {
      localStorage.removeItem(USER_KEY)
      return null
    }
  },

  async fetchUser() {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      throw new Error('No token')
    }

    const clientTime = new Date().toISOString()

    const response = await fetch(api.user, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'x-client-time': clientTime,
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        throw new Error('Unauthorized')
      }
      throw new Error('Failed to fetch user')
    }

    const result: MeResponse = await response.json()
    const user = result.user ?? result.data ?? null
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    }
    return user
  },

  async login(email: string, password: string) {
    const clientTime = new Date().toISOString()

    const response = await fetch(api.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-time': clientTime,
      },
      body: JSON.stringify({ email, password }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result?.message ?? 'Login gagal. Cek Email/password.')
    }

    const token =
      result?.data?.token ??
      result?.data?.accessToken ??
      result?.token ??
      result?.accessToken
    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
    }

    const loggedInUser = result?.user ?? result?.data?.user ?? result?.data
    if (loggedInUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(loggedInUser))
    }

    localStorage.setItem('isLoggedIn', 'true')

    return result
  },

  async logout() {
    const clientTime = new Date().toISOString()
    const token = localStorage.getItem(TOKEN_KEY)

    try {
      await fetch(api.logout, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-client-time': clientTime,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
  },
}
