const Store = require("./models/store");
const mongoose = require("mongoose");
const {faker} = require('@faker-js/faker');
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');

let storesSave =[];
for(let i = 0 ;  i <= 100 ; i++){
    let a =    Math.floor(Math.random() * 5);
    let concepts =[];
    for(let j =  0 ; j <=  a ; j++ ){
        concepts.push(faker.commerce.productDescription() );
    }
    storesSave.push(new Store({
        name: faker.name.fullName(),
        cuit: faker.commerce.product(),
        concepts: concepts,
        currentBalance: faker.finance.account(10),
        active: (i%3),
        lastSale:  faker.date.betweens() ,
        trade : faker.commerce.department()
    }));
}
    

mongoose.connect('mongodb://' + config.get('mongodb.address') + '/' + config.get('mongodb.dbname'), { useNewUrlParser: true, useUnifiedTopology: true });
//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically
storesSave.map(async (p, index) => {
  await p.save((err, result) => {
    if (index === storesSave.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});