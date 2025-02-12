const express = require('express');
const next = require('next');
const path = require('path');
const serveIndex = require('serve-index');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(cors({
	origin: '*',  // Allow all origins, you can restrict this as needed
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // Server the static zarr array data site with a directory structure
    server.use('/hydro-climate-eval/data',
	       express.static(path.join(__dirname, 'data'), { dotfiles: 'allow' }),
	       serveIndex(path.join(__dirname, 'data'), {'icons': false, 'hidden': true }));

    // Serve the main Next.js site
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(8080, (err) => {
	if (err) throw err;
	console.log('> Ready on http://localhost:8080');
    });
});
