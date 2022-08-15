const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);


test("return json", () => {
    api.get("/api/stores")
        .expect(200)
        .expect("Content-Type", '/application\/json/')

});