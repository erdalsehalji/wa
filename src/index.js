let studenti = [ 
 {oib: "12312349172", ime: "Hrvoje", prezime: "Horvat"}, 
 {oib: "82723412342", ime: "Ivana", prezime: "Ivić"}, 
 {oib: "97283742342", ime: "Stjepan", prezime: "Stjepanović"},
 ]
 

function svistudenti(item) {
  let studenti_1 = [item.ime, item.prezime, item.oib].join(" ");
  return studenti_1
}

let rezultat = studenti.map(svistudenti);


console.log(rezultat) 

// ["Hrvoje Horvat (12312349172)", "Ivana Ivić (82723412342)", "Stjepan Stjepanović (97283742342)"]

/*let rezultat = studenti.map( pod =>({
  ime: pod.ime,
  prezime: pod.prezime,
  oib: pod.oib,
  
})) 
*/