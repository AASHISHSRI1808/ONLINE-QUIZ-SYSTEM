

var Allquestions = [
  "What is the capital of France?",
  "Which planet is known as the Red Planet?",
  "What is the chemical symbol for water?",
  "Who painted the Mona Lisa?",
  "Which country is home to the kangaroo?",
  "What is the tallest mammal in the world?",
  "What is the capital of Japan?",
  "What is the chemical symbol for gold?",
  "Which is the largest ocean on Earth?",
  "Who was the first person to step on the Moon?",
  "What is the capital of Brazil?",
  "Which gas do plants use for photosynthesis?",
  "Who is known as the father of modern physics?",
  "What is the chemical symbol for oxygen?",
  "Which is the largest land mammal?",
  "What is the capital of Italy?",
  "What is the chemical symbol for silver?",
  "Which is the largest desert in the world?",
  "Who is known as the 'Father of the Computer'?",
  "What is the capital of China?",
  "Who discovered penicillin?",
];

var Alloptions = [
  ["Paris", "London", "Berlin", "Madrid"],
  ["Jupiter", "Mars", "Saturn", "Earth"],
  ["H2O", "CO2", "NaCl", "O2"],
  ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
  ["Australia", "Brazil", "Canada", "India"],
  ["Giraffe", "Elephant", "Hippopotamus", "Rhino"],
  ["Tokyo", "Beijing", "Seoul", "Bangkok"],
  ["Au", "Ag", "Fe", "Cu"],
  ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
  ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"],
  ["Brasília", "Rio de Janeiro", "São Paulo", "Buenos Aires"],
  ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
  ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
  ["O2", "O3", "O", "CO2"],
  ["African Elephant", "Hippopotamus", "Giraffe", "Rhinoceros"],
  ["Rome", "Milan", "Naples", "Venice"],
  ["Ag", "Au", "Fe", "Cu"],
  ["Antarctic Desert", "Sahara Desert", "Arabian Desert", "Gobi Desert"],
  ["Charles Babbage", "Alan Turing", "Steve Jobs", "Bill Gates"],
  ["Beijing", "Shanghai", "Hong Kong", "Taipei"],
  ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Robert Koch"],
];

var answers = [
  "Paris",
  "Mars",
  "H2O",
  "Leonardo da Vinci",
  "Australia",
  "Giraffe",
  "Tokyo",
  "Au",
  "Pacific Ocean",
  "Neil Armstrong",
  "Brasília",
  "Carbon dioxide",
  "Albert Einstein",
  "O",
  "African Elephant",
  "Rome",
  "Ag",
  "Antarctic Desert",
  "Charles Babbage",
  "Beijing",
  "Alexander Fleming",
];

var questions = document.querySelector(".quesdivpara");

var optionsA = document.querySelector(".option1");
var optionsB = document.querySelector(".option2");
var optionsC = document.querySelector(".option3");
var optionsD = document.querySelector(".option4");
var totques = document.querySelector(".totalques");
var Newoptions = document.querySelector(".optiondiv");
const nextbtn = document.querySelector(".next");
let counter = document.querySelector(".countdown");

let currquestion = 0;
let interval;

var quescounter = document.querySelector(".count");

