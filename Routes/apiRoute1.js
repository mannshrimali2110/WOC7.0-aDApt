const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    
    console.log('Welcome to the Home Page');
    res.send("<h1>WELCOME TO WINTER OF CODE<h1>");
})

module.exports = router;