$(document).ready(function(){
var solution1 = [1,4,5,6,2,7,8,3,9,2,9,6,3,4,8,7,1,5,7,3,8,5,9,1,4,2,6,3,7,9,2,8,6,5,4,1,8,2,4,1,5,3,6,9,7,5,6,1,4,7,9,2,8,3,9,1,7,8,6,2,3,5,4,4,8,3,7,1,5,9,6,2,6,5,2,9,3,4,1,7,8];
var target_square;
var temp_space;
var table = $('#number_table');
var game_board = $('.game');
var difficulty = 6;
var check_arr = []
table.hide();
var easy = function(diff){
  diff = 6;
}
var medium = function(diff){

}
var hard = function(diff){

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
var arraysEqual = function(arr1, arr2){
    if(arr1.length !== arr2.length){
        return false;
      for(var i = arr1.length; i--;){
        if(arr1[i] !== arr2[i]){
            return false;
          }
      }
    }else{
      success; // calls success function
    }
}

var success = function(){
  $('#sul_box').html('You have Solved the Puzzle!');
}

var check_sul = function(old_array, new_array, button){ // needs work // still not working =(
  button.click(function(){
    var arr = []
    for(i=0; i <= old_array.length -1; i++){
      arr.push(old_array[i].toString());
      // console.log(arr)
    }
    $(".game td").each(function(){
        new_array.push($(this).html());
    })
    arraysEqual(new_array, arr)
    
  })
}

var game_start = function(button, array){ //still needs work. Populates gameboard but dosnt remove x ammount of squares
  button.click(function(){
    var count = 0
    // callback(difficulty);
     $(".game td").each(function(){
       // if(count % difficulty === 0){
        $(this).html(array[count]);
        // console.log(difficulty)
        count = count + 1
       // }
       // else{
       //  $(this).html();
       // }
     })
  })
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

game_start($('#easy'), solution1, easy);
check_sul(solution1, check_arr, $('#check'));
game_board.on('click', 'td', function(event){
    target_square = $(event.target); // td clicked
    var temp_html = target_square.html();
    valid_click(temp_html);
  });
});