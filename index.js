
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const upload = multer({dest:'uploads/'})

const app = express()

app.get('/',( req,res )=>{
  res.send('hello')

})

app.options('/upload',cors())
app.post('/upload',cors(),upload.single('file'),(req,res)=>{
  res.set('Access-Control-Allow-Origin','*')
  res.send(req.file.filename)
})

app.get('/preview/:key',cors(),(req,res)=>{
  res.sendFile(`uploads/${req.params.key}`,{
    root:__dirname,
    header:{
      'Content-Type':'image/jpeg'
    },
  },(error)=>{
    res.status(404).send('file not found')

  })
})

app.listen(3000)
