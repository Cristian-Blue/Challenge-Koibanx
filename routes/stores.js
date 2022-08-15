const logger = require('../utils/logger');
const express = require('express');
const router = express.Router();
const Store = require("../models/store");
const { body, validationResult } = require('express-validator');
const { search } = require ("../controller/route");

router.route('/stores')
  .get((req, res , next)=>{
    const data=   search(req);
    data.then(ndata=>{
      res.status(200).json(ndata);
    })
    
  },(req, res)=>{    
    res.status(200).send("store");
  });


  router.route('/postStore'
    ).post(
    body("name").isString(),
    body("cuit").isString(),
    body("concepts").isArray(),
    body("currentBalance").isNumeric(),
    body("active").isBoolean(),
    body("lastSale").isDate(),
    body("trade").isString(),
      (req, res, next)=>{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ msg: 'Datos Errroneos', data: [], errors: errors.array() });
      }
      next();
  },(req, res)=>{    
    let data = req.body;
    let newStore = new Store({
      name: data.name,
      cuit: data.cuit,
      concepts: data.concepts,
      currentBalance: data.currentBalance,
      active: data.active,
      lastSale:  data.lastSale,
    });
    newStore.save();
    res.end(); 
    res.status(200).json({data: 'Datos guardados' ,success: true});
  });

module.exports = router;
