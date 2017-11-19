/*
left 37
up 38
right 39
down 40
*/
window.onload = function() {

  var Snake = (function() {
  
    var canvas = document.getElementById('feild');
    var feild = canvas.getContext('2d');
  
    var coords = [300,300];
	
    var pastCoords = [];
  
    var segments = ['1'];
  
    var fruitCoords = [];
  
    var fruitExists = false;
  
    var direction = 'right';
	
	function tailBiteCheck() {
	  for (i = 0; i < pastCoords.length; i++) {
        if (coords[0] === pastCoords[i][0] && coords[1] === pastCoords[i][1]) {
          console.log('Tail bitten');
		  return true
        }
		else {
          return false;
        }
      }
	}   
    
	function collisionCheck() {
      if (coords[0] < 0 || coords[0] > canvas.width || coords[1] < 0 || coords[1] > canvas.height) {
        console.log('You\'ve hit the wall');
		console.log('x: ' + coords[0] + ' ' + 'Canvas width: ' + canvas.width + ' ' + 'y: ' + coords[1] + ' ' + 'Canvas height: ' + canvas.height);
		return true;
      }
      else {
        return false;
      }
    }	  
	
	function createFruit() {
	  if (!fruitExists) {
	    fruitCoords = generateRandomCoords();
		
		console.log('Fruit coordinates are: ' + fruitCoords);
		
		fruitExists = true;
	  }
      
	  feild.fillStyle = '#0f0';
	  feild.fillRect(fruitCoords[0], fruitCoords[1], 20, 20);
	  
      if (coords[0] === fruitCoords[0] && coords[1] === fruitCoords[1]) {
        feild.clearRect(fruitCoords[0], fruitCoords[1], 20, 20);
		
		fruitExists = false;
		
        segments.push(toString(segments.length + 1));
		
		updatePastCoords();
      }		
	}
	
	function changeDirection(e) {
	  e = window.event;
	  
	  if (e.keyCode === 37) {
        direction = 'left';
        console.log('Moving left');		  
	  }
	  else if (e.keyCode === 38) {
		direction = 'up';
	    console.log('Moving upwards');
	  }
      else if (e.keyCode === 39) {
        direction = 'right';
	    console.log('Moving right');
      }
      else if (e.keyCode === 40) {
        direction = 'down';
        console.log('Moving downwards');
      }
    }
	
	function moveHead() {
	  updatePastCoords();
	 
	  if (direction === 'up') {
	    coords[1] -= 20;
	  }
      else if (direction === 'down') {
		coords[1] += 20;
      }
      else if (direction === 'left') {	  
	    coords[0] -= 20;
	  }
	  else if (direction === 'right') {
	    coords[0] += 20;
	  }	
	  
	  console.log('Head moved');
	}  
	  
	function paintSnake(origin) {
	  feild.fillStyle = '#00f'
	  feild.fillRect(origin[0], origin[1], 20, 20)
	  
	  for (var i = 0; i < segments.length; i++) {
	    feild.fillStyle = '#00f';
	    feild.fillRect(pastCoords[i][0], pastCoords[i][1], 20, 20);
	  }
	  
	  console.log('Snake painted');
    }	  
	
	function updatePastCoords() {
	  pastCoords.push([coords[0], coords[1]]);
	  
	  if (pastCoords.length > segments.length) {
	    pastCoords.splice(0,1);
		console.log('Past Coordinates spliced');
	  }
      
      console.log('Past coordinates are: ' + pastCoords);	  
    }  
	
	function generateRandomCoords() {
	  var x = Math.round(Math.floor(Math.random() * (canvas.width - 19) / 20)) * 20;
	  var y = Math.round(Math.floor(Math.random() * (canvas.height - 19) / 20)) * 20;
	  
	  console.log('Coordinates generated: ' + [x,y]);
	  
	  return [x,y];
	}
	
	function tick() {
	  feild.clearRect(0, 0, canvas.width, canvas.height);
	  
	  document.addEventListener('keydown', changeDirection, false);
	
	  moveHead();
	  createFruit();
	  paintSnake(coords);
	  
	  if (collisionCheck() || tailBiteCheck()) {
        alert('GAME OVER');
      }
      else {	  
	    console.log('tick initialized');
	    setTimeout(tick, 100);
	  }
	}
	
	return {
	  init: function() {
	    tick();
      }		
	}
  })()
  Snake.init();
  console.log('Snake initialized');  
};
