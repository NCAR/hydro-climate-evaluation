// local-server.js
// Build (if needed) and serve the app locally at http://localhost:8080

const express = require('express');
const next = require('next');
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');
const serveIndex = require('serve-index');
const cors = require('cors');

const ROOT = __dirname;
const PORT = process.env.PORT || 8080;
const DATA_DIR = path.join(ROOT, 'data');

// Build once if there's no .next directory
if (!fs.existsSync(path.join(ROOT, '.next'))) {
  console.log('> No .next build found. Building the app for local use...');
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const res = spawnSync(npx, ['next', 'build'], {
    stdio: 'inherit',
    cwd: ROOT,
    env: { ...process.env, NODE_ENV: 'production' },
  });
  if (res.status !== 0) {
    console.error('> Build failed.');
    process.exit(res.status ?? 1);
  }
}

const app = next({ dev: true, dir: ROOT });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // Serve local Zarr/static data directory with listing
  server.use(
    '/hydro-climate-eval/data',
    express.static(DATA_DIR, { dotfiles: 'allow' }),
    serveIndex(DATA_DIR, { icons: false, hidden: true })
  );

  // Hand off everything else to Next.js
  server.all('*', (req, res) => handle(req, res));

  server.listen(PORT, () => {
    console.log(`> Local build ready at http://localhost:${PORT}/hydro-climate-eval`);
  });
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
