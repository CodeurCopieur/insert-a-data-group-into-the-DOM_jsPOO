// Utilisation de l'API Fetch
var lesMails = document.querySelector(".email"); //Pour afficher les emails
var agenceName = document.querySelector(".nom_de_lagence"); // Pour afficher les noms d'agences selectionnées avec select
var leSelecteur = document.getElementById('infos'); // Le selecteur HTML

var size =20


class insertData {

  #file

  constructor(data) {
    this.#file = data;
    this.insertGroups = this.insertGroups.bind(this);
  }

  getData() {

    try {
      fetch(this.#file)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(allAgencies => {
    
        this.insertGroups(0, allAgencies);
    
        leSelecteur.addEventListener('change', function (e) {

          if (this.selectedIndex === 0) {
            agenceName.innerHTML = "";
            lesMails.innerHTML = "";
            return
          }
          if (this.selectedIndex === 1) {
            agenceName.innerHTML = allAgencies[0].AGENCES;
            lesMails.innerHTML = allAgencies[0].Adresse_mail;
          } else {
            agenceName.innerHTML = allAgencies[this.selectedIndex - 1].AGENCES;
            lesMails.innerHTML = allAgencies[this.selectedIndex - 1].Adresse_mail;
          }
        });
      })
    } catch (error) {
      console.error('Fetch error: ', error);
    }

  }

  insertGroups(start, data){
    var indexEnd = Math.min(start + size, data.length)
    var lesAgences = data.slice(start, indexEnd)


    lesAgences.forEach( function(agence) {
        leSelecteur.innerHTML += '<option>' + agence.AGENCES + '</option>';
    } )

    if (indexEnd < data.length) {
        setTimeout(() => {
            this.insertGroups(indexEnd, data)
        }, 100)
    }

}

}




addEventListener('load', ()=> {
  new insertData('./all_agencies.json')
    .getData()
})