function newquestions(i) {
  questions.innerText = Allquestions[i];
  optionsA.innerText = Alloptions[i][0];
  optionsB.innerText = Alloptions[i][1];
  optionsC.innerText = Alloptions[i][2];
  optionsD.innerText = Alloptions[i][3];

  totques.innerText = Allquestions.length;
  quescounter.innerText = i + 1;

  optionsA.parentElement.children[2].children[0].classList.remove("right1");
  optionsB.parentElement.children[2].children[0].classList.remove("right1");
  optionsC.parentElement.children[2].children[0].classList.remove("right1");
  optionsD.parentElement.children[2].children[0].classList.remove("right1");

  optionsA.parentElement.children[2].children[1].classList.remove("wrong1");
  optionsB.parentElement.children[2].children[1].classList.remove("wrong1");
  optionsC.parentElement.children[2].children[1].classList.remove("wrong1");
  optionsD.parentElement.children[2].children[1].classList.remove("wrong1");

  optionsA.parentElement.classList.remove("backgreen");
  optionsB.parentElement.classList.remove("backgreen");
  optionsC.parentElement.classList.remove("backgreen");
  optionsD.parentElement.classList.remove("backgreen");

  optionsA.parentElement.classList.remove("backred");
  optionsB.parentElement.classList.remove("backred");
  optionsC.parentElement.classList.remove("backred");
  optionsD.parentElement.classList.remove("backred");

  optionsA.parentElement.children[1].classList.remove("youchoose1");
  optionsB.parentElement.children[1].classList.remove("youchoose1");
  optionsC.parentElement.children[1].classList.remove("youchoose1");
  optionsD.parentElement.children[1].classList.remove("youchoose1");
}

let isnoduration = false;

newquestions(currquestion);

nextbtn.addEventListener("click", () => {
  console.log("clicked");

  Almaindiv.classList.remove("changedivcol1");
  Altimecount.classList.remove("timecount1");
  Alnext.classList.remove("next1");
  Albody.classList.remove("body2");

  Almaindiv.classList.remove("changedivcol2");
  Altimecount.classList.remove("timecount2");
  Alnext.classList.remove("next2");
  Albody.classList.remove("body3");

  currquestion++;

  if (currquestion < Allquestions.length) {
    newquestions(currquestion);
  }
  clearInterval(interval);
  timer(30);
  
  isnoduration = false;
  isclickedonce=true;
});

var Almaindiv = document.querySelector(".maindiv");
var Altimecount = document.querySelector(".timecount");
var Alnext = document.querySelector(".next");
var Albody = document.querySelector(".body1");

var audio15 = document.querySelector(".myaudio15");
var audio5 = document.querySelector(".myaudio5");
var audio0 = document.querySelector(".myaudio0");

var audio = document.querySelector(".myAudio");

var muted = document.querySelector(".voldownimg");
var volume = document.querySelector(".volupimg");

let ismuted = false;

muted.addEventListener("click", () => {
  if (isnoduration) {
    alert("there is no time left");
    return;
  }

  muted.classList.add("voldownimg2");
  volume.classList.add("volupimg3");
  ismuted = true;
  audio.play();
});
volume.addEventListener("click", () => {
  if (isnoduration) {
    alert("there is no time left");
    return;
  }

  muted.classList.remove("voldownimg2");
  volume.classList.remove("volupimg3");
  ismuted = false;
  audio.pause();
});

///

var correctmark = 0;

isclickedonce=true;

