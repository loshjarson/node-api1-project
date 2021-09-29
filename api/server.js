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
    User.findAll()
        .then(users=>{
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err=>{
            res.status(500).json({ message: "The users information could not be retrieved" })
        })
})

server.get("/api/users/:id",(req,res)=>{
    const idVar = req.params.id
    User.findById(idVar)
        .then(user=>{
            if(!user){
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            }else{
                res.json(user)
            }
        })
        .catch(err=>{
            res.status(500).json({ message: "The user information could not be retrieved" })
        })
})

server.delete("/api/users/:id",async (req, res)=>{
    try{
        const {id} = req.params
        const deletedUser = await User.remove(id)
        if(!deletedUser){
            res.status(404).json({ message: "The user with the specified ID does not exist" })
        }else{
            res.status(201).json(deletedUser)
        }
    }catch(err){
        res.status(500).json({ message: "The user could not be removed" })
    }
})

server.put("/api/users/:id",async (req,res) => {
    const {id} = req.params
    const changes = req.body
    try{
        if(!changes.name || !changes.bio){
            res.status(400).json({ message: "Please provide name and bio for the user" })
        }else{
            const updatedUser = await User.update(id,changes)
            if(!updatedUser){
                res.status(404).json({ message: "There was an error while saving the user to the database" })
            }else{
                res.status(200).json(updatedUser)
            }
        }    
    }
    catch(err){
        res.status(500).json({ message: "The user information could not be modified" })
    }
})

module.exports = {}; // EXPORT YOUR SERVER instead of {}
