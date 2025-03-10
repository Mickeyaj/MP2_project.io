"use strict";

(function () {

    window.addEventListener('load', init);

    function init() {
        let startButton = document.getElementById('start-button');
        startButton.addEventListener('click', initiateGame());
    }

    function initiateGame() {
        let 
    }

    let game = {
        students: [
            {name: 'Michael', race: 'White', behavior: 'good'},
            {name: 'Lucy', race: 'White', behavior: 'disruptive'},
            {name: 'Quincy', race: 'Black', behavior: 'good'},
            {name: 'Julian', race: 'Latino', behavior: 'disruptive'},
            {name: 'Kai', race: 'Asian', behavior: 'disruptive'}
        ],

        sroTrustPoints: 50,
        reputationPoints: 50,
        safetyPoints: 50,

        currentStudent: null,
        currentPrompt: null,
        choiceOne: null,
        choiceTwo: null,
        choiceThree: null,

        morningArrival: function () {
            if(this.currentStudent.race !== 'White') {
                this.currentPrompt = 'As you enter school, the SRO randomly selects you for a bag check. You have three choices:';
                this.choiceOne = 'Cooperate with the search';
                this.choiceTwo = 'Question why they are searching you.';
                this.choiceThree = 'Refuse.';
                let decision = document.getElementById('userInput').value;
            }

        },



    };
})();