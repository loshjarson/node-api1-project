// BUILD YOUR SERVER HERE
const express = require("express")
const User = require("./users/model")
const server = express()

server.use(express.json())

server.post("/api/users",(req,res)=>{
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(422).json("New users must include a valid name and bio")
    }else{
        User.insert(newUser)
        .then(user=>{
            res.json(user)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
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
            res.status(500).json({message:err.message})
        })
})

server.get("/api/users/:id",(req,res)=>{
    const idVar = req.params.id
    User.findById(idVar)
        .then(user=>{
            if(!user){
                res.status(400).json(`Sorry, but user ${idVar} does not exist`)
            }else{
                res.json(user)
            }
        })
})

server.delete("/api/users/:id",async (req, res)=>{
    try{
        const {id} = req.params
        const deletedUser = await User.remove(id)
        if(!deletedUser){
            res.status(500).json(`User ${id} doesn't exist`)
        }else{
            res.status(201).json(deletedUser)
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports = {}; // EXPORT YOUR SERVER instead of {}
