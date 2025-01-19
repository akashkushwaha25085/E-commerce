const mongoose = require("mongoose")


   mongoose.connect('mongodb://localhost:27017/e-commerce')
      .then(() => {
         console.log("Database  connect....");
      })
      .catch((error) => {
         console.log("database  disconected..... ", error);
      })
