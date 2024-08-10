const API_BASE_URL = 'http://localhost:3001'

export const bundleFilesAPI = async (entryFiles, assets) => {
  console.log('entryFiles', entryFiles, assets)
  const response = await fetch(`${API_BASE_URL}/bundler`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ entryFiles, assets }),
  })

  if (!response.ok) throw new Error('Failed to bundle files')
  return response.json()
}
