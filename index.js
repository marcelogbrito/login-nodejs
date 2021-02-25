//index.js
(async () => {
  const database = require("./db");
  const Login = require("./login");

  try {
    const resultado = await database.sync();
    console.log(resultado);

    const resultadoCreate = await Login.create({
      login: "boss",
      nome: "Vito",
      sobrenome: "Corleone",
      senha: "godfather",
    });
    console.log(resultadoCreate);

    //ler todos os suuparios
    const logins = await Login.findAll();
    console.log(logins);

    // read 1 usuario
    const login = await Login.findByPk(1);
    console.log(login);

    //update
    const login = await Login.findByPk(1);
    //console.log(produto);
    login.nome = "padrinho";
    const resultadoSave = await login.save();
    console.log(resultadoSave);

    // delete
    const loginDelete = await Login.findByPk(1);
    loginDelete.destroy();
  } catch (error) {
    console.log(error);
  }
})();
