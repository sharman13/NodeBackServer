const express = require('express');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Products = require('./models/Products');
const cors = require('cors');
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://sharman:sharman010506@cluster0.tajua.mongodb.net/<node trial>?retryWrites=true&w=majority', {
    useMongoClient: true
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/viewProducts', (req, res) => {
    console.log('osisduos');
    Products.find({}).then(doc => res.send(doc));
})

app.post("/addProduct", (req, res) => {
    const product = new Products({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      description: req.body.des,
      imageUrl: req.body.imageUrl
    });
    product.save()
      .then(result => {
        console.log(result);
        res.send('done')
      })
      .catch(err => {
        console.log(err);
      });
  });
  
app.post('/delete', (req,res) => {
    Products.findOneAndDelete({_id: req.body.idToRemove}).then(doc => res.send("deleted successfully"));
})

app.post('/edit', (req, res) => {
    console.log(req.body);
    Products.updateOne({_id: req.body.idToEdit}, {name: req.body.name, description: req.body.description, price: req.body.price, imageUrl: req.body.imageUrl}).then(doc => res.send("doneedit")).catch(err => res.send("err"))
})

app.post('/login', (req,res) => {
  var users = [
    {
      username: "sharman",
      password: "123456",
      url: "https://testserverforecom.herokuapp.com/"
    },
    {
      username: "sweetpop",
      password: "sweetpop1234",
      url: "https://thesweetpop.herokuapp.com/"
    }
  ];
  console.log(req.body);
  var a = false;
  let newUrl = '';
  for (let index = 0; index < users.length; index++) {
      if(req.body.username === users[index].username) {
          if(req.body.password === users[index].password) {
            a = true;
            newUrl = users[index].url
            break;
          }
      }    
  }

  var data = [
    {
      Logged: a,
      url: newUrl
    }
  ];

  if(a === true) {
    res.send(data);
  }

  else{
    res.send(data);
  }

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
