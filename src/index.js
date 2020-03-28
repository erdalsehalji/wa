import express from 'express'

const app = express()
const port = 3000

app.get('/:fib', (req, res) => {
    let b = req.params.fib
    let fibonacci = function (b) 
    {
        if (b===1) 
      {
        return [0, 1];
      } 
      else 
      {
        var s = fibonacci(b - 1);
        s.push(s[s.length - 1] + s[s.length - 2]);
        return s     
      }   
    };
    res.send( `Fibonacci prvih ${b} brojeva : ${fibonacci(b)}`)
})
app.listen(port, () => console.log(`slusam na portu: ${port}`))