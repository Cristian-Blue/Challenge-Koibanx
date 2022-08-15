const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);


describe("Test for get Data", ()=>{
    test("return json", () => {
        api.get("/api/stores")
            .expect(200)
            .expect("Content-Type", '/application\/json/')
    });
})

describe("Test for get Data", () =>{
    test("return Json create" , () =>{
        const send  = {
            "name": "nombre",
            "cuit" : "cuit",
            "concepts" : ["primer", "segundo"],
            "currentBalance" : 5,
            "active" : true,
            "lastSale" : Date.now(),
            "trade"  : "trade"
        };
        api.post("/api/postStore").set(send)    
            .expect(200)
            .expect("Content-Type", '/application\/json/')
    })
});