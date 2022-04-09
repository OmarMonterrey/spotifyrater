# Spotify Rater

## About
Example WebApp to rate spotify Tracks/Albums made fully with JavaScript using React and deployed to Firebase using Firebase Functions and Spotify API as Backend.

## Example
You can find a working example at [spotifyrater.web.app](https://spotifyrater.web.app/)

## Previous knowledge
Frontend is built using CRA
[create-react-app.dev](https://create-react-app.dev/)

You can find more about Firebase deployment at
[firebase.google.com/docs/functions/get-started](https://firebase.google.com/docs/functions/get-started)
[firebase.google.com/docs/hosting/quickstart](https://firebase.google.com/docs/hosting/quickstart)

## Deployment
### Backend (/back)
- Create a firebase functions project using `firebase init functions`
- Copy `/back/` content on your project's root
- Copy `/functions/.env.example` into `/functions/.env` and fill with Spotify API key/secret pair
- Copy `/functions/config/firebase.js.sample` into `/functions/config/firebase.js` and fill with Firebase Credentials
- Run `npm install` on `/functions/` to install node packages (If you want to run emulator)
- Use `firebase deploy` to deploy search function to your firebase project

### Frontend (/front)
- CD (change directory) into `/front/`
- Copy `/config/firebase.js.sample` into `/config/firebase.js` and fill with Firebase Credentials
- Create a firebase hosting project using `firebase init hosting` (Set directory to /build/)
- Run `npm install` to install node packages
- Run `npm run start` to start a live server
- Run `npm run build` to build for production
- Run `firebase deploy` to deploy content from `/build/` to firebase hosting

## Features
- Responsive design written using [SASS](https://sass-lang.com/)
- English and Spanish based on navigator configuration thanks to [react-i18next](https://github.com/i18next/react-i18next/)
- Spotify API connection
- Component to image generation using [html2canvas](https://html2canvas.hertzen.com/)
- Emoji load and render using [node-emoji](https://github.com/omnidan/node-emoji)
- Emoji selector modal works using [SweetAlert2](https://sweetalert2.github.io/)
- Backend requests made with [Axios](https://axios-http.com/docs/intro)