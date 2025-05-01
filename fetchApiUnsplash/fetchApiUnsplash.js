// Kullanılacak Elementler Seçildi.
const form = document.querySelector(".form");
const input = document.querySelector(".form input");
const container = document.querySelector(".container");


//Unsplash'a fotograf için istek atacağız istek adresi bu şekilde tanımlanmalı.
//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY


//event'ları tanımladık.

events();

function events() {
     form.addEventListener("submit", (event) => {
          event.preventDefault();
          container.innerHTML = "";
          veriCek(input.value.trim());
     });
}


//ilgili url'den fetch ile verileri çekme
async function veriCek(istenilenFotolar) {

     const foto = await (await fetch(`https://api.unsplash.com/search/photos?query=${istenilenFotolar}&client_id=yJeCDAKudAfxFb2UsBre1dxFYkBxsBek59mOcbHjAfI`)).json();
     divUret(foto);
}


//Fotograflari koyacağımız div ve image
function divUret(foto) {

     //Fotograf Bulunamaz ise
     if (foto.results.length <= 0) {
          fotografBulunamadi();
     }
     else {
          for (let i = 0; i < foto.results.length; i++) {
               let divUret = document.createElement("div");
               divUret.className = "div";

               let image = document.createElement("img");
               image.src = foto.results[i].urls.regular;
               image.style.width = "100%";
               image.style.height = "100%";
               image.style.objectFit = "cover";
               image.classList.add("gallery-image");
               divUret.appendChild(image);
               container.appendChild(divUret);
          }
     }
}

//Fotografın Bulunamaması durumunda
function fotografBulunamadi() {
     const bulunamadi = document.createElement("div");
     bulunamadi.className = "bulunamadi";
     bulunamadi.innerHTML = "FOTOGRAF BULUNAMADI"
     container.appendChild(bulunamadi);
}