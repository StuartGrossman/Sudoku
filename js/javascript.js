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
  table.hide();

var easy = function(){
  difficulty = getRandomArbitrary(3, 5)
  button_click = $('#easy')
}

var medium = function(){
  difficulty = getRandomArbitrary(4, 6)
  button_click = $('#medium')
}

var hard = function(){
  difficulty = getRandomArbitrary(5, 7)
  button_click = $('#hard')
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

var game_start = function(button, array){ //just need to be able to change min,max
  button.click(function(){
    var count = Math.floor(getRandomArbitrary(0,6)) // correct for real fucntion
    // var count = 0 // test count for check function
     $(".game td").each(function(){
      var difficulty = Math.floor(getRandomArbitrary(3,6))
      $(this).html('')
      if(count % difficulty === 0){
        $(this).html(array[count]);
        count = count + 1
      }
        else{
        count = count + 1
      }
     })
  })
}

var delete_item = function(button, square){ // deletes item from td's
  var blank = ''
        square.css('background-color', 'yellow')
        $('#delete').click(function(){
          if (square.length >= 1){
            square.html(blank);
            target_square.css('background-color' , 'white')
          }
        })
}

var check_sul = function(old_array, button){ // needs work // still not working =(
  button.click(function(){
    var new_array = []
    var arr = []
    for(i=0; i <= old_array.length -1; i++){
      arr.push(old_array[i].toString());
      // console.log(arr)
    }
    $(".game td").each(function(){
        new_array.push($(this).html());
    })
    console.log(new_array)
    console.log(arr)
    arraysEqual(new_array, arr, successfull_game, unsuccessfulL_game)
    
  })
}
var successfull_game = function(string){
  if(string == 'winner!'){
  $('#sul_box').hide()
  $('#sul_box').html('Congratulations! You have Solved the Puzzle!').css('color' , 'green');
  $('#sul_box').fadeIn(5000)
  }
}

var unsuccessfulL_game = function(string){
  if(string == 'loser!'){
     $(".game td").each(function(){
      if($(this).html() == ''){
        $(this).css('background-color' , 'pink')
      }
    })
  }
}

var arraysEqual = function(arr1, arr2, callback, callback2){
  var step = 0
  if(arr1.length == arr2.length){
      for(var j = 0; j <= arr2.length -1; j++){
        if(arr2[j] == arr1[j]){
          step = step + 1
          if(step == arr2.length){
            callback('winner!')
          }else{
            callback2('loser!')
          }
        }
      }
  }
}

var add_to_square = function(square, number){ // add number to td
  square.html(number.clone());
  table.fadeOut();
  target_square.css("background-color", "white")
}

var valid_click = function(html){ // makes sure its can be added
  if(html.length < 1){
    table.fadeIn();
    target_square.css("background-color" , "red");
         table.delegate('td', 'click', function(e){
          temp_space = $(e.target)
          add_to_square(target_square, temp_space)
        });
  }
  else{
    delete_item($('#delete'), target_square);
  }
}
// var which_button = function(button){
//   switch(button.click()){
//     case easy_but
//      temp_but = easy_but;
//      break;
//     case medium_but
//       temp_but = medium_but;
//       break;
//     case hard_but 
//       temp_but = hard_but;
//       break;
//   }
// }


//funtions that start game !
game_start($('#easy'), solution1, easy);
check_sul(solution1, $('#check'));
game_board.on('click', 'td', function(event){
    target_square = $(event.target); // td clicked
    var temp_html = target_square.html();
    valid_click(temp_html);
  });
});