"use strict";

(function () {

    window.addEventListener('load', init);

    function init() {
        intro();
    }

    let sroTrustPoints = 50;
    let safetyPoints = 50;
    let reputationPoints = 50;
    let currentStudent = null;

    const students = [
        {name: 'Michael', race: 'White', behavior: 'good'},
        {name: 'Lucy', race: 'White', behavior: 'disruptive'},
        {name: 'Quincy', race: 'Black', behavior: 'good'},
        {name: 'Julian', race: 'Latino', behavior: 'disruptive'},
        {name: 'Kai', race: 'Asian', behavior: 'disruptive'}
    ];

    const story = {
        1: { text: "Arriving to school, an SRO is randomly stopping students and searching their backpacks. As you approach the doors, they stop you and ask you to search your backpack",
            choices: ["Cooperate and open your bag", "Ask why you're being searched", "Refuse and tell them they have no right"],
            aftermath: ["A quick glance is all it takes before the SRO lets you go.", "The SRO explains it's just a routine check and waves you off.", "The SRO lets it go but warns you to be careful."
                        ],
            minorityAftermath: ["The SRO checks your back thoroughly, taking quite awhile compared to other students.", "The SRO's tone hardens as they tell you it's part of their job. Their attitude " +
                                "makes you feel uneasy", "The SRO pulls you aside and writes you up for not complying with the search resulting in detention."
                                ],
            reputation: [-5, 5, 10],
            sro: [5, -5, -10],
            safety: [-5, -5, -10]
            },
        2: { text: "You finished washing your hands and walk out of the bathroom where suddenly, the SRO stops you. They ask you if you know anything about someone drawing innapropriate stuff in the bathroom.",
            choices: ["Deny any involvement and offer to help clean it", "Say you just used the bathroom but don't know who did it", "Get suspicious and ask why they're asking you"],
            aftermath: ["The SRO thanks you for being cooperative and assures you to go ahead to class", "The SRO takes your word for it and moves on.", "The SRO sighs and tells you to relax and moves on with their search"],
            minorityAftermath: ["The SRO looks at you suspiciously but tells you to go back to class", "The SRO keeps questioning you and brings you to their office to check the cameras", "The SRO warns you to drop " +
                                "the attitude and demands you follow them back to their office"],
            reputation: [-5, 5, 5],
            sro: [5, -5, -10],
            safety: [5, -5, -10]
        },
        3: { text: "It is now lunchtime and suddenly a fight breaks out between two students. The SRO rushes over and starts breaking it up aggressively, pinning one student to the ground",
            choices: ["Call for a teacher instead of letting the SRO handle it", "Step back and stay out of it", "Rush over and stop the SRO from using excessive force"],
            aftermath: ["The SRO eventually eases up after the teacher arrives", "You let it all unfold as the proper authorities are handling it", "The SRO tells you not to worry and walks away without punishment"],
            minorityAftermath: ["The teacher thanks you, but the SRO ignores your intervention", "You overhear the students whispering about the kid getting pinned is always targeted", "The SRO snaps at you " +
                                "and tells you off in front of everyone"
            ],
            reputation: [5, -5, 10],
            sro: [-5, 0, -10],
            safety: [5, 5, -10]
        },
        4: { text: "The school enforces a dress code, and today you're wearing something slightly outside the rules. The SRO stops you in the hallway and tells you that your outfit is innapropriate",
            choices: ["Apologize and say you didn't realize", "Ask why you're being singled out when others are wearing the same thing", "Tell the SRO it's not that big of a deal"],
            aftermath: ["The SRO lets you go but warns you to be careful next time", "The SRO looks uncomfortable and tells you \"I don't make the rules\"", "The SRO rolls their eyes and lets you go on a warning"],
            minorityAftermath: ["The SRO still gives you a warning and reminds you \"rules exist for a reason\"", "The SRO becomes defensive and tells you to \"watch your attitude\"", "You get written up and set up for detention"],
            reputation: [-5, 5, 5],
            sro: [5, -5, -10],
            safety: [5, -5, -10]
        },
        5: { text: "You're in class, and the whole class is being disruptive despite your teacher's warnings. The teacher calls an SRO to the class. Upon entering and looking around, the SRO calls you out.",
            choices: ["Explain that you weren't the one disrupting class", "Stay silent and accept the blame to avoid escalating", "Defend yourself, call out the SRO for targeting you unfairly"],
            aftermath: ["The SRO immediately accepts your explanation and moves on to a different student", "The SRO lets you off with a warning as class resumes", "The SRO dismisses your remark and gives you a warning"],
            minorityAftermath: ["The SRO looks at you doubtfully but lets you go. You notice they don't seem to question other students as much before they leave", "The SRO writes your name as everyone unfairly watches",
                                "The SRO threatens you with detention for your attitude"
            ],
            reputation: [5, -5, 5],
            sro: [-5, 5, -10],
            safety: [5, -5, -10]
        },
        6: { text: "Having gone off campus for lunch, you rush to class after losing track of time. The SRO sees you in the hallway after the bell rings.",
            choices: ["Apologize and say you're heading to class now", "Lie and say you were talking to a teacher and lost track of time", "Say they should be worrying about actual problems, not students being a minute late"],
            aftermath: ["The SRO chuckles and tells you to go on", "The SRO nods and lets you go", "The SRO sighs but lets you go"],
            minorityAftermath: ["The SRO writes your name down before letting you go", "The SRO questions you further and demands you tell him which teacher you were with", "The SRO sets you up for detention"],
            reputation: [-5, 5, 10],
            sro: [5, -5, -10],
            safety: [5, -5, -10]
        },
        7: { text: "It's your free period and you're walking by the parking lot. Suddenly the SRO approaches you with suspicion",
            choices: ["Explain that it's your free period", "Ask why they're questioning you", "Refuse to engage and walk away"],
            aftermath: ["The SRO quickly dismisses their own concern", "The SRO apologizes and lets you go about your day though you can't help but feel uneasy", "The SRO doesn't follow up and you go about your day"],
            minorityAftermath: ["The SRO stares for a moment before nodidng and letting you go, though you can't shake off the uneasiness in you", "The SRO tells you they're just doing their job and continues to watch you " +
                                "as they let you go", "The SRO stops you and asks you for an ID, making you flabberghasted to not being recognized as a student"
            ],
            reputation: [-5, 5, 5],
            sro: [5, -5, -10],
            safety: [5, -5, -10]
        },
        8: { text: "You return to the locker room after PE class to find your stuff messed up--another prank from your classmates. You go to the SRO to report a the ongoing incident",
            choices: ["Politely explain the situation", "Demand action, voice out the lack of security you've felt", "Say the school never does anything and walk out"],
            aftermath: ["The SRO promises to look into it, bringing you some comfort", "The SRO takes notes and asks you for more details before looking for the students responsible", "The SRO actually follows up later when you've" +
                        " calmed down."
            ],
            minorityAftermath: ["The SRO nods but doesn't seem interested much to your frustrations", "The SRO tells you to stop overreacting, leaving you hopeless in any support", "The SRO rolls their eyes and lets you go frustrated"],
            reputation: [-5, 5, 5],
            sro: [5, -5, -10],
            safety: [5, -5, -10]
        },
        9: { text: "You're now walking home from school when you see the SRO stopping another student outside the school. The student looks upset as the SRO seems to be cornering them",
            choices: ["Keep walking and ignore it", "Stop and check on the student", "Record the interaction"],
            aftermath: ["You continue on your walk without hearing anything else about it later on", "The SRO assures you everything is under control and despite feeling doubt at their words, you continue on your walk",
                        "The SRO notices you and is irritated by the surveillance but the student feels at ease at your presence"
            ],
            minorityAftermath: ["You continue on your walk. The next day, you hear the student was given detention for no clear reason", "The SRO glares at you and tells you to mind your own business. You walk away uneasy.",
                                "The SRO notices you and demands you to delete the video, threatening to punish you. The student feels some comfort at your presence."
            ],
            reputation: [-5, 5, 10],
            sro: [0, -5, -10],
            safety: [5, -5, -10]
        }
    }

    function intro() {
        let introParagraph = "Welcome to Lakeridge High School! Set in the southend of Seattle, it is one of the " +
                            "handful of schools with an SRO.\n This interactive text-based simulator follows five " +
                            "different students of different races at random. The choices you make as these students will\n" +
                            "affect three categories: their safety in school, the trust SROs have in them, and " +
                            "their reputation amomgst their peers. Choose carefully and have fun!";

        let prompt = document.getElementById('prompt');
        prompt.textContent = introParagraph;

        let choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = "";

        // typeWriterEffect(prompt, introParagraph, 20);
        let playButton = document.createElement("button");
        playButton.className = 'play-button';

        let playButtonImg = document.createElement("img");
        playButtonImg.src = 'img/play-button.jpeg';
        playButtonImg.alt = 'Play Button'

        playButton.appendChild(playButtonImg);
        playButton.onclick = () => displayScenario(1);

        choicesContainer.appendChild(playButton);

        currentStudent = selectRandomStudent();
    }

    function selectRandomStudent() {
        let selectedStudent = students[Math.floor(Math.random() * students.length)];
        return selectedStudent;
    }

    function displayScenario(storyIndex) {
        let scenario = story[storyIndex];
        if (!scenario) {
            closing();
        };

        let scenarioPrompt = document.getElementById('prompt');
        scenarioPrompt.textContent = scenario.text;

        let choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = "";

        scenario.choices.forEach((choice, index) => {
            let button = document.createElement('button');
            button.className = "choice";
            button.innerText = choice;
            button.onclick = () => {
                updatePoints(storyIndex, index);
                displayAftermath(storyIndex, index);
            };
            choicesContainer.appendChild(button);
        });


    }

    function displayAftermath(storyIndex, choiceIndex) {
        let scenario = story[storyIndex];

        let aftermathText = '';
        if (currentStudent.race === 'Black' || currentStudent.race === 'Latino' || currentStudent.race === 'Asian') {
            aftermathText = scenario.minorityAftermath[choiceIndex];
        } else {
            aftermathText = scenario.aftermath[choiceIndex];
        }

        let scenarioPrompt = document.getElementById('prompt');
        scenarioPrompt.textContent = aftermathText;

        let choiceContainer = document.getElementById('choices-container');
        choiceContainer.innerHTML = '';

        setTimeout(() => {
            displayScenario(storyIndex + 1);
        }, 2000);
    }

    function updatePoints(storyIndex, choiceIndex){
        if (story[storyIndex]) {
            sroTrustPoints += story[storyIndex].sro[choiceIndex];
            safetyPoints += story[storyIndex].safety[choiceIndex];
            reputationPoints += story[storyIndex].reputation[choiceIndex];
        }
    }

    function closing() {
        let prompt = document.getElementById('prompt');
        let choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = "";

        let closingSentence;

        if (sroTrustPoints >= 70 && safetyPoints >= 70 && reputationPoints >= 70) {
            closingSentence = "As the school year goes on, you feel safe and secure at school. The SROs have earned your trust, and you believe they are truly here to help." +
                                "Your peers respect you for making the right choices, and your school life feels balanced."
        } else if (safetyPoints < 50 && sroTrustPoints < 50 && reputationPoints < 50) {
            closingSentence = "The school has become a hostile place. You feel unsafe, and the SROs have only reinforced your distrust in the system. Your reputation amongst " +
                                "your peers has suffered. You begin questioning if this school is truly meant for you.";
        } else if (safetyPoints >= 70 && reputationPoints >= 70 && sroTrustPoints < 50) {
            closingSentence = "You've gained respect from your peers and you feel relatively safe in school. However, your experiences with the SROs have left you questioning " +
                                "their role and authority. At school, you feel safety exists but not always for the right reason."
        } else if (safetyPoints < 50 && sroTrustPoints >= 70 && reputationPoints >= 70) {
            closingSentence = "While the SROs have been supportive and your peers respect you, you still feel that school is not a safe place. Whether due to personal experiences " +
                                "or the environment around you, the reality of school life remains uncertain";
        } else if (safetyPoints >= 70 && sroTrustPoints < 50 && reputationPoints < 50) {
            closingSentence = "You have stayed out of trouble and feel safe, but your reputation has taken a hit. Students see you as someone who doesn't stand up for others, and " +
                                "your distrust in authority has made some people skeptical of you.";
        } else {
            closingSentence = "Your school experience has been complicated. While you feel somewhat safe, your reputation and trust in SROs remain uncertain. Some of your experiences " +
                                "have been fair, but others have left you feeling uneasy. You now have mixed emotions about authority, safety, and school culture.";
        }

        prompt.textContent = closingSentence;

        let restartButton = document.createElement("button");
        restartButton.className = "choice";

        let restartButtonImg = document.createElement("img");
        restartButtonImg.src = 'img/restart-button.png';

        restartButton.appendChild(restartButtonImg);
        restartButton.onclick = () => location.reload();
        choicesContainer.appendChild(restartButton);
    }

})();