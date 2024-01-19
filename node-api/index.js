const express=require('express');
const mongoose = require('mongoose')
const bodyParser =require('body-parser');
const fs = require('fs/promises');
const app = express();
const PORT = 8000;
const cors =  require('cors');
const userModel = require('./Models/users');
const personModel = require('./Models/persons');
const stockModel = require('./Models/stock');

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/userdata')
.then(()=>{
    console.log("connected to database")
})
.catch((err)=>{
    console.log("error connecting to database :",err)
})

app.post('/register',(req,res)=>{
    const {email} = req.body;
    userModel.findOne({email:email})
    .then((user)=>{
        if(user){
        res.json("Email already Exists")}
        else{
            userModel.create(req.body)
            .then(users =>res.json(users))
            .catch(err=>res.json(err))
        }
    })
})

app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    userModel.findOne({email:email})
    .then((user)=>{
        if(user){
            if(user.password===password){
                res.json("success");
            }else{
                res.json("password is incorrect")
            }
        }else{
            res.json("user not exists")
        }
    })
});
app.post('/new-person',(req,res)=>{
    const{email} = req.body;
    personModel.findOne({email:email})
    .then((person)=>{
        if(person){
            res.json("An user with same email id already exists")
        }else{
            personModel.create(req.body)
            .then(()=>{res.json("User added Successfully")})
            .catch(()=>{res.json("User Not added ")})

        }
    })
})
app.get('/persons', async (req, res) => {
    try {
      let sortQuery = {};
  
      if (req.query.sortOrder === 'asc') {
        sortQuery = { username: 1 };
      } else if (req.query.sortOrder === 'desc') {
        sortQuery = { username: -1 };
      } else if (req.query.sortOrder === 'lastModified') {
        sortQuery = { updatedAt: -1 };
      } else if (req.query.sortOrder === 'lastInserted') {
        sortQuery = { createdAt: -1 };
      }
  
      const persons = await personModel.find({}).sort(sortQuery);
  
      res.json(persons);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.get('/persons/:id', (req, res) => {
    const userId = req.params.id;

    personModel.findOne({ _id: userId })
        .then((user) => {
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.json(user);
        })
        .catch((error) => {
            console.error('Error fetching user:', error);
            res.status(500).send('Internal Server Error');
        });
});

app.patch('/update-person/:id',(req,res)=>{
    const userid = req.params.id;
    const updateData = req.body;

    personModel.updateOne({_id : userid},{$set:updateData})
    .then(()=>{
        res.json("updated succesfully");

    })
    .catch(()=>{
        res.json("not updated")
    })
});

app.delete('/delete-person/:id', (req, res) => {
  const personId = req.params.id;

  personModel.findOne({ _id: personId })
    .then((user) => {
      if (user) {
        personModel.deleteOne({ _id: personId })
          .then(() => {
            res.json({ message: "User Deleted" });
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      console.error('Error finding user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
app.get('/person-search', async (req, res) => {
    try {
      const searchQuery = req.query.search || '';
      const regex = new RegExp(searchQuery, 'i'); // Case-insensitive search
      const users = await personModel.find({ $or: [{ username: regex }, { email: regex }, { phone: regex }] });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.post('/invested-data',(req,res)=>{
  stockModel.create(req.body)
  .then(stocks =>res.json(stocks))
  .catch(err=>res.json(err))
})







app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})