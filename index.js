const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';
const newRecipe = {
  title: 'Icecream',
  level: 'Easy Peasy',
  ingredients: ['eggs', 'bacon'],
  cuisine:'Spanish',
  dishType: 'main_course',
  image : 'https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg',
  duration: 20,
  creator: 'Denis',
};
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    
    return Recipe.create(newRecipe);
  })
  .then((recipe) => {
    console.log(`Add recipe: ${recipe.title}`);
  })
    .then(() => {
      return Recipe.insertMany(data);
    })
    .then((recipes) => {
      recipes.forEach((recipe) => {
        console.log(`Add recipe: ${recipe.title}`);
      });
      return Recipe.findOneAndUpdate(
        { title: 'Rigatoni alla Genovese' },
        { duration: 100 },
        { new: true }
      );
    })
    .then(updatedRecipe => {
      console.log(`Successfully updated recipe: ${updatedRecipe.title}`);
      return Recipe.findOneAndDelete({title: 'Carrot Cake'});
    })
     .then(result=>{
      console.log(result)
      return mongoose.connection.close();
    })
    .then(() => console.log(`connection closed`))
    
  .catch(error => {
  console.error('Error connecting to the database', error);
 })
  //.finally(() => {
  //  mongoose.connection.close();
  //});