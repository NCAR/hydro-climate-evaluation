const express = require('express');
const next = require('next');
const path = require('path');
const serveIndex = require('serve-index'); // Import serve-index
const cors = require('cors'); 

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(cors());
    // server.use('/hydro-climate-eval/data', express.static(path.join(__dirname, 'data')));
    // server.use('/data', express.static('data'));
    server.use('/hydro-climate-eval/data',
	       express.static(path.join(__dirname, 'data'), { dotfiles: 'allow' }),
	       serveIndex(path.join(__dirname, 'data'), {'icons': false, 'hidden': true }));
    
    server.all('*', (req, res) => {
	return handle(req, res);
    });

    server.listen(8080, (err) => {
	if (err) throw err;
	console.log('> Ready on http://localhost:8080');
    });
});