Newoptions.addEventListener("click", (e) => {
  var chosenoptions = e.target.innerText;

  console.log(chosenoptions);

  if (isnoduration) {
    alert("there is no time left");
    return;
  }if(isclickedonce){
    if (chosenoptions === answers[quescounter.innerText - 1]) {
      console.log("correct answer");

      if (chosenoptions === optionsA.innerText) {
        optionsA.parentElement.children[2].children[0].classList.add("right1");
        optionsA.parentElement.classList.add("backgreen");
        optionsA.parentElement.children[1].classList.add("youchoose1");
      }
      if (chosenoptions === optionsB.innerText) {
        optionsB.parentElement.children[2].children[0].classList.add("right1");
        optionsB.parentElement.classList.add("backgreen");
        optionsB.parentElement.children[1].classList.add("youchoose1");
      }
      if (chosenoptions === optionsC.innerText) {
        optionsC.parentElement.children[2].children[0].classList.add("right1");
        optionsC.parentElement.classList.add("backgreen");
        optionsC.parentElement.children[1].classList.add("youchoose1");
      }

      if (chosenoptions === optionsD.innerText) {
        optionsD.parentElement.children[2].children[0].classList.add("right1");
        optionsD.parentElement.classList.add("backgreen");
        optionsD.parentElement.children[1].classList.add("youchoose1");
      }

      correctmark++;

      console.log(`total correct marks ${correctmark}`);
    }

    if (chosenoptions != answers[quescounter.innerText - 1]) {
      console.log("wrong Answer");

      if (chosenoptions === optionsA.innerText) {
        optionsA.parentElement.children[2].children[1].classList.add("wrong1");
        optionsA.parentElement.classList.add("backred");
        optionsA.parentElement.children[1].classList.add("youchoose1");

            if(answers[quescounter.innerText - 1]==optionsA.innerText){
              optionsA.parentElement.children[2].children[0].classList.add("right1");
              optionsA.parentElement.classList.add("backgreen");
            }
            if(answers[quescounter.innerText - 1]==optionsB.innerText){
              optionsB.parentElement.children[2].children[0].classList.add("right1");
            optionsB.parentElement.classList.add("backgreen");
            }
            if(answers[quescounter.innerText - 1]==optionsC.innerText){
              optionsC.parentElement.children[2].children[0].classList.add("right1");
              optionsC.parentElement.classList.add("backgreen");
             }
           if(answers[quescounter.innerText - 1]==optionsC.innerText){
             optionsD.parentElement.children[2].children[0].classList.add("right1");
             optionsD.parentElement.classList.add("backgreen");
            }

      }
      if (chosenoptions === optionsB.innerText) {
        optionsB.parentElement.children[2].children[1].classList.add("wrong1");
        optionsB.parentElement.classList.add("backred");
        optionsB.parentElement.children[1].classList.add("youchoose1");

        if(answers[quescounter.innerText - 1]==optionsA.innerText){
          optionsA.parentElement.children[2].children[0].classList.add("right1");
          optionsA.parentElement.classList.add("backgreen");
        }
        if(answers[quescounter.innerText - 1]==optionsB.innerText){
          optionsB.parentElement.children[2].children[0].classList.add("right1");
        optionsB.parentElement.classList.add("backgreen");
        }
        if(answers[quescounter.innerText - 1]==optionsC.innerText){
          optionsC.parentElement.children[2].children[0].classList.add("right1");
          optionsC.parentElement.classList.add("backgreen");
         }
       if(answers[quescounter.innerText - 1]==optionsC.innerText){
         optionsD.parentElement.children[2].children[0].classList.add("right1");
         optionsD.parentElement.classList.add("backgreen");
        }
       
      }
      if (chosenoptions === optionsC.innerText) {
        optionsC.parentElement.children[2].children[1].classList.add("wrong1");
        optionsC.parentElement.classList.add("backred");
        optionsC.parentElement.children[1].classList.add("youchoose1");

        if(answers[quescounter.innerText - 1]==optionsA.innerText){
          optionsA.parentElement.children[2].children[0].classList.add("right1");
          optionsA.parentElement.classList.add("backgreen");
        }
        if(answers[quescounter.innerText - 1]==optionsB.innerText){
          optionsB.parentElement.children[2].children[0].classList.add("right1");
        optionsB.parentElement.classList.add("backgreen");
        }
        if(answers[quescounter.innerText - 1]==optionsC.innerText){
          optionsC.parentElement.children[2].children[0].classList.add("right1");
          optionsC.parentElement.classList.add("backgreen");
         }
       if(answers[quescounter.innerText - 1]==optionsC.innerText){
         optionsD.parentElement.children[2].children[0].classList.add("right1");
         optionsD.parentElement.classList.add("backgreen");
        }

      }
      if (chosenoptions === optionsD.innerText) {
        optionsD.parentElement.children[2].children[1].classList.add("wrong1");
        optionsD.parentElement.classList.add("backred");
        optionsD.parentElement.children[1].classList.add("youchoose1");

          if(answers[quescounter.innerText - 1]==optionsA.innerText){
              optionsA.parentElement.children[2].children[0].classList.add("right1");
              optionsA.parentElement.classList.add("backgreen");
            }
            if(answers[quescounter.innerText - 1]==optionsB.innerText){
              optionsB.parentElement.children[2].children[0].classList.add("right1");
            optionsB.parentElement.classList.add("backgreen");
            }
            if(answers[quescounter.innerText - 1]==optionsC.innerText){
              optionsC.parentElement.children[2].children[0].classList.add("right1");
              optionsC.parentElement.classList.add("backgreen");
             }
           if(answers[quescounter.innerText - 1]==optionsC.innerText){
             optionsD.parentElement.children[2].children[0].classList.add("right1");
             optionsD.parentElement.classList.add("backgreen");
            }
       
      }
    }
  }
  else{
    alert("option already choosed, try next question");

  }
  isclickedonce=false;
});

