

/*
    SETUP
*/
const util = require('util');
require('util.promisify').shim();

const fs = require('fs');
const readFileAsync = util
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
const axios = require('axios');
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

let recipeData = []
async function getRecipesFromServer() {
    try {
      const response = await axios.get('http://localhost:3000/recipes');
      if (response.status === 200) {
        const recipes = response.data.recipes;
        return recipes;
      } else {
        throw new Error(`Request to BBQ Server failed with status code: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

(async () => {
try {
    const data = await getRecipesFromServer();
    recipeData = data;
} catch (error) {
    console.error(error.message);
}
})();

let tipData = []
async function getTipsFromServer() {
    try {
        const response = await axios.get('http://localhost:3000/tips');
        if (response.status === 200) {
        const tips = response.data.tips;
        return tips;
        } else {
        throw new Error(`Request to BBQ Server failed with status code: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
  }
(async () => {
try {
    const data = await getTipsFromServer();
    tipData = data;
} catch (error) {
    console.error(error.message);
}
})();

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


