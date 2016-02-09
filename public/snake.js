
SNAKE=[];

function drawGrid(x,y){
	var count=0;
	var $container = $("<div></div>").css("float","left");

	for(var i = 0; i < x; i++) {
	    for (var j = 0; j < y; j++){
	        $("<div id="+(j+1+count)+"></div>").addClass("box").appendTo($container);
	    }
	    count+=40;
	    $("<div id="+(i+1)+"></div>").css("clear", "both").appendTo($container);
	}

	$container.appendTo($("#content"));
}

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

function initialSnake(){

	var root = multi('content');
	root(550).addClass('snakeHead');
	root(549).addClass('snake');
	root(548).addClass('snake');
	SNAKE.push(548, 549, 550);
	

}


function makeFood(){
	var fruitID = Math.floor(Math.random()*1600)+1;
	$("#content").find("#"+fruitID).addClass('fruit');
}

function snakeDirection(){
	var currentMove = '';

	setInterval(function() {
	  if (currentMove !== '') {
	    move(currentMove);
	  }
	}, 100);

	$(document).keydown(function(event) {
	  if (event.which === 39) {
	    currentMove = 'r';
	  } else if (event.which === 37) {
	    currentMove = 'l';
	  } else if (event.which === 38) {
	    currentMove = 'u';
	  } else if (event.which === 40) {
	    currentMove = 'd';
	  }
	});
	var move = function(dir){
		var currentID = SNAKE[SNAKE.length-1];
		var nextID;
		
		if( dir === 'r'){
			 nextID = currentID+1;
		}
		else if( dir === 'l'){
			 nextID = currentID-1;
		}
		else if( dir === 'u'){
			 nextID = currentID - 40;
		}
		else if( dir === 'd'){
			 nextID = currentID + 40;
		}

		var tail = 0;
		if( multiIf(nextID)('fruit')('hasClass') ){
			tail = SNAKE[0];
			$("#"+nextID).removeClass('fruit');
			makeFood();	 
		}

		if( multiIf(nextID)('snake')('hasClass') ){
			alert('Game over!');
			for (var i=0;i<=SNAKE.length;i++){
				$("#"+SNAKE[i]).removeClass('snake');

			}
			SNAKE=[];
			currentMove='';
		}
		if( !( multiIf(nextID)('box')('hasClass') ) ){
			alert('Game over!');
			for (var i=0;i<=SNAKE.length;i++){
				//remove snake from [i]
				$("#"+SNAKE[i]).removeClass('snake');

			}
			SNAKE=[];
			currentMove='';
		}

		for (var i=0;i<SNAKE.length;i++){
			$("#"+SNAKE[i]).removeClass('snake');
			SNAKE[i]=SNAKE[i+1];
		}
		if (tail !== 0){
			SNAKE.unshift(tail);
		}

		for (var i=0; i<SNAKE.length; i++){
			$("#"+SNAKE[i]).addClass('snake');
		}
		SNAKE[SNAKE.length-1] = nextID;
		$("#"+nextID).addClass('snakeHead');
		$("#"+currentID).removeClass('snakeHead');	

	};
	
}



$(document).ready(function(){
	drawGrid(40,40);
	initialSnake();
	makeFood();
	snakeDirection();
});