import express from "express"
import connectToDb from "./config/db.js";

connectToDb();
const app =express();
app.get("/",(req,res) =>{
  res.send("Api is runnig")
});

app.listen(9000,()=>{
  console.log(`Api is running on http://localhost:9000`);
  
})