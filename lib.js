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
    },
      {
        text: "Quel est le langage de programmation principalement utilisé pour le développement d'applications Android ?",
        answers: [
          {
            text: "Java",
            isCorrect: true
          },
          {
            text: "Python",
            isCorrect: false
          },
          {
            text: "C++",
            isCorrect: false
          },
          {
            text: "Swift",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quel est l'acronyme de 'HTML' ?",
        answers: [
          {
            text: "HyperText Markup Language",
            isCorrect: true
          },
          {
            text: "HighText Markup Language",
            isCorrect: false
          },
          {
            text: "Hyper Transfer Markup Language",
            isCorrect: false
          },
          {
            text: "HyperText Modern Language",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quel est le système d'exploitation développé par Microsoft ?",
        answers: [
          {
            text: "Windows",
            isCorrect: true
          },
          {
            text: "Linux",
            isCorrect: false
          },
          {
            text: "MacOS",
            isCorrect: false
          },
          {
            text: "Android",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quel est le principal composant d'un ordinateur qui exécute des instructions de programmes ?",
        answers: [
          {
            text: "Processeur",
            isCorrect: true
          },
          {
            text: "Mémoire vive",
            isCorrect: false
          },
          {
            text: "Disque dur",
            isCorrect: false
          },
          {
            text: "Carte graphique",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quel est le rôle d'un navigateur web ?",
        answers: [
          {
            text: "Permet de naviguer sur Internet",
            isCorrect: true
          },
          {
            text: "Protéger les données de l'ordinateur",
            isCorrect: false
          },
          {
            text: "Stocker les données",
            isCorrect: false
          },
          {
            text: "Gérer les fichiers locaux",
            isCorrect: false
          }
        ]
      },
      {
        text: "Que signifie l'acronyme 'CPU' ?",
        answers: [
          {
            text: "Central Processing Unit",
            isCorrect: true
          },
          {
            text: "Central Power Unit",
            isCorrect: false
          },
          {
            text: "Computer Power Unit",
            isCorrect: false
          },
          {
            text: "Control Processing Unit",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quelle est la principale différence entre un SSD et un HDD ?",
        answers: [
          {
            text: "Le SSD est plus rapide et ne contient pas de pièces mobiles",
            isCorrect: true
          },
          {
            text: "Le SSD est plus lent que le HDD",
            isCorrect: false
          },
          {
            text: "Le SSD a une capacité plus grande que le HDD",
            isCorrect: false
          },
          {
            text: "Le HDD est sans fil, alors que le SSD nécessite un câble",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quel est l'acronyme de 'Wi-Fi' ?",
        answers: [
          {
            text: "Wireless Fidelity",
            isCorrect: true
          },
          {
            text: "Wide Fidelity",
            isCorrect: false
          },
          {
            text: "Wireless Frequency",
            isCorrect: false
          },
          {
            text: "Wide Frequency",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quel est le nom du célèbre moteur de recherche créé par Google ?",
        answers: [
          {
            text: "Google Search",
            isCorrect: true
          },
          {
            text: "Google Explorer",
            isCorrect: false
          },
          {
            text: "Google Find",
            isCorrect: false
          },
          {
            text: "Google Discover",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quel langage de programmation est principalement utilisé pour le développement web côté client ?",
        answers: [
          {
            text: "JavaScript",
            isCorrect: true
          },
          {
            text: "C#",
            isCorrect: false
          },
          {
            text: "Python",
            isCorrect: false
          },
          {
            text: "Ruby",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quel est l'acronyme de 'USB' ?",
        answers: [
          {
            text: "Universal Serial Bus",
            isCorrect: true
          },
          {
            text: "Uniform Serial Bus",
            isCorrect: false
          },
          {
            text: "Universal Service Bus",
            isCorrect: false
          },
          {
            text: "Universal Speed Bus",
            isCorrect: false
          }
        ]
      },
      {
        text: "Qu'est-ce qu'un 'bug' en informatique ?",
        answers: [
          {
            text: "Un défaut ou une erreur dans un programme",
            isCorrect: true
          },
          {
            text: "Un type de logiciel malveillant",
            isCorrect: false
          },
          {
            text: "Un composant matériel",
            isCorrect: false
          },
          {
            text: "Un type de fichier",
            isCorrect: false
          }
        ]
      },
      {
        text: "Que signifie l'acronyme 'RAM' ?",
        answers: [
          {
            text: "Random Access Memory",
            isCorrect: true
          },
          {
            text: "Read Access Memory",
            isCorrect: false
          },
          {
            text: "Rapid Access Memory",
            isCorrect: false
          },
          {
            text: "Random Area Memory",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quel est le nom du système d'exploitation développé par Apple pour les ordinateurs ?",
        answers: [
          {
            text: "macOS",
            isCorrect: true
          },
          {
            text: "Windows",
            isCorrect: false
          },
          {
            text: "Linux",
            isCorrect: false
          },
          {
            text: "Android",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quel est le rôle d'une carte graphique dans un ordinateur ?",
        answers: [
          {
            text: "Traiter et afficher les images à l'écran",
            isCorrect: true
          },
          {
            text: "Gérer la mémoire vive",
            isCorrect: false
          },
          {
            text: "Gérer les connexions réseau",
            isCorrect: false
          },
          {
            text: "Gérer le stockage des données",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quel format de fichier est utilisé pour les images vectorielles ?",
        answers: [
          {
            text: "SVG",
            isCorrect: true
          },
          {
            text: "JPEG",
            isCorrect: false
          },
          {
            text: "PNG",
            isCorrect: false
          },
          {
            text: "BMP",
            isCorrect: false
          }
        ]
      },
      {
        text: "Quel est l'objectif principal d'un antivirus ?",
        answers: [
          {
            text: "Protéger l'ordinateur contre les logiciels malveillants",
            isCorrect: true
          },
          {
            text: "Améliorer la vitesse de l'ordinateur",
            isCorrect: false
          },
          {
            text: "Optimiser les performances du disque dur",
            isCorrect: false
          },
          {
            text: "Fournir une interface graphique",
            isCorrect: false
          }
        ]
      }      
  ];
  
  // variables initialization
  let question = []
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
  
