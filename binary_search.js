// Created By: Jacob Bonner
// Created On: January 2021
// This program generates 250 random numbers in an array and allows 
//   the user to search the array for a number.

// Defining prompt for getting user input
const prompt = require('prompt-sync')({sigint: true});

// This function uses binary search to search an array for a specific number
function binarySearch(userArray, userNumber, lowIndex, highIndex) {
  // Checking if the lowest index is greater than the high index
  if (lowIndex > highIndex) {
    // Returning that the number could not be found in the array
    return "Number Not Found";
  } else {
    let middleIndex  = Math.floor((lowIndex + highIndex) / 2);

    // Searching for number in array using if statements and recursion
    if (userArray[middleIndex] < userNumber) {
      return binarySearch(userArray, userNumber, middleIndex + 1, highIndex);
    } else if (userArray[middleIndex] > userNumber) {
      return binarySearch(userArray, userNumber, lowIndex, middleIndex - 1);
    } else {
      // Returning the index spot of the number in the array
      let answer = middleIndex;
      return answer;
    }
  }
}

// This function sorts an array and passes it back to the user
function sort(array) {
  // Sorting the array
  for (let arrayCounter = 0; arrayCounter < array.length; arrayCounter++) {
    for (let sortCounter = arrayCounter + 1; sortCounter < array.length; 
         sortCounter++) {
      if (array[arrayCounter] > array[sortCounter]) {
        let swapNumber = array[sortCounter];
        array[sortCounter] = array[arrayCounter];
        array[arrayCounter] = swapNumber;
      }
    }
  }
  // Returning newly sorted array
  return array;
}

try {
  // Initializing the array of random numbers
  let randomNumberArray = new Array(250);

  // Adding random numbers to the array
  for (let counter = 0; counter < randomNumberArray.length; counter++) {
    randomNumberArray[counter] = Math.floor(Math.random() * 
                                            ((999 - 1)) + 1) + 1;
  }

  // Sorting the array
  var numberArray = sort(randomNumberArray);

  // User input for what number they want to search for
  const searchInput = prompt("What number are you searching for in the array" +
                              " (integer between 0 and 999): ");
  console.log();

  // Ensuring the user's input is a number
  const searchNumber = parseFloat(searchInput, 10);

  // Ensuring the user input is valid
  if (Number.isInteger(searchNumber) == false) {
    // Throwing an error
    throw "ERROR: Invalid Input";
  } else {
    // Ensuring user inputs a number in the specified range
    if (searchNumber < 0 || searchNumber > 999) {
      // Throwing an error
      throw "ERROR: Invalid Input";
    } else {
      // Printing out each value in the array
      let printList = "Array of Numbers: ";
      for (let printCounter = 0; printCounter < numberArray.length; 
           printCounter++) {
        printList = printList + numberArray[printCounter] + ", ";
      }
      console.log(printList);

      // Using binary search to find the user's chosen number in the array
      let searchResult = binarySearch(numberArray, searchNumber,
                                      0, numberArray.length - 1);

      // Outputting the results of the search
      console.log();
      console.log("Your number is in index:", searchResult);
    }
  }

  // Catches and tells the user what error occured
} catch (err) {
  console.log("ERROR: Invalid Input");
}
