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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server started at localhost:${PORT}`);
});