const logger = require('../utils/logger');
const express = require('express');
const Store = require("../models/store");

async function search  (req) {
    let {q , h, filter, sort, dir, skip, max, totals, count, metafields, 
        groupby  , aggregate, format, apikey, idtolink, flatten, referencedby , 
        fetchmediadata, fetchchildren,  page, limit  }  = req.query; 

        arrayConsult = [
          {"$limit" : page + limit | 1000},
          { "$sort" : (sort) ? sort : { "_id" : 1 } }
        ];
        arrayCount = {};
        if(q){
          arrayConsult.push( {"$match":   JSON.parse(q) });
          arrayCount = q ;
        }
        arrayConsult.push( { 
          "$project": {
           "ID": "$_id",
            "Comercio": "$trade" ,
            "CUIT": "$cuit",
            "Conceptos": {"$sortArray": { input : "$concepts",sortBy: { name: 1 } } },
            "Balance actual": { price:{ display: "$currentBalance", approx: 9.9900000000000002, currency: "USD" } }, 
            "Activo" : {"$switch" : { branches: [{ case : true , then: 'Sí' },{ case : false , then: 'No' }]}},
            "Última venta": {"$dateToString" : {  format: "%Y-%m-%d %H:%M", date: "$lastSale"  }} ,
          }
        });
    const conteo =  await Store.countDocuments(arrayCount);
    let  b ;
    await Store.aggregate(arrayConsult, (err, data)=>{
      if(err){return res.status(400).json({message:"Can not perform find operation.", error: err }); }
      console.log(data);
      return b =  { 
        "data" : data,
        "page" : page | 1,
        "limit" : limit| 1000,
        "total": data.length
      };
    });
    b.pages = Math.ceil(conteo / (limit|1000));
    return b;
}


module.exports = {
    search
};