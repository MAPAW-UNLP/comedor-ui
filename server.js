const express = require('express');

const app = express();

const port = process.env.PORT || 8080;

app.use(express.static('./dist/comedor-ui'));

app.get('/*', (req, res) => res.sendFile('index.html', {root: 'dist/comedor-ui/'}));

app.listen(port);

console.log(`app listening on port ${port}`);