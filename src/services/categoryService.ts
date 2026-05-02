import { api } from '../config/api'
import { TOKEN_KEY } from './authService'

export interface Category {
  id: number
  name: string
  type: string
  status: boolean
}

export interface CategoryResponse {
  data: Category[]
  message?: string
}

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      throw new Error('No token')
    }

    const response = await fetch(api.categories, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'x-client-time': new Date().toISOString(),
      },
    })

    if (!response.ok) {
      if (response.status === 401) {
        // Let auth flow handle it, but we can throw specific error
        throw new Error('Unauthorized')
      }
      throw new Error('Failed to fetch categories')
    }

    const result: CategoryResponse = await response.json()
    const data = result.data ?? result ?? [] // fallback if it's a direct array
    return (Array.isArray(data) ? data : []).map((item: any) => ({
      ...item,
      status:
        item.isActive !== undefined
          ? item.isActive
          : item.is_active !== undefined
            ? item.is_active
            : item.status,
    }))
  },

  async createCategory(payload: {
    name: string
    type: string
    status: boolean
  }): Promise<Category> {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      throw new Error('No token')
    }

    const response = await fetch(api.categories, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'x-client-time': new Date().toISOString(),
      },
      body: JSON.stringify({
        name: payload.name,
        type: payload.type,
        isActive: payload.status,
      }),
    })

    if (!response.ok) {
      let errorMsg = 'Failed to create category'
      try {
        const errData = await response.json()
        console.error('Backend error response:', errData)
        errorMsg = errData.message || JSON.stringify(errData)
      } catch (e) {
        console.error('Could not parse error response', e)
      }
      throw new Error(errorMsg)
    }

    const result = await response.json()
    const data = result.data ?? result
    // Map response back
    if (data && data.isActive !== undefined) {
      data.status = data.isActive
    } else if (data && data.is_active !== undefined) {
      data.status = data.is_active
    }
    return data
  },
}
