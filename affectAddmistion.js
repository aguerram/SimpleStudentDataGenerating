const filieres = require("./filieres.json");
const Etudiant = require("./Etudiant");
const Sequelize = require("sequelize");
let limit = {
  2010: 100,
  2011: 110,
  2012: 120,
  2013: 130,
  2014: 130,
  2015: 130,
  2016: 130,
  2017: 130,
  2018: 140,
  2019: 140,
  2020: 140,
};
module.exports = async () => {
  for (let year = 2010; year <= 2020; year++) {
    for (let f of filieres) {
      let list = await Etudiant.findAll({
        where: {
          annee: year,
          filiere: f,
          preselection:true
        },
        limit: Math.round(year % 2000) * 10,
        order: Sequelize.literal(
          "(noteBac+noteS1+noteS2+noteS3+noteS4)/2 desc"
        ),
      });
      let accepting = Math.round(Math.random() * 7 + 1);
      console.log(`Accepting ${accepting}`);
      for (let i = 0; i < accepting; i++) {
        let index = Math.round(Math.random() * (list.length - 1));
        list[index].admis = true;
        list[index].save()
      }
    }
  }
};
