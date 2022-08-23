# Time Tracker

## Description

Time Tracker is an application that allows you to track and visualize how much time you've spent. You create categories and then select a category to put time into. You run the timer and hit complete when you don't want to track time anymore. Your time is then updated with the appropriate category. Your total time for each category is then displayed on the homepage. You can add or delete entries simply by clicking into a category. This page will allow you to create, update, or delete entries.

## Challenges
I expect creating a timer might pose a challenge. More specifically, tracking the time properly once the timer is paused. Also, authentication and seperating the data for different users.

## MVP
- Captures time from timer
- Ability to create categories
- Displays accumulated times
- CRUD actions for updating category items

## POST MVP
- Dark mode
- Export logs
- Select specific time periods
- Display data in charts
- Garden grows on how much time is added
- Mobile & Tablet Responsive design
- User creation
- User autherization


## Feature List
1. List of the apps functionality

## Entity Relationship Diagram (SQL only)
1. diagram of the database tables, schemas, and relations. You can draw them by hand or try on of these useful links for ERDs

## API Endpoint Documentations
1. list of all of your servers routes, the structure of requests that you expect and the structure of responses they send.

## Wireframes

### Home Page
Home page for the app. It allows the user to start tracking their time with the timer. You select a category to have the time go to and press "start". Once the user is ready they can press submit to log their time. Each category starts with its name, then total time accumulated, and lastly icons to edit the logs of a category or to delete the entirely.

![home diagram](.readme/wireframes/desktop-home.png)

![home create diagram](.readme/wireframes/desktop-create-category.png)

![home delete diagram](.readme/wireframes/desktop-delete-category.png)


### Log Page
The log page is used for getting the various logs associated with a given category. Here we can add, update, or delete logs.

![log page list](.readme/wireframes/desktop-log-list.png)

![creating a log](.readme/wireframes/desktop-create-log.png)

![updating a log](.readme/wireframes/desktop-update-log.png)

![deleting a log](.readme/wireframes/desktop-delete-log.png)

## Component Hierarchy
1. Wireframes should be broken into components which then should be described in a component hierarchy.

## Dependencies
link to any project dependencies (e.g. 3rd party APIs, libraries, linter, etc).

1. Create React App
2. Axios
