let icons = [];
let selecctions = [];
let cont = 0;
let level = 12;
let lastLevel;
let gradient = "background: linear-gradient(hsl(34, 82%, 57%), hsl(34, 82%, 54%));"
let gradientHover = "background: linear-gradient(hsl(34, 82%, 47%), hsl(34, 82%, 44%));";
let btn = document.querySelectorAll("button");
let h1 = document.querySelector("h1");
let english = document.querySelector(".english");
let spanish = document.querySelector(".spanish");
let ad;
let languageCheck = document.querySelector(".language");
let languageSelected = window.navigator.language;

english.textContent = "English";
spanish.textContent = "Español";
(languageSelected == "en-US") ? languageCheck.checked = false : true;

let chargeData = (languageSelected) => {
    if(languageSelected == "en-US")
    {
        document.title = "Memory Game";
        h1.textContent = "Memory Game";
        btn[0].textContent = "Easy";
        btn[1].textContent = "Medium";
        btn[2].textContent = "Hard";
        btn[3].textContent = "Mix Cards";
        ad = "¡Congratulations, you have won!. Play again";
    }
    else
    {
        document.title = "Juego de Memoria";
        h1.textContent = "Juego de Memoria";
        btn[0].textContent = "Fácil";
        btn[1].textContent = "Intermedio";
        btn[2].textContent = "Dificil";
        btn[3].textContent = "Mezclar Tarjetas";
        ad = "¡Felicidades, has ganado!. Juega otra vez";
    }
}

languageCheck.addEventListener("click", () => {
    languageSelected = (languageCheck.checked) ? "es" : "en-US";

    chargeData(languageSelected);
});

chargeData(languageSelected);

btn.forEach(function (item){
    item.addEventListener("click", () => {
        let selectedLevel = item.dataset.level || lastLevel;
        createPanel(selectedLevel);
    })
})

function loadIcons(){
    icons = [
        '<img src="img/2x/baseball.png" alt="Icono de baseball">',
        '<img src="img/2x/basket.png" alt="Icono de basket">',
        '<img src="img/2x/control.png" alt="Icono de control">',
        '<img src="img/2x/cricket.png" alt="Icono de cricket">',
        '<img src="img/2x/dado.png" alt="Icono de dado">',
        '<img src="img/2x/football.png" alt="Icono de fubol americano">',
        '<img src="img/2x/futbol.png" alt="Icono de futbol">',
        '<img src="img/2x/pito.png" alt="Icono de pito">',
        '<img src="img/2x/robot.png" alt="Icono de robot">',
        '<img src="img/2x/softball.png" alt="Icono de softball">',
        '<img src="img/2x/tenis.png" alt="Icono de tenis">',
        '<img src="img/2x/volleyball.png" alt="Icono de volleyball">',
    ];
}

function createPanel(selectedLevel){
    selecctions = [];
    loadIcons();
    
    if(selectedLevel == 12){
        
        btn[0].setAttribute("style", gradientHover);
        btn[1].setAttribute("style", gradient);
        btn[2].setAttribute("style", gradient);
    }

    if(selectedLevel == 18){
        btn[0].setAttribute("style", gradient);
        btn[1].setAttribute("style", gradientHover);
        btn[2].setAttribute("style", gradient);
    }

    if(selectedLevel == 24){
        btn[0].setAttribute("style", gradient);
        btn[1].setAttribute("style", gradient);
        btn[2].setAttribute("style", gradientHover);
    }

    level = selectedLevel;
    lastLevel = level;
    
    let panel = document.getElementById("panel")
    let cards = []

    for (let i = 0; i < selectedLevel; i++){
        cards.push(
            `<div class="card-area" onclick="selectCard(${i})">
                <div class="card" id="card${i}">
                    <div class="card-face back-face" id="back-face${i}">
                        ${icons[0]}
                    </div>
                    <div class="card-face front-face">
                        <img src="img/2x/ask.png" alt="Signo de pregunta">
                    </div>
                </div>
            </div>`
        )
        if (i % 2 == 1){
            icons.splice(0,1)
        }
    }
    cards.sort(() => Math.random() - 0.5)
    panel.innerHTML = cards.join(" ")
}

function selectCard(i){
    let card = document.getElementById("card"+i)
    
    if(card.style.transform != "rotateY(180deg)"){
        card.style.transform = "rotateY(180deg)"
        selecctions.push(i)
    }

    if(selecctions.length == 2){
        deselect(selecctions)
        selecctions = []
    }
}

function deselect(selections) {
    setTimeout(() => {
        let backFace1 = document.getElementById("back-face" + selections[0])
        let backFace2 = document.getElementById("back-face" + selections[1])
        
        if(backFace1.innerHTML != backFace2.innerHTML){
            let card1 = document.getElementById("card" + selections[0])
            let card2 = document.getElementById("card" + selections[1])
            card1.style.transform = "rotateY(0deg)"
            card2.style.transform = "rotateY(0deg)" 
        }
        else{
            backFace1.style.background = "plum"
            backFace2.style.background = "plum"
            cont += 2;
            
            if(cont == level){
                alert(ad);
                cont = 0
            }
        }
    }, 500);
}