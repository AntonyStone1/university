import PATHS from './Path'

export const getItemsData = async () => {
  const response = await fetch(PATHS.getUserData)

  if (!response.ok) {
    throw new Error('Something went wrong')
  }
  return response.json()
}

export const setRating = async ({ id, ...formatData }: { id: any }) => {
  const response = await fetch(`${PATHS.getUserData}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formatData),
  })
  console.log('api', formatData)

  if (!response.ok) {
    throw new Error('Some error')
  }
  console.log('response', response)

  return response
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
