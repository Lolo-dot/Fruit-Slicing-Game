var playing = false;
var fruits = ['apple', 'orange', 'pear', 'pineapple'];
var step, action, score, trials, difficulty;
$(function(){
    //click on start reset button
    $("#easy").click(function(){
            //we are not playing
            playing = true;

            //setting difficulty
            difficulty = easy;

            //set score to 0
            score = 0;
            $("#scorevalue").html(score);

            //show trials left
            $("#trialsleft").show();
            trials = 3;
            addHearts();

            //hide gameover screen
            $("#gameover").hide();

            //change button text to reset game
            $("#startreset").show();
            $("#startreset").html("Reset Game");

            //hide the easy and hard buttons
            $(".btn").hide();

            //start dropping fruits
            startAction();   
    });

    $("#hard").click(function(){
            //we are not playing
            playing = true;

            //setting difficulty
            difficulty = hard;

            //set score to 0
            score = 0;
            $("#scorevalue").html(score);

            //show trials left
            $("#trialsleft").show();
            trials = 3;
            addHearts();

            //hide gameover screen
            $("#gameover").hide();

            //change button text to reset game
            $("#startreset").show();
            $("#startreset").html("Reset Game");

            //hide the easy and hard buttons
            $(".btn").hide();

            //start dropping fruits
            startActionHard();   
    });

    $("#startreset").click(function(){
        if(playing){
            //reload page
            location.reload();
        }
    });

    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score); //update score

        //play sound when we slice fruit
        $("#slicesound")[0].play();

        //stop fruit
        clearInterval(action);

        //hide fruit
        $("#fruit1").hide("explode", 500);

        //send new fruit
        if(difficulty == easy){
            setTimeout(startAction, 550);
        }
        else if(difficulty == hard){
            setTimeout(startActionHard, 550);
        }
    });



//functions
function addHearts(){
    $("#trialsleft").empty();
    for(i = 0; i < trials; i++){
        $("#trialsleft").append('<img src="images/heart.png" class="life">');
    }
}

function startAction(){
    $("#fruit1").show();

    //choose a random fruit
    chooseFruit();

    $("#fruit1").css({'left' : Math.round(Math.random()*500), 'top' : -50 });

    //generate falling speed
    step = Math.round(Math.random()*5+1);

    //move fruit down by one step every 10ms
    action = setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step)

        //check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitcontainer").height()){
           if(trials > 1){
            //reduce the number of trials
            trials--;

            $("#fruit1").show();

            //add the right number of hearts
            addHearts();

            //choose a random fruit
            chooseFruit();
            $("#fruit1").css({'left' : Math.round(Math.random()*500), 'top' : -50 });


            //generate falling speed
            step = Math.round(Math.random()*5+1);
           }
           else{ // game over
                playing = false; // we are no longer playing
                $(".btn").show();
                $("#startreset").hide();

                //hide trials left
                $("#trialsleft").hide();

                //show game over sign
                $("#gameover").show();
                $("#gameover").html('<p>Game Over!</p><p>Your Score is '+score+'</p>');
                stopAction();
           }
        }
    },10);
}


function startActionHard(){
    $("#fruit1").show();

    //choose a random fruit
    chooseFruit();

    $("#fruit1").css({'left' : Math.round(Math.random()*500), 'top' : -50 });

    //generate falling speed
    step = Math.round(Math.random()*9+4);

    //move fruit down by one step every 10ms
    action = setInterval(function(){
        $("#fruit1").css('top', $("#fruit1").position().top + step)

        //check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitcontainer").height()){
           if(trials > 1){
            //reduce the number of trials
            trials--;

            $("#fruit1").show();

            //add the right number of hearts
            addHearts();

            //choose a random fruit
            chooseFruit();
            $("#fruit1").css({'left' : Math.round(Math.random()*500), 'top' : -50 });


            //generate falling speed
            step = 9;
           }
           else{ // game over
                playing = false; // we are no longer playing
                $(".btn").show();
                $("#startreset").hide();

                //hide trials left
                $("#trialsleft").hide();

                //show game over sign
                $("#gameover").show();
                $("#gameover").html('<p>Game Over!</p><p>Your Score is '+score+'</p>');
                stopAction();
           }
        }
    },10);
}

function chooseFruit(){
    $("#fruit1").attr('src', 'images/'+fruits[Math.round(Math.random()*3)]+'.png');
   
}

function stopAction(){

    //stop dropping fruit
    clearInterval(action);
    $("#fruit1").hide();
}
});