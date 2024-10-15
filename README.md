# HeavenStore :

> This repo contains only the Frontend of this Ecom Application.
> If you wish to check the backend work that is done, click here: ![Ecom Backend](https://github.com/Ash-0803/ecom-backend)

This project is not deployed yet, but if you wish to see the working demo, you may look at the preview below.

## Preview :

Functionality is the same, but the UI has been changed, for the changed UI, I am including screenshots!
|:-------------------------:|:-------------------------:|:-------------------------:|
|![Preview of the landing page gif](https://github.com/Ash-0803/thehavenstore/blob/master/gifs/LandingPage.jpg) blah | ![Preview of the landing page gif](https://github.com/Ash-0803/thehavenstore/blob/master/gifs/ShoeImage.jpg)|![Preview of the landing page gif](https://github.com/Ash-0803/thehavenstore/blob/master/gifs/Catalog.jpg)|

## Landing Page:

![Preview of the landing page gif](https://github.com/Ash-0803/thehavenstore/blob/master/gifs/Preview.gif)

## Login And Signup :

You can login and sign up in the application and the user will be registered on signup in the database. All of these functionalities are working for now, using a data.json, which will later be changed to the mongoDB.

![Preview of the landing page gif](https://github.com/Ash-0803/thehavenstore/blob/master/gifs/Login.gif)

## Pagination and Filters :

Using the api calls, the pagination divides the data into a number of pages. And the filters are managed through the same api call.
This allows the app to be more dynamic and flexible by allowing to manage both the pagination and filtering.

![Pagination and Filters gif](https://github.com/Ash-0803/thehavenstore/blob/master/gifs/Pagination%20and%20category%20filter.gif)

# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, executing:

```javascript
npm i
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

> Previously, this app used to run with the help of json server, but now, I have made it's backend functionally, so you'll have to run the backend alongside too, which you can find here : ![Ecom Backend](https://github.com/Ash-0803/ecom-backend)

If you still wish to just see the demo of this app without using the backend,follow these steps:

### Using the json-server

1. you can use json-server with the help of command:

   ```javascript
   npm json
   ```

2. You'll have to go to the file,
   ##### _`thehavenstore/src/app/constants.js`_
   <br>
3. and change the BACKEND_URL:

   ```javascript
   export const BACKEND_URL = "http://localhost:8080";
   ```

   The page will reload when you make changes.\
   You may also see any lint errors in the console.
