import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom plugin: serve /data/* requests directly from data/ directory
// This eliminates the need to copy files to public/data/
function serveDataDir() {
  return {
    name: 'serve-data-dir',
    configureServer(server) {
      server.middlewares.use('/data', (req, res, next) => {
        const dataDir = path.resolve(process.cwd(), 'data')
        // Decode URL to catch encoded traversal like %2e%2e (encoded ..)
        const decoded = decodeURIComponent(req.url).replace(/^\//, '')
        const filePath = path.resolve(dataDir, decoded)

        // Prevent path traversal attacks
        if (!filePath.startsWith(dataDir + path.sep) && filePath !== dataDir) {
          res.statusCode = 403
          res.end('Forbidden')
          return
        }

        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          fs.createReadStream(filePath).pipe(res)
        } else {
          next()
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), serveDataDir()],
  publicDir: 'public',
  server: {
    host: 'localhost',
    port: 5174
  }
})
