import express from 'express';
import storage from './memory_storage'
var cors = require('cors')
const app = express()  // instanciranje aplikacije 


const port = 3000  // port na kojem će web server slušati

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "*");
    next();
});

app.get('/posts', (req, res) => {
   
    let posts = storage.posts
    let query = req.query

    if(query.title) {
        posts = posts.filter(e => e.title.indexOf(query.title) >= 0)
    }
    
    if(query.createdBy) {
        posts = posts.filter(e => e.createdBy.indexOf(query.createdBy) >= 0)
    }

    if (query._any) {
        let pretraga = query._any
        let pojmovi = pretraga.split(" ")

        posts = posts.filter(post => {
            let podatci = post.title + post.createdBy
            let rezultat = pojmovi.every(pojam => {
                return podatci.indexOf(pojam) >= 0
            })
            return rezultat
        })
    }

    res.json(posts)
})

app.listen(port, () => console.log(`Slušam na portu ${port}!`))
