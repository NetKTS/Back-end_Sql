const express = require("express");
const cors = require("cors");
const app = express();
const tutorialRouter = require("./app/routes/tutorial.routers")
var corsOptions={
    orgin:"http://localhost:8082"
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res) =>{
    res.json({
        message:"Welcome to Kittisak application",
    })
});

app.use("/api/tutorial",tutorialRouter)

const PORT = 8083;
app.listen(PORT,()=>{
    console.log(`Server is running !!! on port:${PORT}`)
});