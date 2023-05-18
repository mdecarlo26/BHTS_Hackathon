const router = require('express').Router();
const {getAccountInfo,getShoppingHistory} =require('../db/query');

router.get('/account/:uuid',(req,res) => {
    getAccountInfo(req.params.uuid).then((output) => {
        res.json(output.rows[0]);
    }).catch((err)=>{
        res.status(500).json(err)
    });
});

router.get('/history/:uuid',(req,res) => {
    getShoppingHistory(req.params.uuid).then((output) => {
        res.json(output.rows);
    }).catch((err)=>{
        res.status(500).json(err)
    });
})

module.exports=router;
