$(document).ready(function(){
  var solution1 = [1,4,5,6,2,7,8,3,9,2,9,6,3,4,8,7,1,5,7,3,8,5,9,1,4,2,6,3,7,9,2,8,6,5,4,1,8,2,4,1,5,3,6,9,7,5,6,1,4,7,9,2,8,3,9,1,7,8,6,2,3,5,4,4,8,3,7,1,5,9,6,2,6,5,2,9,3,4,1,7,8];
  var target_square;
  var temp_space;
  var table = $('#number_table');
  var game_board = $('.game');
  var easy_button = $('#easy')
  var med_button = $('#medium')
  var hard_button = $('#hard')
  var button_click;
  var temp_but;
  var ref = 0;
  table.hide();

var easy = function(){
  button_click = $('#easy')
    button_click.click(function(){
    game_start(solution1, 2, 5)
  })
}

var medium = function(){
  button_click = $('#medium')
    button_click.click(function(){
    game_start(solution1, 4, 6)
  })
}

var hard = function(){
  button_click = $('#hard')
  button_click.click(function(){
    game_start(solution1, 6, 8)
  })
}

function getRandomArbitrary(min, max) { // grabs random number for difficutly measurment 
  return Math.random() * (max - min) + min;
}

var refresher = function(count){ //method to refresh the board if game start is clicked more then once
  if(count >= 2){
    console.log(count)
    location.reload();
    window.location.reload(true)
  }
}

var game_start = function(array, min, max){ //just need to be able to change min,max // need to select buttons // edit diff
    // ref = ref + 1
    // console.log(ref)
    var count = 0 // correct for real fucntion
    // var count = 0 // test count for check function
     $(".game td").each(function(){
      var difficulty = Math.floor(getRandomArbitrary(min,max))
      $(this).html('')
      if(count % difficulty === 0){
        $(this).html(array[count]);
        console.log(difficulty)
        count = count + 1
      }else{
        count = count + 1
      }
     })
}

// method to delete items from box incase of mistakes 
var delete_item = function(button, square){ // deletes item from td's
  var blank = ''
    square.css('background-color', 'yellow') // yellow selection preprs td for deletion 
      $('#delete').click(function(){
        if (square.length >= 1){
            square.html(blank);
            target_square.css('background-color' , '')
        }
      })
}

// method to check arrays of solution vs entered numbers 
var check_sul = function(old_array, button){ // needs work // still not working =( // 
  button.click(function(){ // creates two new arrays 
    var new_array = []
    var arr = []
    for(i=0; i <= old_array.length -1; i++){
      arr.push(old_array[i].toString());
      // console.log(arr)
    }
    $(".game td").each(function(){
        new_array.push($(this).html().replace('<td>', '').replace('</td>', ''));
    })
    console.log(new_array)
    console.log(arr)
    arraysEqual(new_array, arr, successfull_game, unsuccessfulL_game) // checks the arrays to make sure they are equal 
    
  })
}

//method to check if two arrays are equal to eachother
var arraysEqual = function(arr1, arr2, callback1, callback2){ // takes two functions callback/ callback2 for displaying win/lose statments
  var step = 0
  if(arr1.length == arr2.length){
    for(var j = 0; j <= arr2.length -1; j++){
      if(arr2[j] == arr1[j]){
        step = step + 1
        console.log(step)
          if(step == arr2.length){
            callback1('winner!') // display winner
          }else if(step <= arr2.length){
            callback2('loser!') // display loser
            console.log('loser')
        }
      }
    }
  }
}

// method to display successfull game
var successfull_game = function(string){
  if(string == 'winner!'){
  $('#sul_box').fadeIn(5000).html('Congratulations! You have Solved the Puzzle!').css('color' , 'green');
  }
  $('sul_box').fadeOut(5000);
}

// method to display unsuccessfull game
var unsuccessfulL_game = function(string){ // needs work on animation
  if(string == 'loser!'){
    $('#sul_box').fadeIn(5000).html('Incorrect Solution, Please Keep trying!').css('background-color', 'black').css('color', 'purple')
    console.log('loser')
  }
  $('#sul_box').fadeOut(50000);
}

var add_to_square = function(square, number){ // add number to td
  console.log(number)
  // var clone_num = number.clone()
  // console.log(square.html())
  square.html(number); // vooodoooooo in this line 'its creating <td> number <td>' in the transfur 
  // console.log(square.html())
  table.fadeOut();
  target_square.removeClass('make_red')
}

var valid_click = function(html){ // makes sure its can be added
  // if(event_count1 <= 1){
    if(html.length < 1){ // checks selected square to see if it's populated with html
      table.fadeIn(); // fade in selection table
      target_square.addClass('make_red'); // add color to selected square, through class
         table.delegate('td', 'click', function(e){ 
          temp_space = $(e.target).html(); // select square from box 1-9
          add_to_square(target_square, temp_space) // may need to select html out of target_space before it;s passed into add_to_square function
        });
    }
    else{ // if square already has html, run delete item.
    delete_item($('#delete'), target_square);
    }
  // }else{ // attempt to keep 1 box highted red at once
  //   target_square.removeClass('make_red')
  // }
}

//funtions that start game !
refresher(ref); // makes sure that you cant click start buttons twice
easy();
medium();
hard();
check_sul(solution1, $('#check'));
game_board.on('click', 'td', function(event){
    target_square = $(event.target); // td clicked
    var temp_html = target_square.html();
    valid_click(temp_html);
  });
});