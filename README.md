This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites
1. An adequate version of Node.js should be installed.
2. An adequate version of npm should be installed


## Instructions for how to run, test and build 

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Then app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.



## Features in the App
•	This is a single page app and bootstrapped using with Create React App
•	Autocomplete plugins are not used in the app
•	This app avoids scrollbars and displays only max of 10 autocomplete suggestions
•	In order to reduce Visual noise, I added healthy amount of padding between the autocomplete suggestions
•	It has another feature which supports keyboard Navigation
•	Autocomplete suggestions is highlighted and invokes the Hand cursor when you hovered on the list
•	You will be directed to products page when you click search icon after selecting any one of suggestions

## Work Progress Report
•	Initially I found duplicate data in Json file. So, in order to eliminate the duplicates, I have implemented a function called <font color="green">removeDuplicates </font>which takes json file as input and generates an Array of objects named it as uniqueproducts
•	Implemented a function called <font color="green">handleUserInput</font> which takes the input from keyboard and initializes the autocompleteSuggestions array with collection of products that matches with user input
•	In order to support <b>keyboard Navigation</b>, I implemented a function called <font color="green">handleKeyPress</font> which gets triggered when keyboard is used
•	<font color="green">findLink</font> is an onclick function which is placed on search icon in search bar. This function takes the user to suggested product page when user clicks on search icon
•	In the end verified the functionality of application as required


