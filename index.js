const pokemonService = require("./src/pokemonService");
const pokemonServiceObj = new pokemonService();

function askId() {
  console.log("Escribe el id del Pokemon");
  var id = process.openStdin();
  try {
    id.addListener("data", async function (d) {
      d = d.toString().trim();
      id = parseInt(d, 10);
      //console.log(id);

      if (Number.isInteger(id)) {
        const pokemon = await pokemonServiceObj.getPokemon(id);
        if (pokemon.name != undefined) {
          console.log("Pokemon Name:" + pokemon.name);
          console.log("Pokemon Height: " + pokemon.height + " kls");
          console.log("Pokemon Weight: " + pokemon.weight + " cms");
          console.log("Pokemon Id: " + pokemon.id);
          console.log("Pokemon Stats: " + pokemon.stats);

          const evolutions = await pokemonServiceObj.getEvolutions(id);
          console.log("Pokemon Evolutions: " + evolutions);
          console.log(
            "Fin del servicio, para otra consulta sube de vuelta el servicio con el comando <node index.js>"
          );
          process.exit(1);
        } else {
          console.log("Id no existe");
          process.exit(1);
        }
      } else {
        console.log("Digite un Id valido");
        process.exit(1);
      }
    });
  } catch (error) {
    console.log("Error: " + error);
  }
}
askId();
