// BUILD YOUR SERVER HERE
const express = require("express")
const User = require("./users/model")
const server = express()

server.use(express.json())

server.post("/api/users",(req,res)=>{
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(400).json({ message: "Please provide name and bio for the user" })
    }else{
        User.insert(newUser)
        .then(user=>{
            res.status(201).json(user)
        })
        .catch(err=>{
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })
    }
})

server.get("/api/users", (req,res)=>{
    User.find()
        .then(users=>{
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err=>{
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
