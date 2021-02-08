const header = document.querySelector("div h1");
const medieUrl = "https://babushka-dd8a.restdb.io/media/";
const myHeaders = {
    'x-apikey': "600ec2fb1346a1524ff12de4"
}
document.addEventListener("DOMContentLoaded", start);
let personer;
let filter = "alle";


// Første funktion der kaldes efter DOM er loaded
function start() {
    const filterKnapper = document.querySelectorAll("nav button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerPersoner));
    loadJSON();
}


// eventlistener knyttet til knapperne der vælger hvilket filter der er aktivt
function filtrerPersoner() {
    filter = this.dataset.kategori; //sætter variabel "filter" til værdien af data-kategori på den knap der er klikket på
    document.querySelector(".valgt").classList.remove("valgt"); //fjern den nuværende aktive klasse på knap
    this.classList.add("valgt"); //tilføj class og markør knap, der bliver klikket på
    visPersoner(); //kalder funktionen visPersoner efter det nye filter er bestemt
    header.textContent = this.textContent; // Ændr overskrift alt efter hvilket filter der er aktivt

}



async function loadJSON() {
    const JSONData = await fetch("https://babushka-dd8a.restdb.io/rest/menu", {
        headers: myHeaders
    });
    personer = await JSONData.json();
    console.log("Personer", personer);
    visPersoner();
}

// Funktion der viser personer i liste-view
function visPersoner() {
    const dest = document.querySelector(".data-container"); //container til articles med en person
    const skabelon = document.querySelector("template").content; //select indhold af html-skabelon (article)
    dest.textContent = ""; // rydder container inden nyt loop
    personer.forEach(person => {
        console.log("Kategori", person.kategori);
        // loop igennem json (personer)
        // Tjek hvilken tro personen har og sammenlign med aktuelt filter eller vis alle, hvis filter har værdien "alle"
        if (filter == person.kategori || filter == "alle") {
            const klon = skabelon.cloneNode(true);
            klon.querySelector(".navn").textContent = person.navn;
            klon.querySelector(".kortbeskrivelse").textContent = person.kortbeskrivelse;
            klon.querySelector(".pris").textContent += `${person.pris} kr.`;
            klon.querySelector(".billede").src = medieUrl + person.billede;
            dest.appendChild(klon);
        }
    })
}
