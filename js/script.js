const fechaLimite =
    new Date("2026-09-01T23:59:59");

const weddingDate = new Date(
    "November 20, 2026 17:00:00"
);

function rsvpAbierto(){

    const hoy = new Date();

    return hoy <= fechaLimite;
}

function updateCountdown(){

    const now = new Date();

    const difference =
        weddingDate - now;

    const days =
        Math.floor(
            difference /
            (1000*60*60*24)
        );

    const hours =
        Math.floor(
            (difference %
            (1000*60*60*24))
            /
            (1000*60*60)
        );

    const minutes =
        Math.floor(
            (difference %
            (1000*60*60))
            /
            (1000*60)
        );

    const seconds =
        Math.floor(
            (difference %
            (1000*60))
            /
            1000
        );

    document.getElementById(
        "days"
    ).textContent = days;

    document.getElementById(
        "hours"
    ).textContent = hours;

    document.getElementById(
        "minutes"
    ).textContent = minutes;

    document.getElementById(
        "seconds"
    ).textContent = seconds;

}

setInterval(
    updateCountdown,
    1000
);

updateCountdown();

function verInvitacion(){

    document
        .getElementById("countdown")
        .scrollIntoView({
            behavior:"smooth"
        });

    if(!musicPlaying){

        audioPlayer.play();

        musicBtn.innerHTML =
        "⏸ Pausar";

        musicPlaying =
        true;

    }

}

const photos = [

"Fotos/Foto1.jpg",
"Fotos/Foto2.jpg",
"Fotos/Foto3.jpg",
"Fotos/Foto4.jpg",
"Fotos/Foto5.jpg",
"Fotos/Foto6.jpg",
"Fotos/Foto7.jpg",
"Fotos/Foto8.jpg",
"Fotos/Foto9.jpg"

];

let galleryIndex = 0;

const track =
document.querySelector(".gallery-track");

const dotsContainer =
document.querySelector(".gallery-dots");

const totalPages =
Math.ceil(photos.length / 3);

function renderGallery(){

    track.innerHTML = "";

    for(let i=0;i<3;i++){

        let photoIndex =
        galleryIndex + i;

        if(photoIndex < photos.length){

            const img =
            document.createElement("img");

            img.src =
            photos[photoIndex];

            img.addEventListener("click",()=>{

            openLightbox(
            photos[photoIndex]
            );

            });

            track.appendChild(img);

        }

    }

    updateDots();
}

function updateDots(){

    dotsContainer.innerHTML="";

    for(let i=0;i<totalPages;i++){

        const dot =
        document.createElement("span");

        dot.classList.add(
            "gallery-dot"
        );

        if(i === galleryIndex/3){

            dot.classList.add(
                "active"
            );
        }

        dotsContainer.appendChild(dot);

    }

}

document
.querySelector(".next")
.addEventListener("click",()=>{

    galleryIndex += 3;

    if(galleryIndex >= photos.length){

        galleryIndex = 0;
    }

    renderGallery();

});

document
.querySelector(".prev")
.addEventListener("click",()=>{

    galleryIndex -= 3;

    if(galleryIndex < 0){

        galleryIndex =
        (totalPages-1)*3;
    }

    renderGallery();

});

setInterval(()=>{

    galleryIndex += 3;

    if(galleryIndex >= photos.length){

        galleryIndex = 0;
    }

    renderGallery();

},5000);

renderGallery();

const lightbox =
document.getElementById(
    "lightbox"
);

const lightboxImg =
document.getElementById(
    "lightbox-img"
);

function openLightbox(src){

    lightbox.style.display =
    "flex";

    lightboxImg.src =
    src;
}

document
.getElementById(
    "close-lightbox"
)
.addEventListener(
    "click",
    ()=>{

        lightbox.style.display =
        "none";

    }
);

lightbox.addEventListener(
    "click",
    (e)=>{

        if(
            e.target === lightbox
        ){

            lightbox.style.display =
            "none";

        }

    }
);

const musicBtn =
document.getElementById(
    "music-btn"
);

