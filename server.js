const express= require("express")
const mongoose=require("mongoose")
const port=9876
const app=express()
app.use(express.json())
const fuelSchema=new mongoose.Schema({
    name:String,
age:Number,
gender:String,
isMarried:Boolean
})

 const user =mongoose.model("fuelstation",fuelSchema)

// entry point
app.get("/",(req,res)=>{

   res.status(200).json("Welcome to my page")
   
})

//Creating a data in our database


app.post("/createuser",async(req,res)=>{
const newResult =await new user (req.body)
newResult.save()
res.status(200).json(newResult)
})

//retrieving data

app.get("/getall",async(req,res)=>{
const All=await user.find()
res.status(200).json(
    {message:"the available users are "+All.length,
        data:All}
)
})

//retrieve a single user

app.get("/getone/:id",async(req,res)=>{
    const id=req.params.id
    const Oneuser=await user.findById(id)
    console.log(Oneuser)
    res.status(200).json(
        {message:`Kindly find below the information of the user with the id of ${id} `,
            data:Oneuser}
    )
    })

    // delete a single user
    app.delete("/delete/:id",async(req,res)=>{
        const id=req.params.id
        const deleteUser=await user.findByIdAndDelete(id)
        
        res.status(200).json(
            {message:`The information of the user with the id of ${id} has been deleted`,
                }
        )
        })
    

mongoose.connect("mongodb+srv://ajoluwatimilehin:dqbVBm3P7ZlsMNer@cluster0.kxcjpyi.mongodb.net/")
.then(()=>{
{console.log("Connected to database")}
})









app.listen(port,()=>{
    console.log("server is running on port "+port)
})

