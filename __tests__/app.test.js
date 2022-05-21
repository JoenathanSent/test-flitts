const request = require("supertest");
const app = require("../app");
const { Users } = require("../models");

let access_token = "";

beforeAll(() => {
  const data = {
    email: "emailfiktif@gmail.com",
    name: "akunfiktif",
    password: "fiktif",
  };
  Users.create(data);
});

describe("customer register feature", () => {
  test("register success", (done) => {
    let registerParams = {
      email: "testing@gmail.com",
      name: "testapaja",
      password: "testpasswordbebas",
    };
    request(app)
      .post("/user/register")
      .send(registerParams)
      .then((res) => {
        console.log("INI ERRORNYA");
        console.log(res.error);
        expect(res.status).toBe(201);
        expect(res.body.email).toBe(registerParams.email);
        expect(res.body.name).toBe(registerParams.name);
        expect(res.body.message).toEqual("Success create account");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("display err message if no input for email and / or name is given", (done) => {
    let registerParams = {
      email: null,
      name: null,
      password: "testpasswordbebas",
    };
    request(app)
      .post("/user/register")
      .send(registerParams)
      .then((res) => {
        expect(res.body.message).toContain("PLEASE INSERT NAME");
        expect(res.body.message).toContain("PLEASE INSERT EMAIL");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("display err message if no input for password is given", (done) => {
    let registerParams = {
      email: "masihtesting@gmail.com",
      name: "cumatesting",
      password: null,
    };
    request(app)
      .post("/user/register")
      .send(registerParams)
      .then((res) => {
        expect(res.body.message).toContain("PLEASE INSERT PASSWORD");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("display err message if input for email is not a valid email format", (done) => {
    let registerParams = {
      email: "masihtesting",
      name: "cumatestingASALAN",
      password: "passtestaja",
    };
    request(app)
      .post("/user/register")
      .send(registerParams)
      .then((res) => {
        expect(res.body.message).toContain("Not a valid email format");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("display err message if input for email is not unique / already registered", (done) => {
    let registerParams = {
      email: "testing@gmail.com",
      name: "testapajaABALH",
      password: "passtestaja",
    };
    request(app)
      .post("/user/register")
      .send(registerParams)
      .then((res) => {
        expect(res.body.message).toContain("email must be unique");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("display err message if input for name is an empty string", (done) => {
    let registerParams = {
      email: "",
      name: "",
      password: "passtestaja",
    };
    request(app)
      .post("/user/register")
      .send(registerParams)
      .then((res) => {
        expect(res.body.message).toContain("PLEASE INSERT EMAIL");
        expect(res.body.message).toContain("PLEASE INSERT NAME");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("display err message if input password is an empty string", (done) => {
    let registerParams = {
      email: "testlagiahahahhaah@gmail.com",
      name: "nameabal",
      password: "",
    };
    request(app)
      .post("/user/register")
      .send(registerParams)
      .then((res) => {
        expect(res.body.message).toContain("PLEASE INSERT PASSWORD");
        expect(res.status).toBe(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("customer login feature", () => {
  test("success login", (done) => {
    request(app)
      .post("/user/login")
      .send(payload)
      .then((res) => {
        console.log("RES BODY LOGIN");
        console.log(res.body);
        expect(res.body).toHaveProperty("access_token");
        access_token = res.body.access_token;
        expect(res.body.message).toContain("Success Login");
        expect(res.status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("wrong input for password", (done) => {
    const payload = {
      email: "testing@gmail.com",
      password: "testpasswordbs",
    };
    request(app)
      .post("/user/login")
      .send(payload)
      .then((res) => {
        expect(res.body.message).toContain("Wrong username / password");
        expect(res.status).toBe(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("username not found", (done) => {
    const payload = {
      email: "testapa",
      password: "testpasswordbebas",
    };
    request(app)
      .post("/user/login")
      .send(payload)
      .then((res) => {
        expect(res.body.message).toContain("Wrong username / password");
        expect(res.status).toBe(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

afterAll(async () => {
  await Users.destroy({
    where: {},
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
