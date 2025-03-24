const express = require('express');
const cors = require('cors');
const connectdb = require('./db');
const route = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(cors());
connectdb();

app.use('/' , route);

app.get('/' , (req , res)=>{
    res.send({message : "This is message from back end"});
});

app.listen(process.env.port , ()=>{
    console.log(`server started at localhost:${process.env.port}`);
}
);