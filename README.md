# Angular events App

# General Info

This is an Angular 14 Web App with a custom api server
The app is a collection an angular events (conferences, meetups, etc) that can be browsed, searched for and edited by a user

# Features included

1. Ability to add new events, their sessions and save them in the backend
2. User authentication with login, user data management & logout
3. Route navigation through different URL parameters and route guarding
4. Custom validators, pipes & sorts
5. Possibility to sort events' data and give likes to sessions (only for authenticated users)

# Technologies used

1. Angular 14
2. Bootstrap 4
3. SASS as preprocessor
4. Karma & Jasmine for unit & integration testing
5. Cypress for E2E testing
6. GitHub Actions for CI/CD Pipeline
7. ESLint for linting

# To start the app:

server has to be started in a separate console. So use:

1. ng serve --proxy-config proxy.conf.json
2. npm run server
