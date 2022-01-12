import PATHS from './Path'

export const getItemsData = async () => {
  const response = await fetch(PATHS.getUserData)
  console.log(response)

  if (!response.ok) {
    throw new Error('Something went wrong')
  }
  return response.json()
}

export const setRating = async (data: any) => {
  const response = await fetch(`${PATHS.getUserData}/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Some error')
  }
  return true
}

export const getItem = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, { id }] = queryKey
  const ressponse = await fetch(`${PATHS.getUserData}/${id}`)

  if (!ressponse.ok) {
    throw new Error('Some error')
  }
  return ressponse.json()
}
