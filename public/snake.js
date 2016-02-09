

function multi(first){
	return function(second){
		return $('#'+first).find('#'+second);	
	}
}


function multiIf( first ){
	return function(second){
		return function(third){
		return $("#"+first)[third](second);
		}
	}
}



var snakeBody=[];




function makeFood(){
	var fruitID = Math.floor(Math.random()*1600)+1;
	 multi('grid')(fruitID).addClass('fruit')
}

var currentMove = '';

function move(direction){
		var currentPosition = snakeBody[snakeBody.length-1];
		
		if( direction === 'right'){
			var nextPosition = currentPosition+1;
		}
		else if( direction === 'left'){
			 nextPosition = currentPosition-1;
		}
		else if( direction === 'up'){
			 nextPosition = currentPosition - 40;
		}
		else if( direction === 'down'){
			 nextPosition = currentPosition + 40;
		}

		var tail = 0;

		//removing the snake from the board  to allow movement
		for (var i=0;i<snakeBody.length;i++){
			multiIf( snakeBody[i] )('body')('removeClass')
			snakeBody[i]=snakeBody[i+1];
		}
		

		// then making the snake appear on the screen to allow movement.
		for (var i=0; i<snakeBody.length; i++){
			multiIf( snakeBody[i] )('body')('addClass')
		}
		snakeBody[snakeBody.length-1] = nextPosition;
		$("#"+nextPosition).addClass('head');
		$("#"+currentPosition).removeClass('head');	

		//if snake's nextposition hasClass fruit. 
		//remove the fruit and make new food
		if( multiIf(nextPosition)('fruit')('hasClass') ){
			tail = snakeBody[0];
			$("#"+nextPosition).removeClass('fruit');
			makeFood();	 
		}

		// if snake's nexposition hasClass body.
		// you kill yourself!!!
		if( multiIf(nextPosition)('body')('hasClass') ){
			alert('Your Snake Die!!! Click Refresh to Play Again');
			//this clear the css from the board screen.
			for (var i=0;i<=snakeBody.length;i++){
				$("#"+snakeBody[i]).removeClass('body');

			}
			//reset snakeBody to empty and current move to empty string
			snakeBody=[];
			currentMove='';
		}

		//if snake hit the top ceiling or bottom ceiling, game over
		if( !( multiIf(nextPosition)('square')('hasClass') ) ){
			alert('Your Snake Die! Click Refresh to Play Again');
			for (var i=0;i<=snakeBody.length;i++){
				$("#"+snakeBody[i]).removeClass('body');

			}
			snakeBody=[];
			currentMove='';
		}

		
		

	};
	







$(document).ready(function(){
	
	// draw the grid board
	var count=0;
	var square = $("<div></div>").css("float","left");

	for(var i = 0; i < 60; i++) {
	    for (var j = 0; j < 60; j++){
	        $("<div class='square' id="+(j+1+count)+"></div>").appendTo(square);
	    }
	    count+=40;
	    $("<div id="+(i+1)+"></div>").css("clear", "both").appendTo(square);
	}

	square.appendTo($("#grid"));

	//then make the food appear on the board. have to be this order
	makeFood();

	// draw the snake; then draw the head
	var root = multi('grid');
	root(550).addClass('head');

	//loop to make long body 
	for( var i = 545; i <= 549; i++ ){
		root(i).addClass('body');
		snakeBody.push(i)
	}
	// push the snake head into the snakeBody array
	snakeBody.push(550);
	
	
	//move the snake and repeat by using setInterval
	setInterval(function() {
	  if (currentMove !== '') {
	    move(currentMove);
	  }
	}, 200);

	//get input from user by the keyboards such as up, down, left and right directionection
	$(document).keydown(function(e) {
		
	if (e.which === 39) {
	    currentMove = 'right';
	  } else if (e.which === 37) {
	    currentMove = 'left';
	  } else if (e.which === 38) {
	    currentMove = 'up';
	  } else if (e.which === 40) {
	    currentMove = 'down';
	  }
	});
	
});