const express = require('express');
const app = express();

app.use('/', express.static(__dirname));

app.get('/api', function(req, res) {
    const data = {
        title: 'Hello, World!',
        msg: 'Mensagem',
        author: 'Autor',
        created_at: 'Data'
    };
    res.send(JSON.stringify(data));
})

app.listen(8000,function() {
    console.log('servidor iniciado...');
})