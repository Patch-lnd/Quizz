//
// lib/lib.js
//
var Question = function (questionObj) {
    this.value = {
      text: "Question",
      answers: []
    };
  
    this.selectedAnswer = null;
    this.html = null;
    this.questionText = null;
    this.questionAnswers = null;
    this.questionFeedback = null;
  
    this.value = Object.assign(this.value, questionObj);
  
    this.onQuestionAnswered = ({ detail }) => {
      this.selectedAnswer = {
        value: detail.answer,
        html: detail.answerHtml
      };
      this.update();
  
      document.dispatchEvent(
        new CustomEvent("question-answered", {
          detail: {
            question: this,
            answer: detail.answer
          }
        })
      );
    };
  
    this.create = function () {
      this.html = document.createElement("div");
      this.html.classList.add("question");
  
      this.questionText = document.createElement("h2");
      this.questionText.textContent = this.value.text;
  
      this.questionAnswers = document.createElement("div");
      this.questionAnswers.classList.add("answers");
  
      for (let i = 0; i < this.value.answers.length; i++) {
        const ansObj = this.value.answers[i];
        let answer = createAnswer(ansObj);
  
        answer.onclick = (ev) => {
          if (this.selectedAnswer !== null) {
            this.selectedAnswer.html.classList.remove("selected");
          }
  
          answer.classList.add("selected");
  
          this.html.dispatchEvent(
            new CustomEvent("question-answered", {
              detail: {
                answer: ansObj,
                answerHtml: answer
              }
            })
          );
        };
  
        this.questionAnswers.appendChild(answer);
      }
  
      this.questionFeedback = document.createElement("div");
      this.questionFeedback.classList.add("question-feedback");
  
      this.html.appendChild(this.questionText);
      this.html.appendChild(this.questionAnswers);
      this.html.appendChild(this.questionFeedback);
  
      this.html.addEventListener("question-answered", this.onQuestionAnswered);
  
      return this.html;
    };
  
    this.disable = function () {
      this.html.classList.add("disabled");
      this.html.onclick = (ev) => {
        ev.stopPropagation();
      };
  
      this.html.removeEventListener("question-answered", this.onQuestionAnswered);
  
      let answers = this.html.querySelectorAll(".answer");
      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        answer.onclick = null;
      }
    };
  
    this.remove = function () {
      let children = this.html.querySelectorAll("*");
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        this.html.removeChild(child);
      }
  
      this.html.removeEventListener("question-answered", this.onQuestionAnswered);
  
      this.html.parentNode.removeChild(this.html);
      this.html = null;
    };
  
    this.update = function () {
      let correctFeedback, incorrectFeedback;
      this.html = this.html || document.createElement("div");
  
      correctFeedback = "Nice! You got it right.";
      incorrectFeedback = "Oh! Not the correct answer.";
  
      if (this.selectedAnswer !== null) {
        if (this.selectedAnswer.value.isCorrect) {
          this.html.classList.add("correct");
          this.html.classList.remove("incorrect");
          this.questionFeedback.innerHTML = correctFeedback;
        } else {
          this.html.classList.add("incorrect");
          this.html.classList.remove("correct");
          this.questionFeedback.innerHTML = incorrectFeedback;
        }
      }
    };
  
    function createAnswer(obj) {
      this.value = {
        text: "Answer",
        isCorrect: false
      };
  
      this.value = Object.assign(this.value, obj);
  
      this.html = document.createElement("button");
      this.html.classList.add("answer");
  
      this.html.textContent = this.value.text;
  
      return this.html;
    }
  };
  
  //
  // main.js
  //
  
  let questionsData = [
    {
      text: "Quel est le premier Systeme d'exploitation",
      answers: [
        {
          text: "Windows 1",
          isCorrect: false
        },
        {
          text: "LINUX",
          isCorrect: false
        },
        {
          text: "UNIX",
          isCorrect: true
        },
        {
          text: "MacOS",
          isCorrect: false
        }
      ]
    },
    {
      text: "Laquelle est une mémoire vive ?",
      answers: [
        {
          text: "RAM",
          isCorrect: true
        },
        {
          text: "SSD",
          isCorrect: false
        },
        {
          text: "ROM",
          isCorrect: false
        },
        {
          text: "HDD",
          isCorrect: false
        }
      ]
    },
     {
      text: "Quels sont les extensions relatives au fichers texte ?",
      answers: [
        {
          text: "doc",
          isCorrect: false
        },
        {
          text: "wav",
          isCorrect: false
        },
        {
          text: "txt",
          isCorrect: true
        },
        {
          text: "avif",
          isCorrect: false
        }
      ]
    },
      {
      text: "La plus petite unité de stockage d'un ordinateur ?",
      answers: [
        {
          text: "KB",
          isCorrect: false
        },
        {
          text: "Bit",
          isCorrect: true
        },
        {
          text: "Octets",
          isCorrect: false
        },
        {
          text: "MB",
          isCorrect: false
        }
      ]
    },
    {
      text: "Lequel est un hardware ?",
      answers: [
        {
          text: "Candy Crush",
          isCorrect: false
        },
        {
          text: 'Windows OS',
          isCorrect: false
        },
        {
          text: "Arduino board UNO",
          isCorrect: true
        }
        ,
        {
          text: "Googel Chrome",
          isCorrect: false
        }
      ]
    },
    {
      text: "En quel année C++ a t'il été lacé ?",
      answers: [
        {
          text: "1982",
          isCorrect: true
        },
        {
          text: "1995",
          isCorrect: false
        },
        {
          text: "1983",
          isCorrect: false
        },
        {
          text: "1985",
          isCorrect: false
        }
      ]
    },
    {
      text: "Lequel est un language de programmation ?",
      answers: [
        {
          text: "Dalas",
          isCorrect: false
        },
        {
          text: "Dart",
          isCorrect: true
        },
        {
          text: "C--",
          isCorrect: true
        },
        {
          text: "Java",
          isCorrect: true
        }
      ]
    },
    {
      text: "Lequel est un OS de portable",
      answers: [
        {
          text: "Windows 10",
          isCorrect: false
        },
        {
          text: "IOS",
          isCorrect: true
        },
        {
          text: "Rust",
          isCorrect: true
        },
        {
          text: "UNIX",
          isCorrect: true
        }
      ]
    }
  ];
  
  // variables initialization
  let questions = [];
  let score = 0,
    answeredQuestions = 0;
  let appContainer = document.getElementById("questions-container");
  let scoreContainer = document.getElementById("score-container");
  scoreContainer.innerHTML = `Score: ${score}/${questionsData.length}`;
  
  /**
   * Shuffles array in place. ES6 version
   * @param {Array} arr items An array containing the items.
   */
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  shuffle(questionsData);
  
  // creating questions
  for (var i = 0; i < questionsData.length; i++) {
    let question = new Question({
      text: questionsData[i].text,
      answers: questionsData[i].answers
    });
  
    
    appContainer.appendChild(question.create());
     /* Ne cree pas directement les autres élements et permets donc de faire un pop */
    questions.push(question);
  }
  
 /*  start-btn.onclick = (ev) =>{
    if (!document.querySelector('.question.popup.active')) {
      appContainer.appendChild(questions[0].create());
      questions[0].html.classList.add('popup');
      questions[0].html.classList.add('active');
    }
  }
 */
  document.addEventListener("question-answered", ({ detail }) => {
    if (detail.answer.isCorrect) {
      score++;
    }
  
    answeredQuestions++;
    scoreContainer.innerHTML = `Score: ${score}/${questions.length}`;
    detail.question.disable();
  
    if (answeredQuestions == questions.length) {
      setTimeout(function () {
        alert(`Quiz completed! \nFinal score: ${score}/${questions.length}`);
      }, 100);
    }
  });
/*   if (answeredQuestions == questions.length) {
    setTimeout(function () {
      alert(`Quiz completed! \nFinal score: ${score}/${questions.length}`);
    }, 100);
  
    let currentQuestion = document.querySelector('.question.popup.active');
    currentQuestion.classList.add('fadout');
    setTimeout(() => {
      appContainer.removeChild(currentQuestion);
      appContainer.appendChild(questions[answeredQuestions],create());
      questions[answeredQuestions].html.classList.add('popup');
      questions[answeredQuestions].html.classList.add('active');
    }, 1000);
  }
  }); */
  
  console.log(questions, questionsData);
  
