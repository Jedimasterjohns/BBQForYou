

/*
    SETUP
*/
const util = require('util');
require('util.promisify').shim();

const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);
// Express
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
PORT        = 7364;                 // Set a port number at the top so it's easy to change in the future

// app.js

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
const { time } = require('console');
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

let recipeData = [
    {
        recipeID: "1",
        name: "Whole chicken",
        time: "3 hrs",
        temp: "350 F",
        ingredients: "whole chicken, SPG rub, olive oil",
        instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  nisi ut aliquip ex ea commodo consequat.",
    },
    {
        recipeID: "2",
        name: "Beef Brisket",
        time: "13 hrs",
        temp: "225 F",
        ingredients: "beef brisket, SPG rub, Worcestershire sauce",
        instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  nisi ut aliquip ex ea commodo consequat.",
    },
    {
        recipeID: "3",
        name: "Chicken leg lollipops",
        time: "1.5 hrs",
        temp: "400 F",
        ingredients: "chicken drumsticks, bbq sauce, honey, SPG rub, hot bbq rub",
        instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  nisi ut aliquip ex ea commodo consequat.",
    },
    {
        recipeID: "4",
        name: "Teriyaki flank steak",
        time: "1 hr",
        temp: "400 F",
        ingredients: "flank steak, ter",
        instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  nisi ut aliquip ex ea commodo consequat.",
    },
    {
        recipeID: "5",
        name: "Pulled pork",
        time: "13 hrs",
        temp: "225 F",
        ingredients: "pork shoulder, SPG rub, mustard",
        instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  nisi ut aliquip ex ea commodo consequat.",
    },
    {
        recipeID: "6",
        name: "Beer brats",
        time: "2 hrs",
        temp: "325 F",
        ingredients: "brats, pilsner beer, onions",
        instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  nisi ut aliquip ex ea commodo consequat.",
    },
    {
        recipeID: "7",
        name: "Dino ribs",
        time: "6 hrs",
        temp: "225 F",
        ingredients: "beef plate ribs, SPG rub, olive oil",
        instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  nisi ut aliquip ex ea commodo consequat.",
    }
]

tipData = [
    {
        tipID: "1",
        protein: "Chicken",
        tipText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
        tipID: "2",
        protein: "Beef",
        tipText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
        tipID: "3",
        protein: "Lamb",
        tipText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
        tipID: "4",
        protein: "Beef",
        tipText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
        tipID: "5",
        protein: "Pork",
        tipText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
        tipID: "6",
        protein: "Fish",
        tipText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    }
]

function deleteRecipeById(recipes, recipeID) {
    let index = -1;
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].recipeID === recipeID) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
        recipes.splice(index, 1);
    }
}

function updateRecipeById(recipes, recipeID, updatedRecipe) {
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].recipeID === recipeID) {
        recipes[i] = {...recipes[i], ...updatedRecipe};
        break;
      }
    }
}

function deleteTipById(tips, tipID) {
    let index = -1;
    for (let i = 0; i < tips.length; i++) {
      if (tips[i].tipID === tipID) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
        tips.splice(index, 1);
    }
}

function updateTipById(tips, tipID, updatedTip) {
    for (let i = 0; i < tips.length; i++) {
      if (tips[i].tipID === tipID) {
        tips[i] = {...tips[i], ...updatedTip};
        break;
      }
    }
}

/*
    ROUTES
*/

app.get('/', function (req, res) {
    
    res.render('home');

});
app.get('/home', function (req, res) {

    res.render('home');

});

app.get('/recipesH', function (req, res) {

    let data = recipeData;
    res.render('recipesH', { data: data });
});

app.post('/add-recipe-form', function (req, res) {

    const addRecipe = {
        recipeID: recipeData.length + 1,
        ...req.body,
    };

    recipeData.push(addRecipe);
    res.redirect('/recipesH');
});

app.post('/delete-recipe-form', function (req, res) {

    console.log(req.body);

    deleteRecipeById(recipeData, req.body.deleteRecipeID);
    console.log("recipeData ", recipeData);
    res.redirect('/recipesH');
});

app.post('/update-recipe-form', function (req, res) {

    updateRecipeById(recipeData, req.body.recipeID, req.body);
    res.redirect('/recipesH');
});

app.get('/tipsH', function (req, res) {

    let data = tipData;
    res.render('tipsH', { data: data });
});

app.post('/add-tip-form', function (req, res) {

    let addTip = {
        tipID: tipData.length + 1,
        ...req.body,
    };

    tipData.push(addTip);
    res.redirect('/tipsH');
});

app.post('/delete-tip-form', function (req, res) {

    deleteTipById(tipData, req.body.deleteTipID);
    console.log("tipData ", tipData);
    res.redirect('/tipsH');
});

app.post('/update-tip-form', function (req, res) {

    updateTipById(tipData, req.body.tipID, req.body);
    res.redirect('/tipsH');
});
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});


