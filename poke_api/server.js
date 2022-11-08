const fs = require("fs");
const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.get("/listapokemones", (req, res) => {
  setTimeout(() => {
    console.log("3");
    res.sendFile(__dirname + "/lista_pokemones.txt");
  }, "2000");
});

app.get("/", (req, res) => {
  function recolectarPokemones() {
    return (myPromise = new Promise((resolve) => {
      let pokemones = [];
      fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then((response) =>
        response.json().then((data) => {
          console.log("2");
          data.results.forEach((pokemon) => {
            let name = pokemon.name;
            let urllist = pokemon.url.split("/");
            let urlphoto = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${urllist[6]}.png`;
            pokemones.push({ nombre: name, foto: urlphoto });

            if (pokemones.length == 150) {
              resolve(pokemones);
            }
          });
        })
      );
    }));
  }

  async function imprimirArreglo() {
    console.log("calling");
    var result = await recolectarPokemones();
    result = JSON.stringify(result);
    // console.log(result);

    fs.writeFile("lista_pokemones.txt", result, function (err) {
      if (err) throw err;
      console.log("saved!");
    });
  }

  imprimirArreglo();

  res.sendFile(__dirname + "/index.html");
  console.log("1");

  // subirhtml();
  setTimeout(() => {
    console.log("4");
    res.end();
  }, "7000");
});

app.listen(3000);
