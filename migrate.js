const Etudiant = require("./Etudiant")

console.log("Run migration")

Etudiant.sync({force:true})