function timer(count) {
  clearInterval(interval);
  var duration = count;
  interval = setInterval(() => {
    counter.innerText = duration;
    if (ismuted) {
      if (duration == 16) {
        audio.pause();
        audio15.play();
      }
      if (duration == 5) {
        audio.pause();
        audio5.play();
      }
      if (duration == 0) {
        audio.pause();
        audio0.play();
      } else {
        audio.play();
      }
    }
    if (duration == 0) {
      audio.pause();
      isnoduration = true;
    }
    if (duration <= 15) {
      Almaindiv.classList.add("changedivcol1");
      Altimecount.classList.add("timecount1");
      Alnext.classList.add("next1");
      Albody.classList.add("body2");
    }
    if (duration <= 5) {
      Almaindiv.classList.add("changedivcol2");
      Altimecount.classList.add("timecount2");
      Alnext.classList.add("next2");
      Albody.classList.add("body3");
    }
    if (duration <= 0) {
      clearInterval(interval);
    } else {
      duration--;
    }
  }, 1000);
}

timer(30);




//  result js code//////////////////////////######################

var alldone = document.querySelector(".finishbtn");

var Allscored = document.querySelector(".scored");
var Allunscored = document.querySelector(".unscored");
var Allcorrectget = document.querySelector(".correctget");
var Alltotalget = document.querySelector(".totalget");

var Againretry = document.querySelector(".retry");

let finclass = document.querySelector(".result-container");

let totalwidth = document.getElementById("widthbar");

let quote = document.getElementById("keeplearning");

alldone.addEventListener("click", () => {
  Almaindiv.classList.add("wapismaindiv");
  finclass.classList.add("fineresult1");
  clearInterval(interval);
  audio.pause();
 

  Allscored.innerText = `${Math.round(
    (correctmark / Allquestions.length) * 100
  )}%`;

  Allunscored.innerText = `${Math.round(
    ((Allquestions.length - correctmark) / Allquestions.length) * 100
  )}%`;

  Allcorrectget.innerText = `${correctmark}`;
  Alltotalget.innerText = `${Allquestions.length}`;

  totalwidth.style.width = `${Math.round(
    (correctmark / Allquestions.length) * 100
  )}%`;

  if (correctmark == 0) {
    quote.innerText = "Don't give up! Keep practicing and you'll improve!";
  } else if (correctmark > 0 && correctmark < 6) {
    quote.innerText = "Good effort! Keep learning and you'll get better!";
  } else if (correctmark >= 6 && correctmark < 11) {
    quote.innerText = "Keep Learning , you have a good score";
  } else if (correctmark >= 11 && correctmark < 16) {
    quote.innerText = "Great job! You're on the right track!";
  } else {
    quote.innerText = "Excellent! You have a great understanding!";
  }
});

Againretry.addEventListener("click", () => {

  Almaindiv.classList.remove("wapismaindiv");
  finclass.classList.remove("fineresult1");
});