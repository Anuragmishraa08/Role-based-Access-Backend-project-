const express =reqiure("express");
const dotenv  =require("dotenv").config();
const dbconnect =require("./config/dbConnect");
const authRoutes =require("./routes/authRoutes");
const userRoutes = require ("./routes/userroutes");
dbconnect();
const app =express();
//middleware
app.use(express.json());

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);

//start the server 
const PORT =process.env.PORT|| 7002;
app.listen(PORT,()=>{
    console.log(`Server is running at port${PORT}`);
});