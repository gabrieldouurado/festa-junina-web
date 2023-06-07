import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
})

export async function getAllFoods() {
  const foods = await api.get('/food')

  return foods.data
}

export async function getAllGuests() {
  const guests = await api.get('/guest')

  return guests.data
}

interface NewGuestProps {
  name: string
  peopleQuantity: number
  foodId: string
}

export async function createNewGuest(data: NewGuestProps) {
  await api.post('/guest/create', data)
}
