const express = require("express")
const cors = require('cors')
require("./db/config.js")
const User = require("./db/User.js")
const Product = require("./db/Product.js")

const app = express()
const port = 5000;

app.use(express.json())
app.use(cors())



app.post("/register", async (req, res) => {
   let user = new User(req.body)
   let result = await user.save()
   result = result.toObject()
   delete result.password
   res.send(result)
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

app.listen(port, () => {
   console.log(`server are listen on port ${port}`);
})