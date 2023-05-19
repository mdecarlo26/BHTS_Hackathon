const router = require('express').Router();
const {getAccountInfo,getShoppingHistory,getSemesterInfo,getAllInfo_fromAcct,getBalanceHistory} =require('../db/query');

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

router.get('/all/:uuid',(req,res) => {
    getAllInfo_fromAcct(req.params.uuid).then((output) => {
        res.json(output.rows);
    }).catch((err)=>{
        res.status(500).json(err)
    });
})

router.get('/semester/:uuid',(req,res) => {
    getSemesterInfo(req.params.uuid).then((output) => {
        res.json(output.rows[0]);
    }).catch((err)=>{
        res.status(500).json(err)
    });
})

router.get('/balance/:uuid',(req,res) => {
    getBalanceHistory(req.params.uuid).then((output) => {
        res.json(output.rows);
    }).catch((err)=>{
        res.status(500).json(err)
    });
})

module.exports=router;
