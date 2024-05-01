const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const mysql = require('mysql');

//indirizzo di MYSQL se non si specifica la porta di default sara 3306
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_utenti_js_to_ang"
});

// Repository
var utenti = [];

// PLUG IN DI SICUREZZA CROSS-ORIGIN-RESOURCE-SHARING
app.use(cors());

// formato contenuto body:se false(stringa/array) se true qualunque tipo di valore 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

con.connect(function (err) {
    if (err) throw err;
    console.log("Connessione ok!");
});

app.post('/login', (req, res) => {
  const utente = req.body;
  var username = utente.username;
  var password = utente.password;
  var token = false;
  var sql = "SELECT * FROM utenti where username=? and password=?";
  var values = [username,password];
  con.query(sql,values, function (err, result) {
      if (err) throw err;
      if(result[0].username==username && result[0].password==password){
          token = true+","+result[0].ruolo;
      }
      res.send(JSON.stringify(token));
  });
});
app.post('/loginUtenti', (req, res) => {
  const account = req.body;
  var username = account.username;
  var password = account.password;
  var token = false;
  var sql = "SELECT * FROM utenti where username=? and password=?";
  var values = [username,password];
  con.query(sql,values, function (err, result) {
      if (err) throw err;
      if(result[0].username==username && result[0].password==password){
          token = true;
      }
      res.send(JSON.stringify(token));
  });
});

app.post('/insertSec', (req, res) => {
    const utente = req.body;
    var insertSql = "insert into utenti (id, nome, cognome,dataNascita,luogoNascita,cf,ruolo,stipendio,username,email,password,settore) values (?)";
    var values = [[utente.id, utente.nome, utente.cognome,utente.dataNascita,utente.luogoNascita,utente.cf,utente.ruolo,utente.stipendio,utente.username,utente.email,utente.password,utente.settore]];
    con.query(insertSql, values);
    res.send('utente inserito con successo');
});
   
app.get('/visualizza', (req, res) => {
    var sql = "SELECT * FROM utenti";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
app.get('/ruoli', (req, res) => {
  var sql = "SELECT * FROM ruoli";
  con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
  });
});
app.get('/settori', (req, res) => {
  var sql = "SELECT * FROM settori";
  con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
  });
});
app.get('/titoli', (req, res) => {
  var sql = "SELECT * FROM titoli";
  con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
  });
});
function getMonthCustom(data){
  if(data.getMonth() < 10){
      return "0"+(data.getMonth()+1);
  } else if(data.getMonth() == 0){
      return "01";
  } else {
      return data.getMonth()+1;
  }
}

function getDateCustom(data){
  if(data.getDate() < 10){
      return "0"+data.getDate();
      } else {
          
      return data.getDate();
  }
}

app.get("/userSql/:id", function (req, res) {
    var utente = {};
    const id = req.params.id;
    var sql = "SELECT * FROM utenti WHERE id=?";
    var value = id;
    con.query(sql, value, function (err, result) {
      if (err) throw err;
      shortDate = `${result[0].dataNascita.getFullYear()}-${getMonthCustom(result[0].dataNascita)}-${getDateCustom(result[0].dataNascita)}`;
      for (var x = 0; x < result.length; x++) {
        if (result[x].id == id) {
          utente = {
            id: result[x].id,
            nome: result[x].nome,
            cognome: result[x].cognome,
            dataNascita: shortDate,
            luogoNascita: result[x].luogoNascita,
            cf: result[x].cf,
            stipendio: result[x].stipendio,
            username: result[x].username,
            password: result[x].password,
            settore: result[x].settore,
            ruolo: result[x].ruolo,
            email: result[x].email

          };
          break;
        }
      }
      const stringaJSON = JSON.stringify(utente);
      res.send(stringaJSON);
    });
  });
  
  app.get("/mediaStipendio", function (req, res) {
    var sql = "SELECT AVG(stipendio) as media_stipendio from utenti ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result[0].media_stipendio));
    });
    
  });
  app.get("/totStipendi", function (req, res) {
    var sql = "SELECT SUM(stipendio) as somma_stipendio from utenti ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result[0].somma_stipendio));
    });
  });
  app.get("/minStipendio", function (req, res) {
    var sql = "SELECT MIN(stipendio) as min_stipendio from utenti ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result[0].min_stipendio));
    });
  });
  app.get("/maxStipendio", function (req, res) {
    var sql = "SELECT MAX(stipendio) as max_stipendio from utenti ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result[0].max_stipendio));
    });
  });

  app.delete("/deleteUser/:id", function (req, res) {
    const id = req.params.id;
    var sql = "DELETE FROM utenti WHERE id = ?";
    var value = id;
    con.query(sql, value, function (err, result) {
      if (err) throw err;
      res.send(JSON.stringify("Utente cancellato con successo!"));
    });
  });

  app.get("/test", function (req, res) {
    console.log("prova");
    res.send(JSON.stringify("Utente cancellato con successo!"));
  });
   
  app.put("/updateUser", (req, res) => {
    const utente = {};
    var sql =
      "UPDATE utenti SET nome=?, cognome=?, dataNascita=?, luogoNascita=?, cf=?, stipendio=?, username=?, password=?,ruolo=?,settore=?,email=? WHERE id=?";
      var values = [
      utente.id,
      utente.nome,
      utente.cognome,
      utente.dataNascita,
      utente.luogoNascita,
      utente.cf,
      utente.stipendio,
      utente.username,
      utente.password,
      utente.ruolo,
      utente.settore,
      utente.email
    ];
    con.query(sql, values);
    res.send(JSON.stringify("Utente modificato con succcesso"));
  });

  //INIZIO IMPAGINAZIONE
app.get('/pagination/:pagina', function (req, res) {
  var sql = "SELECT * FROM utenti";
  var pagina = req.params.pagina;
  var nPagine = 0;
  var nVisualizzati = 3;
  if(pagina<1){
      pagina=1;
  }
  con.query(sql, function (err, result) {
      if (err) throw err;
      if(result.length%3==0){
          nPagine=result.length/3;
      }else{
          nPagine=Math.round((result.length/3)+1);
      }
      if(pagina>nPagine){
          pagina = nPagine;
      }
      var offset = (pagina-1)*nVisualizzati;
      var limit = offset+nVisualizzati;
      var listaImp = [];
      con.query(sql, function (err, result) {
          if (err) throw err;
          for(var i=offset; i<limit && i<result.length; i++){
              listaImp.push(result[i]);
          }
          res.send(JSON.stringify(listaImp));
      });
  });
});

app.get('/dimProdotti', function (req, res) {
  var sql = "SELECT * FROM utenti";
  var nPagine = 0;
  con.query(sql, function (err, result) {
      if (err) throw err;
      if(result.length%3==0){
          nPagine=result.length/3;
      }else{
          nPagine=Math.round((result.length/3)+1);
      }
      res.send(JSON.stringify(nPagine));
  });
});
//FINE IMPAGINAZIONE

function getId() {
    let id = 0;
    let prodottiId = [];
    if (prodotti.length == 0) {
        id = 1;
    } else if (prodotti.length == 1) {
        id = prodotti[0].id + 1;
    } else {
        prodottiId = prodotti.map((p) => p.id);
        id = prodottiId.sort().reverse()[0] + 1;
    }
    return id;
}
//comando per aprire la porta indicata sopra a tutto 
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))