

$.fn.trivia = function() {

    var quiz = this;


    quiz.userChoice = null;

    quiz.answers = {

        correct: 0,
        incorrect: 0
    };


    quiz.count = 30;
    quiz.current = 0;

    quiz.questions = [{
        question: "What team won the 2018 NBA finals?",
        choices: ["Chicago Bulls", "Golden State Warriors", "Minnesota Timberwolves", "San Antonio Spurs"],
        correct: 1,
        imgUrl: 'https://media2.giphy.com/media/3oKIPkYaXWNQftk3cY/giphy.gif',
    }, {

        question: "Who wore #23 on the Chicago Bulls during 1990?",
        choices: ["Scottie Pippen", "Michael Jordan", "Steve Kerr", "Dikembe Mutumbo"],
        correct: 1

    }, {
        question: "Who currently holds the title for most made three pointers of all time?",
        choices: ["Stephen Curry", "Dirk Nowitzski", "Reggie Miller", "Ray Allen"],
        correct: 3

    }, {
        question: "What was a title of a video game based on an NBA player?",
        choices: ["Like Mike", "Kobe!", "Shaq-fu", "Lebronimator"],
        correct: 2

    }, {
        question: "What NBA player changed their last name to 'World Peace'?",
        choices: ["Lance Stephenson", "Ben Wallace", "Ron Artest", "Nobody"],
        correct: 2

    }, {
        question: "What NBA player blew in Lebron James ear during the 2014 playoffs?",
        choices: ["Carmelo Anthony", "Lance Stephenson", "Dwayne Wade", "Kevin Durant"],
        correct: 1

    }, {
        question: "Who is best known as 'The Beard'?",
        choices: ["James Harden", "Drake", "Shaquille O'neil", "Kevin Love"],
        correct: 0

    }, {
        question: "What NBA player is also known as 'Swaggy P'?",
        choices: ["Kyle Korver", "Damien Lillard", "Nick Young", "JR Smith"],
        correct: 2
    }];


    quiz.ask = function() {
        if (quiz.questions[quiz.current]) {
            $("#timer").html("Time remaining: " + "00:" + quiz.count + " seconds" );
            $("#question").html(quiz.questions[quiz.current].question);
            var choicesArr = quiz.questions[quiz.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices').append(button);
            }
            window.triviaCounter = setInterval(quiz.timer, 1000);
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    quiz.questions.length - (quiz.answers.correct + quiz.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('body').show();
        }
    };
    quiz.timer = function() {
        quiz.count--;
        if (quiz.count <= 0) {
            setTimeout(function() {
                quiz.nextQ();
            });

        } else { 
            $("#timer").html("Time remaining: " + "00:" + quiz.count + " seconds");
        }
    };
    quiz.nextQ = function() {
        quiz.current++;
        clearInterval(window.triviaCounter);
        quiz.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            quiz.cleanUp();
            quiz.ask();
        }, 1000)
    };
    quiz.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + quiz.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + quiz.answers.incorrect);
    };
    quiz.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        quiz.answers[string]++;
        $('.' + string).html(string + ' answers: ' + quiz.answers[string]);
    };
    return quiz;
};
var Trivia;

$("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#choices').on('click', 'button', function(e) {
    var userChoice = $(this).data("id"),
        quiz = Trivia || $(window).trivia(),
        index = quiz.questions[quiz.current].correct,
        correct = quiz.questions[quiz.current].choices[index];

    if (userChoice !== index) {
        $('#choices').text("Wrong Answer! The correct answer was: " + correct);
        quiz.answer(false);
    } else {
        $('#choices').text("Correct!!! The correct answer was: " + correct);
        quiz.answer(true);
    }
    quiz.nextQ();
});
