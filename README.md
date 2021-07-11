# Recipe app: Chop 'n' Change - Meals made easy

Chop 'n' Change - a mobile-responsive recipe app that allows users to search for recipes by ingedients and filter by diet type, dietary restrictions and meal type.  

# Table of Contents
- [Project description](#project-description)
  * [Main features](#main-features)
  * [Mockup](#mockup)
  * [User stories](#user-stories)
    + [User story 1](#user-story-1)
      - [Acceptance Criteria](#acceptance-criteria)
    + [User Story 2](#user-story-2)
      - [Acceptance criteria](#acceptance-criteria)
    + [User Story 3](#user-story-3)
      - [Acceptance Criteria](#acceptance-criteria-1)
    + [User Story 4](#user-story-4)
      - [Acceptance criteria](#acceptance-criteria-1)
  * [Credits](#credits)

# Project Description

Chop 'n' Change is a recipe app for home-cooks looking for meal inspirations that use ingredients already on-hand, with the option to find recipes that suit dietary needs. The app is designed to provide users easy access to recipes they love through their Favourites list, add ingredients from recipes to create a shopping list, and find the nearest supermarket location.

The app can be used on desktops, tablets and mobiles, and was created using:

* Bulma CSS Framework for layout and styling
* JavaScript and REACT for functionality
* Recipe search API [EDAMAM](https://www.edamam.com/)
* [Google Maps API](https://developers.google.com/maps)

## Main Features

* Search for recipes using ingredient search terms
* Easily add recipes to a Favourites list 
* Add recipe ingredients to a shopping list with ease
* Quick access to recipe information, favourites list and shopping list via pop-up Modals
* Easy access to the Favourites list and shopping list from the navigation menu
* Add or remove items from the Favourites and shopping lists with a simple click 
* Get a quick view of recipe information, and visit the external recipe page for more details by clicking on a recipe in the search results

## Mockup 
The following animation shows the web application's appearance and functionality:
![app demo](./public/img/app_demo.gif)


## User Stories

### User Story 1
```
AS A home-cook
I WANT to be able to find recipes based on ingredients I have at home on any device  
SO THAT I can cook a dish without having to buy any additional ingredients
```
#### Acceptance Criteria
```
GIVEN I need to find recipe ideas based on ingredients I have
WHEN I search by ingredients
THEN I am presented with a list of recipes that match my search
WHEN I click one of the links in the navigation
THEN the UI opens up the corresponding section as a modal
WHEN I click on a search result
THEN I am presented with a quick overview of the recipe via a modal, with information on ingredients, dietary information and meal type, and the option to get full details of the recipe via external link
WHEN I resize the page or view the site on various screens and devices
THEN I am presented with a responsive layout that adapts to my viewport
```
### User Story 2
AS A home-cook
I WANT to filter my search results
SO THAT I can narrow down my search and find recipes that match my needs

#### Acceptance Criteria
```
GIVEN I need to find a recipe based on specific ingredients and needs
WHEN I search by ingredients, and filter by available options (dietary requirements, diet type and meal type)
THEN I am presented with a list of recipes that match my search
```
### User Story 3
```
AS A home-cook, 
I WANT to save a good recipe to my list of favourites
SO THAT I can find it in the future to cook again
```
#### Acceptance Criteria
```
GIVEN I need to save recipes I like from my search
WHEN I click on the favourite icon in the search results or in the recipe view pop-up modal
THEN the recipe gets added to my favourite list
WHEN I click one of the links in the favourite list
THEN the UI opens up a recipe view pop-up modal which gives me a quick overview of the recipe, option to add ingredients to shopping list and a link to an external site
WHEN I click on the delete icon on a recipe item
THEN that recipe is removed from my list
```
### User Story 4
```
AS A home-cook, 
I WANT to create a shopping list for a selected recipe 
SO THAT I can have a list of the ingredients I need to buy 
```
#### Acceptance criteria
```
GIVEN I need to add ingredients from a recipe to my shopping list
WHEN I click on the shopping cart icon in the search results or in the recipe view pop-up modal
THEN recipe ingredients gets added to my shopping list
WHEN I click on an ingredient item in the list
THEN that ingredient is removed from my list
WHEN I click on the map icon 
THEN I am presented with the nearest supermarket locations
WHEN I select a location
THEN Google Maps opens as a separate tab with the supermarket location
```

## Credits

- [FontAwesome](https://fontawesome.com/)
- [Node.js](https://nodejs.org/en/)
- [Ecotrust Canada GitHub](https://ecotrust-canada.github.io/markdown-toc/)
- [Unsplash](https://unsplash.com/photos/-YHSwy6uqvk)
