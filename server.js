const express = require('express')
const next = require('next')
const contentApi = require('./content-api')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/project/:id', (req, res) => {
    return app.render(req, res, '/project', { id: req.params.id })
  })

  server.get('/api/project/:id', async (req, res) => {
    const data = await contentApi.getProject(req.params.id)
    res.json(data)
  })

  server.get('/api/page/:id', async (req, res) => {
    const data = await contentApi.getPage(req.params.id)
    res.json(data)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
