import express from 'express'
import cors from 'cors'
import bundleFiles from './bundler.mjs'

const app = express()
const port = 3001

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
)

app.use(express.json())

app.post('/bundler', async (req, res) => {
  const { entryFiles, assets } = req.body
  try {
    const results = []

    for (const entry of entryFiles) {
      const build = await bundleFiles(entry, assets)
      const buildObject = {
        ...build,
        referenceData: {
          htmlId: entry.htmlId,
          htmlPath: entry.htmlPath,
          htmlContent: entry.htmlContent,
          paths: entry.paths,
        },
      }

      results.push(buildObject)
    }

    res.json(results)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
