const wordData = [
    { word: 'germany baroque', question: "Name the country where J.S Bach is from and the era he's associated with", hint: "Western Europe, known for its ornate style", img: "assetstrivia/bach1.png" },
    { word: 'six salzburg', question: "How old was Mozart when he started composing? Name the city he was born in", hint: "This country is known for its alps, less than ten", img: "assetstrivia/mozart.jpeg" },
    { word: 'vivaldi venice', question: "Name the Baroque composer that greatley influenced Bach and where he was from", hint: "His name starts with the same letter as the city", img: "assetstrivia/Vivaldi.jpeg" },
    { word: 'romeo and juliet', question: "Prokofiev was an early 20th Century Russian composer known for this ballet", hint: "It was written by Shakespeare", img: "assetstrivia/romeojuliet1.jpeg" },
    { word: 'funeral march', question: "Chopin was not a fan of Beethoven but he did compose his own famous version of?", hint: "Something that is played on a bad day", img: "assetstrivia/Beethoven.jpeg" },
    { word: 'swan lake', question: "This popular ballet is one of Tchaikovsky's best known works", hint: "They swin", img: "assetstrivia/tchaikovsky.jpg" },
    { word: 'chopin poland', question: "This best-known Romantic composer was half French but was born in?", hint: "Eastern Europe", img: "assetstrivia/chopin3.png"}, 
    { word: 'sleeping beauty', question: "This famous Tchaikovsky ballet was reworked by Igor Stravinsky in the 20 century for the Ballet Russe", hint: "It was also a Disney film", img: "assetstrivia/balletrusse1.jpeg"}
]

// app state variables 

let score = 0
let playerScore = 0
let playerWin = 0
let chances = 8
let winning = 0
let currentWordData = 0

let currentWordToArray;
let lengthOfCurrentWord;

// cached DOM elements 


const leftSideImg = document.getElementById("leftsideimg")

const rightSideText = document.getElementById("rightsidetext")

const imgHolder = document.getElementById("imgholder")

const start = document.getElementById("start")

start.addEventListener('click', startGame)

const resetBtn = document.getElementById("next").addEventListener('click', resetScore)

let scoreMsg = document.getElementById("score")

let chancesMsg = document.getElementById("chances")

let hintSection = document.getElementById("hint")

const letterBoxContainer = document.getElementsByClassName("wordDivBox")[0]

const allKeys = document.getElementsByClassName('keys')

const message = document.getElementById('message')

const letterBoxes = document.getElementsByClassName('letterBoxes')


//  functions

// creates placeHolders

function createsWordPlaceholders() {
    const currentWord = currentWordData.word
    for (let i = 0; i < currentWord.length; i++) {
        const letterBoxElem = document.createElement('div')
        letterBoxElem.classList.add('letterBoxes')
        letterBoxContainer.appendChild(letterBoxElem)

    //    OPTION 1: add additional styles with js
        letterBoxContainer.style.cssText = ` 
           height: 40px; 
           margin-top: 3rem; 
      `; 

    // ------------- OR -------------- //

    //    OPTION 2: add an additional css class to the div
    letterBoxContainer.classList.add('add-margin')

        if (currentWord[i] === ' ') {
            letterBoxElem.style.color = "transparent"
        } else {
            letterBoxElem.style.borderBottom = "2px solid white"
            letterBoxElem.style.color = "white"
        }
    }
}

// selects from wordata

function selectNewWordData() {
    const randomNum = Math.floor(Math.random() * wordData.length)
    currentWordData = wordData[randomNum]
    currentWordToArray = currentWordData.word.split('')
    lengthOfCurrentWord = currentWordData.word.replace(/\s/g, "").length
}

// losing function 

function losing() {
    playerWin++
    chances--
    chancesMsg.innerHTML = chances
}

// hint btn function and answer

function hintBtn() {
    if (chances === 3) {
        let btn = document.createElement("button")
        btn.innerHTML = "HINT"
        btn.style.backgroundColor = "red"
        btn.style.marginLeft = "10px"
        btn.style.border = "none"
        btn.style.color = "white"
        btn.style.width = "43px"
        btn.style.fontSize = "13px"
        btn.style.cursor = "pointer"
        document.getElementById('hint').appendChild(btn)
        btn.addEventListener('click', hintAnswer)
    }
}


function hintAnswer() {
    hintSection.innerHTML = currentWordData.hint
}

//  play function 


function startGame() {
    reset()
    selectNewWordData()
    imgHolder.src = currentWordData.img
    start.innerText = "NEXT"
    hintSection.innerHTML = "Test your knowledge of music history"
    start.removeEventListener('click', startGame)
    start.style.cursor = "not-allowed"
    rightSideText.innerHTML = currentWordData.question
    createsWordPlaceholders()
    for (let i = 0; i < allKeys.length; i++) {
        allKeys[i].addEventListener('click', keyClick)
    }
       start.removeEventListener('click', startGame)
}

// reset function 

function reset() {
    letterBoxContainer.innerHTML = ''
    chances = 8
    winning = 0
    playerWin = 0
    message.innerHTML = ''
    chancesMsg.innerHTML = chances
    for (let i = 0; i < allKeys.length; i++) {
        allKeys[i].classList.remove('disabled')
    }
}

// reset score function

function resetScore() {
    scoreMsg.innerHTML = '0'
    playerScore = 0
}

// store ID of button function 

let btnID = ''

function reply_click(clicked_id) {
    btnID = clicked_id;
}



// keyClick function 

function keyClick(e) {
    if (!currentWordData.word.includes(btnID.toLowerCase())) {
        losing()
        checkWin()
        hintBtn()
    } else {
        currentWordToArray.forEach(function (letter, index) {
            if (letter === btnID.toLowerCase()) {
                winning++
                letterRender(index, letter)
                checkWin()
            }
        })
    }
    e.target.classList.add('disabled')

}



// letterRender function 

function letterRender(indexValOfWord, letter) {
    letterBoxes[indexValOfWord].innerHTML = letter.toUpperCase()
}



// checkWin function 

function checkWin() {
    if (winning === lengthOfCurrentWord) {
        hintSection.innerHTML = 'You got it!'
        for (let i = 0; i < allKeys.length; i++) {
            allKeys[i].removeEventListener('click', keyClick)
        }
        score++
        scoreMsg.innerHTML = score

    } else if (playerWin === 8) {
        hintSection.innerHTML = currentWordData.word.toUpperCase() + '.' + ' Try Again!'
        for (let i = 0; i < allKeys.length; i++) {
            allKeys[i].removeEventListener('click', keyClick)
        }
    }
    start.addEventListener('click', startGame)
    start.style.cursor = "pointer"
}













