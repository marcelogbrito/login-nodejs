const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Login = require("./login");

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.listen(process.env.PORT || 3000, function () {
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
  Login.findOne({ where: { login: req.body.login } }).then((login) => {
    if (login === null) {
      res.send("<h1>login incorreto</h1> <a href='/'>Tentar novamente</a>");
    } else {
      Login.findAll().then((results) =>
        res.render("show.ejs", { data: results })
      );
    }
  });
});

//update
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
      login.nome = req.body.nome;
      login.sobrenome = req.body.sobrenome;
      login.login = req.body.login;
      login.senha = req.body.senha;
      login.save().then(res.redirect("/show"));
    });
  });

//deletar
app.route("/delete/:id").get((req, res) => {
  var id = req.params.id;

  Login.findByPk(id).then((login) =>
    login.destroy().then(res.redirect("/show"))
  );
});
