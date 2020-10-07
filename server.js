const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const port = process.env.PORT || 8080

const proxy = (request, response) => {

	request.url = request.url.replace("/backend", "");
	const proxy = httpProxy.createProxyServer({
		target: `https://comedor-universitario.herokuapp.com`,
		changeOrigin: true,
		secure: false,
	});

	proxy.on('proxyReq', (proxyReq, req) => {
		if (req.method === 'POST' && !!(req.body && req.complete)) {
		const bodyData = JSON.stringify(req.body);
		// incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
		proxyReq.setHeader('Content-Type', 'application/json');
		proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
		// stream the content
		proxyReq.write(bodyData);
		}
	});

	proxy.on('error', (e) => {
		console.error(e);
	});

	proxy.web(request, response);

}

app.use(express.static('./dist/comedor-ui'));


app.get('/backend/*', (req, res) => proxy(req, res));

app.post('/backend/*', (req, res) => proxy(req, res));

app.put('/backend/*', (req, res) => proxy(req, res));

app.delete('/backend/*', (req, res) => proxy(req, res));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/comedor-ui/'}),
);

app.listen(port);
console.log(`App running on port ${port}`);


