let topNav = document.querySelector('.top_nav');
window.addEventListener("scroll", function (skiftFarve) {
    skiftFarve.preventDefault();
    if (window.scrollY < 900) {

        topNav.style.backgroundColor = "transparent";
    } else {
        topNav.style.backgroundColor = "black";
        topNav.style.transitionDuration = "1s";
    }
});

const header = document.querySelector("div h1");
const medieUrl = "https://babushka-dd8a.restdb.io/media/";
const myHeaders = {
    'x-apikey': "600ec2fb1346a1524ff12de4"
}
document.addEventListener("DOMContentLoaded", start);
let retter;
let filter = "alle";


// Første funktion der kaldes efter DOM er loaded
function start() {
    const filterKnapper = document.querySelectorAll("nav button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerRetter));
    loadJSON();
}


// eventlistener knyttet til knapperne der vælger hvilket filter der er aktivt
function filtrerRetter() {
    filter = this.dataset.kategori; //sætter variabel "filter" til værdien af data-kategori på den knap der er klikket på
    document.querySelector(".valgt").classList.remove("valgt"); //fjern den nuværende aktive klasse på knap
    this.classList.add("valgt"); //tilføj class og markør knap, der bliver klikket på
    visRetter(); //kalder funktionen visRetter efter det nye filter er bestemt
    header.textContent = this.textContent; // Ændr overskrift alt efter hvilket filter der er aktivt

}



async function loadJSON() {
    const JSONData = await fetch("https://babushka-dd8a.restdb.io/rest/menu", {
        headers: myHeaders
    });
    retter = await JSONData.json();
    console.log("Retter: ", retter);
    visRetter();
}

// Funktion der viser retter i liste-view
function visRetter() {
    const dest = document.querySelector(".data-container"); //container til articles med en person
    const skabelon = document.querySelector("template").content; //select indhold af html-skabelon (article)
    dest.textContent = ""; // rydder container inden nyt loop
    retter.forEach(ret => {
        console.log("Kategori", ret.kategori);
        // loop igennem json (retter)
        // Tjek hvilken tro personen har og sammenlign med aktuelt filter eller vis alle, hvis filter har værdien "alle"
        if (filter == ret.kategori || filter == "alle") {
            const klon = skabelon.cloneNode(true);
            klon.querySelector(".navn").textContent = ret.navn;
            klon.querySelector(".kortbeskrivelse").textContent = ret.kortbeskrivelse;
            klon.querySelector(".pris").textContent += `${ret.pris},-.`;
            klon.querySelector(".billede").src = medieUrl + ret.billede;
            klon.querySelector(".billede").alt = "Billede af " + ret.navn;
            klon.querySelector(".ret").addEventListener("click", () => visDetaljer(ret));
            dest.appendChild(klon);
        }
    })
}

function visDetaljer(hvem) {
    location.href = `singleview.html?id=${hvem._id}`;
}
