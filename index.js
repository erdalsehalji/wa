import express from 'express';
const app = express()  // instanciranje aplikacije 
const port = 3000  // port na kojem će web server slušati
let lista = []
app.get('/add', (req, res) => {
    let b = Math.floor(Math.random() * 100) +1
    return lista.push(b)
});
app.listen(port, () => console.log(`Slušam na portu ${port}!`))
