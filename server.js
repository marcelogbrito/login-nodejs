const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Login = require("./login");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.listen(3000, function () {
  console.log("servidor rodando na porta 3000");
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/registrar", (req, res) => {
  res.render("registro.ejs");
});

app.post("/show", (req, res) => {
  Login.create(req.body).then(res.redirect("/show"));
});

app.get("/show", (req, res) => {
  Login.findAll().then((results) => res.render("show.ejs", { data: results }));
});

app.post("/realizarlogin", (req, res) => {
  console.log(req.body.login);
  const login = Login.findOne({ where: { login: req.body.login } });
  if (login === null) {
    res.send("login incorreto");
  } else {
    Login.findAll().then((results) =>
      res.render("show.ejs", { data: results })
    );
  }
});

app
  .route("/edit/:id")
  .get((req, res) => {
    var id = req.params.id;
    Login.findByPk(id).then((results) =>
      res.render("edit.ejs", { data: results })
    );
  })
  .post((req, res) => {
    Login.findByPk(req.params.id).then((login) => {
      login.nome = req.params.nome;
      login.sobrenome = req.params.sobrenome;
      login.login = req.params.login;
      login.senha = req.params.senha;
      login.save().then(res.redirect("show"));
    });
  });
