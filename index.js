import express from 'express'; 

const app = express()  
const port = 3000  

app.use(express.static(__dirname + "/public"))
app.get('/', (req, res) => { 
       res.sendFile(__dirname + '/index.html')
       });

app.listen(port, () => console.log(`Slušam na portu ${port}!`))