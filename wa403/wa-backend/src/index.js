import express from 'express';
import storage from './memory_storage.js'
import cors from 'cors'
import connect from './db.js'

const app = express()  // instanciranje aplikacije
const port = 3000  // port na kojem će web server slušati

app.use(cors())
app.use(express.json()) // automatski dekodiraj JSON poruke
 
app.post('/posts', (req, res) => {
    let data = req.body

    // ovo inače radi baza (autoincrement ili sl.), ali čisto za primjer
    data.id = 1 + storage.posts.reduce((max, el) => Math.max(el.id, max), 0)

    // dodaj u našu bazu (lista u memoriji)
    storage.posts.push(data)

    // vrati ono što je spremljeno
    res.json(data) // vrati podatke za referencu
})



app.get('/posts', async (req, res) => {
    let db = await connect()
    let query = req.query // varijabla za request query 

    let selekcija = {} //prazan objekt koji ua kojem spremas parametar
    if(query.createdBy) { //ako postoji upit sa createdBy
        selekcija.createdBy = new RegExp (query.createdBy)//poretrazi po unesenom slovu/rijeci
    } //udi u objekt i potrazi taj upit, ali koristeci regexp omoguci trazenje
    // koje ne zahtjeva cjelokupni createdBy
    // na backendu (.../3000/posts?createdBy=^m) izbacit ce postove kojima
    // createdBy pocinje sa slovom m
   
    // neznam da li se ovo tražilo buduci da je receno da se napravi funkcija koju neznam kako napraviti
    // pa sam napravio po uzoru na video mongodb dohvat po atributima
    console.log(selekcija) // test u konzoli
    let cursor = await db.collection("posts").find(selekcija)//poziv find() sa objektom selekcija kao parametrom
    let results = await cursor.toArray()
    res.json(results)
})


app.get('/posts_memory', (req, res) => {
    let posts = storage.posts
    let query = req.query
    
    if (query.title) {
        posts = posts.filter(e => e.title.indexOf(query.title) >= 0)
    }
    
    if (query.createdBy) {
        posts = posts.filter(e => e.createdBy.indexOf(query.createdBy) >= 0)
    }
    
    if (query._any) {
        let terms = query._any.split(" ")
        posts = posts.filter(doc => {
            let info = doc.title + " " + doc.createdBy
            return terms.every(term => info.indexOf(term) >= 0)
        })
    }

    // sortiranje
    posts.sort((a, b) => (b.postedAt - a.postedAt))

    res.json(posts)
})

app.listen(port, () => console.log(`Slušam na portu ${port}!`))