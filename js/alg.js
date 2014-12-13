var make_solution = function(hold_var, callback, callback2){
	callback(hold_var);
    callback2(final_array);
  console.log(hold_var);
  console.log(final_array);
  new_arr = [];
  var i = 0;
  while(i <= 9){
    while(hold_var.length >= 1){
      var rand_num = Math.floor(getRandomArbitrary(0,hold_var.length - 1));
      var temp_num = rand_num;
      console.log(temp_num);
      console.log(hold_var[temp_num]);
      new_arr.push(hold_var[temp_num]);
      console.log(new_arr);
      hold_var.splice(temp_num, 1);
      console.log(hold_var);
    if_empty(hold_var);
      if(i == 9){
        break;
      }
    }
    i = i + 1;
    console.log(new_arr);
    console.log(i);
  }
 };

var if_empty = function(array){
  if(array.length === 0){
    make_hold_arr(array);
  }
};

var make_hold_arr = function(array){
	for(i = 1; i <= 9; i++){
		array.push(i);
	}
};
var make_final_array = function(array){
  for(i = 1; i <= 81; i++){
    array.push(0);  
  }
};
var getRandomArbitrary = function(min, max){
  return Math.random() * (max - min) + min;
};

var test = [];
var final_array = [];
make_solution(test, make_hold_arr, make_final_array);


