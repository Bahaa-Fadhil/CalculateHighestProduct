// Bind cont function to div 'id' in Html elements
const $functionVar = $("#product");
const $functionNum = $functionVar.find(".NumValue");

// Bind the class NumValue to evaluate
$functionNum.on("click", "input[type=submit]", function (e) {
  e.preventDefault();
  let $productLoop = $(this).parent();
  // Hide the error when it appears
  displayError($productLoop, false); 
  let $input = $productLoop.find("input[type=text]");
  let $result = $productLoop.find(".result");

  // Convert then entered number to Array
  let input = $input.val();
  // If there is a comma, than seperate by that
  // If there is not, than it must be a space seperator
  let seperator = input.indexOf(",") !== -1 ? "," : " ";
  let inputArray = $input.val().split(seperator).map((num) => Number(num));
  // test log
  console.log("inputArray: ", inputArray);
  console.log("inputArray: ", Array.isArray(inputArray));
  console.log("inputArray: ", inputArray.findIndex(Number.isNaN));
  // Check if it is not an ture array or nan number
  if (!Array.isArray(inputArray) || inputArray.findIndex(Number.isNaN) !== -1) {
    console.log("not an Array or NaN detected");
    displayError($productLoop);
  }
  // Show the results
  $result.text(calculateHighestProduct(inputArray));
});

// Calculate Highest Product/number function from the input Array
function calculateHighestProduct(inputArray) {
 // Sort the array list & define the highest three number
  let sortedArray = inputArray.sort((a, b) => a - b);
  let highestThree = inputArray.slice(inputArray.length - 3, inputArray.length);
 // console.log(highestThree);
 // Show highest three numbers user has entered
 document.getElementById("highest").innerHTML = highestThree.toString();
 return highestThree.reduce((accum, int) => accum * int);
}

// Function to handel and display Error
function displayError($productLoop, shouldDisplay = true) {
  if (shouldDisplay) {
    // Show the error
    console.log("show error");
    $productLoop.find(".error").removeClass("d-none");
  } else if (!shouldDisplay) {
    // Hiden if not error
    console.log("hide error");
    // Show danger error msg
    $productLoop.find(".error").addClass("d-none");
  }
}
