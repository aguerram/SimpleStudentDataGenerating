const Etudiant = require("./Etudiant");
const regions = require("./regions.json");
const names = require("./names.json");
const lastNames = require("./lastNames.json");
const filieres = require("./filieres.json");
const event = require("./eventArchi")
function getRandomRegion() {
  let index = Math.round(Math.random() * (regions.length - 1));
  let r = regions[index];
  event.emit("region",r)
  return r
}
function getRandomFiliere() {
  let index = Math.round(Math.random() * (filieres.length - 1));
  let f =  filieres[index];
  event.emit("region",f)
  return f;
}
function getRandomName() {
  let index = Math.round(Math.random() * (names.length - 1));
  let n =  names[index];
  event.emit("name",n)
  return n;
}
function getRandomLastName() {
  let index = Math.round(Math.random() * (lastNames.length - 1));
  let ln =  lastNames[index];
  event.emit("lname",ln)
  return ln;
}
function getRandomNote() {
  let note = parseFloat((Math.random() * 7 + 12).toFixed(2));
  event.emit("note",note)
  if (note > 18) {
    let allowThisNote = Math.random() * 10 > 8;
    if (allowThisNote) return note;
    return getRandomNote();
  }
  return note;
}
function getRandomMarskAll() {
  let noteBac = parseFloat(getRandomNote());
  let notes = {};
  let isWorkingHard = Math.random() * 10 > 5;
  let check = 20 - noteBac;
  if (check > 3) {
    check = 3;
  }
  for (let i = 1; i <= 4; i++) {
    let toAdd = Math.random() * check;
    if (!isWorkingHard) {
      toAdd *= -1;
    }
    let n = parseFloat((noteBac + toAdd).toFixed(2));
    if (n > 18) n = getRandomNote();
    notes[`noteS${i}`] = n;
  }

  let ns =  {
    noteBac,
    ...notes,
  };

  event.emit("ns",ns)
  return ns
}
function getRandomAge() {
  return 19 + Math.round(Math.random() * 5);
}
function getRandomRedoublement(notes, age) {
  let r = {
    redoublement1er: false,
    redoublement2eme: false,
  };
  if (age == 19) return r;
  let total =
    (notes.noteBac +
      notes.noteS1 +
      notes.noteS2 +
      notes.noteS3 +
      notes.noteS4) /
    5;
  if (total >= 15) {
    r.redoublement1er = Math.random() * 5 > age - 19;
    event.emit("redoublement",r)
    return r;
  }
  r.redoublement1er = Math.random() * 20 > total;
  if (age == 20 && r.redoublement1er) {
  } else {
    r.redoublement2eme = Math.random() * 20 > total;
  }
  event.emit("redoublement",r)
  return r;
}
module.exports = async () => {
  for(let year = 2010;year<=2015;year++)
  {
    for (let et = 0; et < 3000; et++) {
    await create(year);
    console.log(`Students ${et} year ${year}`)
  }
  }
};

async function create(year) {
  let notes = getRandomMarskAll();
  let age = getRandomAge();
  let etudiant = {
    nom: getRandomName(),
    prenom: getRandomLastName(),
    annee: year,
    ...notes,
    age,
    ...getRandomRedoublement(notes, age),
    preselection: false,
    admis: false,
    filiere: getRandomFiliere(),
    region: getRandomRegion(),
  }
  event.on("keepGoing",()=>{
    return Etudiant.create(etudiant);
  })
  event.on("fixes",(data)=>{
    return Etudiant.create({...etudiant,...fixes});
  })
}
