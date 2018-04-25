const express = require('express');
const app = express();
let contador = 0;

app.use('/', express.static(__dirname));

app.get('/api', function(req, res) {
    contador += 1;
    const data = {
        msg: 'Hello, World!',
        count: contador
    };
    res.send(JSON.stringify(data));
})

app.listen(8000,function() {
    console.log('servidor iniciado...');
})