const audioPlayer =
document.getElementById(
    "audio-player"
);

let musicPlaying =
false;

musicBtn.addEventListener(
    "click",
    ()=>{

        if(!musicPlaying){

            audioPlayer.play();

            musicBtn.innerHTML =
            "⏸ Pausar";

            musicPlaying =
            true;

        }
        else{

            audioPlayer.pause();

            musicBtn.innerHTML =
            "♪ Música";

            musicPlaying =
            false;

        }

    }
);

function confirmarAsistencia(respuesta){
if(!rsvpAbierto()){

    alert(
        "El periodo de confirmación ya ha concluido."
    );

    return;
}
    const params =
        new URLSearchParams(
            window.location.search
        );

    const codigo =
        params.get("id");

    if(!codigo){

        alert(
            "No se encontró el código de invitado."
        );

        return;
    }

    fetch(
        "https://script.google.com/macros/s/AKfycbztkV9FvfkVtYETl2vQ5Hw8YNYB9hAP_ID5tD_2qHCMhZjjyMuzRNzkX_jsZI_22GKK/exec"
        + "?id="
        + codigo
        + "&respuesta="
        + respuesta
    )
    .then(response => response.text())
    .then(data => {

    if(respuesta === "SI"){

        alert(
             "✓ Tu asistencia ha sido registrada correctamente. ¡Nos dará mucho gusto compartir este día contigo!"
        );
       cargarInvitado();
    }else{

        alert(
            "✕ Hemos registrado tu respuesta. Gracias por avisarnos."
        );
      cargarInvitado();
    }

})
    .catch(error => {

        console.error(error);

        alert(
            "Ocurrió un error al registrar la respuesta."
        );

    });

}

const params =
    new URLSearchParams(
        window.location.search
    );

const codigo =
    params.get("id");

console.log(codigo);

cargarInvitado();

function cargarInvitado(){

    if(!codigo) return;

    fetch(
        "https://script.google.com/macros/s/AKfycbztkV9FvfkVtYETl2vQ5Hw8YNYB9hAP_ID5tD_2qHCMhZjjyMuzRNzkX_jsZI_22GKK/exec?id="
        + codigo
    )
    .then(response => response.json())
    .then(data => {

        document.getElementById(
            "guest-name"
        ).innerText =
            data.invitado;

        document.getElementById(
           "hero-guest"
        ).innerText =
        "Invitación para " +
        data.invitado;

        document.getElementById(
            "guest-passes"
        ).innerText =
            "Hemos reservado "
            + data.pases +
            (data.pases == 1
                ? " lugar para ti."
                : " lugares para ustedes.");

        const statusDiv =
            document.getElementById(
                "rsvp-status"
            );

        const buttonsDiv =
            document.getElementById(
                "rsvp-buttons"
            );

        if(!rsvpAbierto()){

    buttonsDiv.style.display = "none";

    statusDiv.innerHTML =
    `
    <div class="rsvp-message">

        El periodo de confirmación ha concluido.

        <br><br>

        Si necesitas realizar algún cambio,
        por favor comunícate con nosotros.

    </div>
    `;

    return;
}

        if(data.confirmado === "SI"){

            buttonsDiv.style.display = "none";

            statusDiv.innerHTML =
            `
            <div class="rsvp-message">
                ✓ Hemos registrado tu asistencia.
            </div>

            <button
            class="change-btn"
            onclick="habilitarCambio()">
                Cambiar respuesta
            </button>
            `;
        }

        if(data.confirmado === "NO"){

            buttonsDiv.style.display = "none";

            statusDiv.innerHTML =
            `
            <div class="rsvp-message">
                ✕ Hemos registrado que no podrás acompañarnos.
            </div>

            <button
            class="change-btn"
            onclick="habilitarCambio()">
                Cambiar respuesta
            </button>
            `;
        }

    });

}

function habilitarCambio(){

    document.getElementById(
        "rsvp-buttons"
    ).style.display = "flex";

    document.getElementById(
        "rsvp-status"
    ).innerHTML = "";
}