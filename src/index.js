import express from 'express'

const app = express()
const port = 3000

app.get('/+', (req, res) => {
    console.log(req.query)
    let a = parseInt(req.query.a)
    let b = parseInt(req.query.b)
    let suma = a + b 

    res.send( `suma je : ${suma}` )
    

})


app.get('/-', (req, res) => {
    console.log(req.query)
    let a = parseInt(req.query.a)
    let b = parseInt(req.query.b)
    let suma = a - b 

    res.send( `suma je : ${suma}` )
    

})


app.get('/*', (req, res) => {
    console.log(req.query)
    let a = parseInt(req.query.a)
    let b = parseInt(req.query.b)
    let suma = a * b 

    res.send( `suma je : ${suma}` )
    console.log(`suma je ${suma}`)

})


app.get('//', (req, res) => {
    console.log(req.query)
    let a = parseInt(req.query.a)
    let b = parseInt(req.query.b)
    let suma = a / b 

    res.send( `suma je : ${suma}` )
    

})

app.listen(port, () => console.log(`Slušam na portu ${port}!`))