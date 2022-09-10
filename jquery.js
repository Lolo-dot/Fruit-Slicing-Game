var playing = false;
var fruits = ['apple', 'orange', 'pear', 'pineapple'];
var step, action, score, trials;
$(function(){
    //click on start reset button
    $("#startreset").click(function(){
        //we are playing
        if(playing){
            //reload page
            location.reload();
        }
        else{
            //we are not playing
            playing = true;

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
            $("#startreset").html("Reset Game");

            //start dropping fruits
            startAction();   
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
        setTimeout(startAction, 550);
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
                $("#startreset").html("Start Game"); 

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