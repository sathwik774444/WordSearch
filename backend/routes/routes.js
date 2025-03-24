const express = require('express');
const router = express.Router();

const user = require('../model/schema');

//get done
router.get('/get/:word', async(req, res) => {
    const users = await user.find({}); 
    const messageObj = users.find((s)=>  s.word === req.params.word);
    if(messageObj)
    {
        // console.log(req.params.word); 
        res.status(200).json(messageObj.message);
    }
    else{
        res.status(404).json({ message: "Word not found" }); 
    } 
}); 

// post done
router.post('/send' , async(req , res)=>{
    try{
        const newtuple = new user({word : req.body.word , message : req.body.message});
        await newtuple.save();
        res.status(200).json({
            success : true,
            user : newtuple
        });
    }catch(error)
    {
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
});

// router.put('/a' , async(req , res) =>{
//     console.log('put');
//     const find = { word : req.body };
//     try{
//         const updateuser = await user.findOne(find);
//         if(!updateuser){
//             res.json({
//                 message : " User Not found"
//             })
//         }
//         console.log( updateuser.message );
//         res.status(200).json({
//             success : true,
//             user : updateuser
//         })
//     }
//     catch(error)
//     {
//         res.status(500).json({
//             success : false,
//             message : error.message
//         })
//     }
// });

module.exports = router;