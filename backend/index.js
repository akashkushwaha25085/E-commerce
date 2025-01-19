const express = require("express")
const cors = require('cors')
require("./db/config.js")
const User = require("./db/User.js")
const Product = require("./db/Product.js")
const bcrypt = require("bcrypt");

// const Jwt = require("jsonwebtoken") 
// const JwtKey = 'e-commerce'

const app = express()
const port = 5000;

app.use(express.json())
app.use(cors())



app.post("/register", async (req, res) => {
   try{
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashedPassword;
      let user = new User(req.body)
      let result = await user.save()
      result = result.toObject()
      delete result.password
      res.send(result)
   }catch(error){
      console.error("Error registering user:", error);
      res.status(500).send("Internal Server Error");
   }
   
})

app.post("/login", async (req, res) => {
   console.log(req.body);

   if (req.body.password && req.body.email) {
      let result = await User.findOne(req.body).select("-password")
      if (result) {
         res.send(result)
      } else {
         res.send({ result: "no user found" })
      }

   } else {
      res.send({ result: "no user found" })
   }
})

app.post("/add-product", async (req, res) => {
   let product = new Product(req.body)
   let result = await product.save()
   res.send(result)  
})

app.get("/products",async (req,res)=>{
   let products = await Product.find()
   if(products.length > 0){
      res.send(products)
   }else{
      res.send({result:"no products found"}) 
   }
})
app.delete("/product/:id", async(req,res)=>{
   const result = await Product.deleteOne({_id:req.params.id}) 
   res.send(result) 
})

app.get("/product/:id", async (req,res)=>{
   let result = await Product.findOne({_id:req.params.id})
   if(result){
      res.send(result)
   }else{
      res.send({result:"No record Found"})
   }

})

app.put("/product/:id", async (req,res)=>{
   let result = await Product.updateOne(
      { _id:req.params.id },
      {
         $set:req.body
      }
   )
   res.send(result)
})

app.get("/search/:key", async (req,res)=>{
   let result = await Product.find({
      "$or":[
         {name:{$regex:req.params.key}},
         {company:{$regex:req.params.key}},
         {category:{$regex:req.params.key}}  
      ]
   })
   res.send(result) 
})


app.listen(port, () => {
   console.log(`server are listen on port ${port}`);
})