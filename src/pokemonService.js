const fetch = require("node-fetch");

class pokemonService {
  temporalChane;

  async getPokemon(id) {
    const URI = " https://pokeapi.co/api/v2/pokemon/" + id;
    //console.log(URI);
    const response = await fetch(URI);
    //console.log(response.status);
    if (response.status == 404) {
      return {};
    } else {
      const data = await response.json();
      //console.log(data);
      var pokemon = {
        name: data.forms[0].name,
        height: data.height,
        weight: data.weight,
        id: data.id,
        stats: this.getStats(data),
      };
      return pokemon;
    }
    //console.log(pokemon.stats);
  }

  getStats(data) {
    var stats = data.stats;
    var arrayStats = [];
    stats.forEach((element) => {
      arrayStats.push(element.stat.name + "=" + element.base_stat);
    });
    return arrayStats;
  }

  async getEvolutions(id) {
    const URI = "https://pokeapi.co/api/v2/evolution-chain/" + id;
    //console.log(URI);
    const response = await fetch(URI);
    const data = await response.json();
    this.temporalChane = data.chain;
    var evolutionsArray = [];
    do {
      evolutionsArray.push(this.temporalChane.species.name);
    } while (this.comprobationEvolution());

    return evolutionsArray;
  }

  comprobationEvolution() {
    if (this.temporalChane.evolves_to != "") {
      this.temporalChane = this.temporalChane.evolves_to[0];
      return true;
    } else {
      return false;
    }
  }
}

module.exports = pokemonService;
