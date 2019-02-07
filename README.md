# MERN SERVER
### Published App
  https://ca-mern-client.netlify.com/

### Github Repos
  Front end: https://github.com/gfrancis13/mern-client

  Back end: https://github.com/kieran-lockyer/mern-server

## Problem definition/ purpose:
We are to create a web application for a Brisbane based client. In this web application we are to use the MERN stack. For our particular product we have found a client called Sortal Management Studio. 
We have decided to go with this company for many reasons including:
  - The technical lead for this company (Ashley Davis) has over 20 years’ experience as a software engineer and from meeting with the team in person was very understanding of our needs and sympathetic to our project and compromises were made on both sides
  - The project, technologies and stack both met our requirements of the projects, our skill level as a team, while also challenging us enough to be an opportunity to learn.
  - The project also was interesting to all of us.

Sortal’s requirements were to create a dashboard to present analytics for their machine learning based cloud image storage platform.
They required being able to view and search all Photos and Tags uploaded to their platform, and to be able to view various statistics and trends around the data for business intelligence purposes.

## Functionality / Features:
### Functionality:
Our application has 3 main functions:
  - An Analytics Dashboard that allows the user to view various statistics about Sortals Tag and Photo data.
  - A Photos Dashboard that allows a user to view all the Photo data Sortal has and find further information.
  - A Tags Dashboard that allows a user to view all the Tag data Sortal has and find further information.
### Features:
#### Dashboard Analytics:
  - A bar chart that presents number of photos and tags generated on each day. Option to change the timeframe between 1 Week, 1 Month, 3 Months and 6 Months.
  - A card that shows total number of Tags in the database.
  - A card that shows total number of  Photos in the database.
  - A card that  shows current daily average new Tags per day, measured over last 7 days.
  - A card that  shows current daily average new Photos per day, measured over last 7 days.
  - A list of the top 5 most popular tags.
  - A list of the top 5 trending tags measured over the last 7 days.
#### Photos:
  - Shows a paginated list of all photos in the database.
  - List can be sorted by Date, Confidence and Tags in ascending and descending order.
  - A button to switch between table view and grid based gallery view.
  - A search bar enables filtering of photos by one or more tags. FIlter view is also sortable.
  - Clicking through next and previous pages maintains the sort order.
  - Clicking on a photo in the grid gallery presents a lightbox modal to view the full sized image and a list of tags underneath.
  - Table view contains an image thumbnail, date added and confidence of the main tag.
#### Tags:
  - Shows a paginated list of all tags in the database.
  - List can be sorted by Alphabetically, by Date, and by Confidence in ascending and descending order.
  - A search bar enables filtering of tags by a name. FIlter view is also sortable.
  - Clicking through next and previous pages maintains the sort order.
  - Table view contains name of tag, date added, confidence and source type.
  - Clicking on a tag shows further info about the tag including the image it’s associated with, the source model and it’s related images.

## Screenshots:
### Analytics Dashboard
![Analytics Dashboard](https://github.com/kieran-lockyer/mern-server/blob/master/docs/AnalyticsDashboard.png)
### Photos Dashboard
![Photos Dashboard](https://github.com/kieran-lockyer/mern-server/blob/master/docs/PhotosList.png)
### Photos Gallery
![Photos Gallery](https://github.com/kieran-lockyer/mern-server/blob/master/docs/PhotosGallery.png)
### Photo Item
![Photo Item](https://github.com/kieran-lockyer/mern-server/blob/master/docs/Photo%20view.png)
### Tags Dashboard
![Tags Dashboard](https://github.com/kieran-lockyer/mern-server/blob/master/docs/TagsList.png)
### Tag Item
![Tags Item](https://github.com/kieran-lockyer/mern-server/blob/master/docs/tag%20view.png)

## Instructions on how to setup, configure, deploy and use your App:
### Requirements:
  - Git
  - Node.js

### Client:
  - From a bash CLI, git clone the front end repo (Front end: https://github.com/gfrancis13/mern-client).
  - Run ‘npm install’ or ‘yarn install’
  - Run ‘npm start’ or ‘yarn start’ to start the client on port 3000

### Server:
  - From a bash CLI, git clone the back end repo (Back end: https://github.com/kieran-lockyer/mern-server)
  - Run ‘npm install’ or ‘yarn install’
  - Create a .env file in the root directory, with variables MLAB_USER and MLAB_PASS set to your MLAB database username and password.
  - Change the database url within /db/index.js to your specific MLAB url.
  - If you are not using MLAB, configure /db/index.js as instructed by your database host instructions, and change the .env variables as required.
  - Run nodemon to start the server on port 3001

### Deploying:
#### Deploying with heroku:
  - From a bash CLI, run git remote add with the name 'heroku' and link to your chosen deployment platform.
  - Run ‘git push heroku master’ to deploy.
#### Deploying with Netlify:
  - We used Netlify to deploy our front end client which allows github to link up allowing automatic deployment when a working project is pushed to github project master.
  - To implement deployment to Netlify we recommend following this guide. https://www.netlify.com/docs/

## Technology stack:
For the technology stack on this project we will be using an assortment of front and back end technologies.
  - React/Redux
  - Express/Node.js
  - MongoDB
  - Typescript
  - SCSS

### MongoDB
We’re using MongoDB to create and store Tag and Photo models, with MLAB integrated as our database host. We are using mongoose to handle the Schemas and querying the database, and mongoose-paginate-v2 to return paginated data.

### Express.js
Express is being used as the backend server which receives get requests from our React client via routes, which then sends queries to our MLAB database, returning the data to the client.
It is also temporarily hosting the photo files while Sortal builds an api to retrieve the photos.

### React/Redux
React is our front end client, rendering components to the browser that present information to the end use. It retrieves this information by sending api requests to our Express backend server, which are then stored in state using redux.
We used Typescript as requested by Sortal which has the added advantage of enforcing prop.types.

### Node
Node is the basis on which all our packages are installed and run, including the React Client and Express server.

## Design process:
Our design process began with gathering user stories from the client, and examples of their existing application, which we used to guide our wireframe designs.
Once we had the user stories, and some sample data from Sortal, we created an ERD which defined how our models were designed and how they interacted with each other.
With user stories, wireframes, erd finalised, we created a user workflow which helped define the overall scope of the project and features to include for each component on the front end to create a pleasant user experience.

## User stories:
From any page a user can:
  - Navigate to the Admin Dashboard
  - Navigate to the Photos Dashboard
  - Navigate to the Tags Dashboard
  - Navigate backwards via breadcrumbs

From the Admin dashboard a user can view the following analytics panels:
  - A graph showing photos and tags activity over time
  - Options to change timeframe of the graph
  - Total number of photos
  - Total number of tags
  - Current Average new photos per day
  - Current Average new tags per day
  - Top 5 most common tags
  - Top 5 trending tags
  
From the Photo Dashboard a user can:
  - Table View:
    - View the entire paginated list of photos with a photo thumbnail, date added, confidence and associated tags.
    - Navigate between pages of the paginated list
    - Sort by Date in ascending and descending order
    - Sort by Confidence level in ascending and descending order
    - Sort alphabetically by Tag in ascending and descending order
    - Filter photos by one or many tags.
    - Click on an image and got to Photo View
    - Switch to Grid Gallery view.
  - Grid Gallery View:
    - View a entire paginated list of photos with a photo thumbnail, and tags in a grid style.
    - Navigate between pages of the paginated list
    - Sort by Date in ascending and descending order
    - Sort by Confidence level in ascending and descending order
    - Sort alphabetically by Tag in ascending and descending order
    - Filter photos by one or many tags.
    - Click on an image to view it in full size and view full list of associated tags.
    - Switch to Table view.
    
From the Photo View a user can:
  - See large version of image
  - See date added
  - See full list of tags
  - See each tags confidence level
  - Delete the image from the database
  
From the Tag Dashboard a user can:
  - View the entire paginated list of tags with their tag name, date added, source type and confidence level.
  - Navigate between pages of the paginated list
  - Sort by Date in ascending and descending order
  - Sort by Confidence level in ascending and descending order
  - Sort alphabetically by Tag in ascending and descending order
  - Filter tags by tag name.
  - Click on a tag and got to Tag View

From the Tag View a user can:
  - View full information of the tag, including the image it’s attached to, date added, source type, source model and confidence level.
  - View a list of related tags below.
  - Delete the tag, which also removes it from it's associated Photo.


## A workflow diagram of the user journey/s:



## Wireframes:



## Database Entity Relationship Diagrams:
![ERD](https://github.com/kieran-lockyer/mern-server/blob/master/docs/ERD.jpg)

## Data Flow Diagrams:
#### GET /photos?query
![Photos](https://github.com/kieran-lockyer/mern-server/blob/master/docs/photos_query.jpg)
#### GET /photos/:_id
![Photos](https://github.com/kieran-lockyer/mern-server/blob/master/docs/photos_id.jpg)
#### GET /photos/image/:_id
![Photos](https://github.com/kieran-lockyer/mern-server/blob/master/docs/photos_image.jpg)
#### DELETE /photos/:_id
![Photos](https://github.com/kieran-lockyer/mern-server/blob/master/docs/delete_photos_id.jpg)
#### GET /tags?query
![Tags](https://github.com/kieran-lockyer/mern-server/blob/master/docs/tags_query.jpg)
#### GET /tags/:_id
![Tags](https://github.com/kieran-lockyer/mern-server/blob/master/docs/tags_id.jpg)
#### GET /tags/related/:tag
![Tags](https://github.com/kieran-lockyer/mern-server/blob/master/docs/tags_related.jpg)
#### DELETE /tags/:_id
![Tags](https://github.com/kieran-lockyer/mern-server/blob/master/docs/delete_tags_id.jpg)
#### GET /stats?query
![Stats](https://github.com/kieran-lockyer/mern-server/blob/master/docs/stats_query.jpg)
#### GET /stats/avgtags
![Stats](https://github.com/kieran-lockyer/mern-server/blob/master/docs/stats_avgtags.jpg)
#### GET /stats/avgphotos
![Stats](https://github.com/kieran-lockyer/mern-server/blob/master/docs/stats_avgphotos.jpg)
#### GET /stats/trendingtags
![Stats](https://github.com/kieran-lockyer/mern-server/blob/master/docs/stats_trendingtags.jpg)
#### GET /stats/poptags
![Stats](https://github.com/kieran-lockyer/mern-server/blob/master/docs/stats_poptags.jpg)


## Object Orientated design documentation:
![Object Orientated Diagram](https://github.com/kieran-lockyer/mern-server/blob/master/docs/Object%20Orientated%20Diagram.png)


## Project Management & Planning
### Project plan & timeline:
Our timeline was to find a client before the end of the first week so that we would have ample time to complete the clients project requirements with time to spare to prepare proper documentation and presentation materials. We did find a client within the first week with us agreeing to complete a project for Sortal on the 17th January.

Our next step was creating an ERD and fleshing out user stories with Sortal. Sortal also provided us some visual aides to help create the wireframes in a way that’s consistent with their existing platform.

Once we had an idea of what we were working on, our plan was to develop the Express Server and React Client in parallel, working on one complete feature end-to-end at a time in short sprints. We used agile methodologies and Trello to keep track of our progress. We also implemented continuous integreation tools to autmoatically deploy to our React Front End on Netlify, and deployed new features to our Express Back End on Heroku as they were completed and tested.

We planned to have completed our MVP by the 1st February, but after some changes to the structure of the data on Sortal’s end, implementing rigorous testing and perfecting some fiddly parts of the project such as maintaining sorting order while navigating pages proved more time consuming than we initially planned, and as such we didn’t finish major development until 6th February, almost a week behind schedule.

#### Overview:
  - Find a client:
    - Initial plan: 18th January
    - Completed on: 17th January
  - Create ERD, User Stories, Wireframes, User Workflow:
    - Initial plan: 22nd January
    - Completed on: 21st January
  - Working MVP:
    - Initial plan: 1st February
    - Completed on: 6th February
  - Documentation Completed:
    - Initial plan: 5th February
    - Completed on 7th February
  - Presentation Materials Finalised:
    - Initial plan: 6th February
    - Completed on: 7th February

### Client communications:
We were in constant contact with Sortal throughout the project, asking questions and providing updates and feedback.
We worked in their office at Fishburners on Thursdays in order to ask questions directly from their interns and CTO.
To keep in communication with Sortal remotely and to share resources we used Trello, Slack and Google Docs.
Google docs was particularly useful when for sharing ideas and fleshing out user stories with Sortal.

Screenshots of Trello board(s):


## Answers to the Short Answer questions:

### What are the most important aspects of quality software?
It’s ability to fulfill its intended purpose. Performing its intended purpose is the primary function of any software and as such plays the biggest role in measuring the quality of software. If it doesn’t do what it’s supposed to do, then by definition it’s poor quality.
It’s usability. A program that is a pleasure to navigate and use is of higher quality. If it can do what it’s supposed to do, but requires a lot of training, isn’t intuitive, or may be slow or difficult to use for some other reason discourages people using it.
Maintainable code will produce higher quality software. As user needs are always changing, having well maintainable code allows developers to more efficiently and more quickly implement changes to satisfy future demand. Also as all software will have undiscovered bugs, having maintainable code allows for a more efficient and speedy debugging process. Frequent updates and speedy bug fixes are things that make the end user happier and thus are a reflection of higher quality code.
Efficiency of the code in run-time is an important aspect of quality software as highly efficient code will run faster and is more scalable, especially in algorithmic or transactional processing situations. Inefficient code may work well at first, but as the use and input size scale, the software will quickly become laborious to use.
Reliability is also very important to consider when developing high quality software. Code with poor application architecture practices, bad error or exception handling, poor control flow structure or other bad practices may produce software that is buggy, prone to crashing, or other unwanted side effects. Having robust and well tested static attributes goes a long way to creating reliable, high quality software.
Security is a big concern and is more important each day when creating high quality software. Having vulnerabilities that may expose sensitive information, or open avenues for attacking end users devices such as ransomware can cause serious impacts. Protecting against these threats is an important part of high quality software.

### What libraries are being used in the app and why?
#### Express Server:
##### Express
Express is used to spin up the backend server and to create all the routes that our React Client uses to request data.
##### CORS
CORS is being used to accept cross origin requests from our React Client.
##### Mongoose
Mongoose is being used to handle creating our model schemas and for querying the MongoDB database.
##### Mongoose-pagination-v2
Mongoose pagination v2 is being utilised as a simple way of returning our tags and photos data in a paginated format.
##### Dotenv
Dotenv enables us to create a .env file which stores our private username and password to MLAB which is hosting our MongoDB
##### Moment
Momentjs is a really handy tool which we are using to manipulate Date objects in our graph stats route.
##### Axios
Axios is being used to run requests on our routes for testing purposes.
##### Expect
Expect is being used in testing to define expected outputs and mark it’s success or failure.
##### Sinon
Sinon is being used in testing to spy on function calls when testing our Controllers.
##### Mocha
Mocha is the backend testing framework we are using to run all our tests.

#### React Client:
Blueprint js
Redux
Axios
Moment
Grid gallery
Apex chart

### A team is about to engage in a project, developing a website for a small business. What knowledge and skills would they need in order to develop the project?
The team would need fundamental knowledge about how the internet works, and depending on the scale of the project, more specialised knowledge on HTTP requests, Authentication and Authorisation, Cross Origin Requests, Cookies or Local Storage etc.
As a bare minimum the team would need to know HTML and CSS, however would be able to create much more complex websites with a framework such as Ruby on Rails or the MERN stack.
To work effectively as a team, they would need good communication skills, and a working knowledge of a project management framework such as Agile would help enormously with the development of the website.
The team would also need some basic tools to help develop and collaborate such as an IDE like VS Code, knowing how to use Git for source control, and communication tools such as Slack, and a place to keep track of tasks such as Trello.
Communicating with the client is important and the team will need the skills to be able to gather clients requirements and expectations, and to be able to break that down to formal specifications that can then be used to guide development.

### Within your own project what knowledge or skills were required to complete your project, and overcome challenges?
Knowing how to google and stack overflow.
Knowing when to ask for help
Communication within team
Communication with the client


### Evaluate how effective your knowledge and skills were this project, using examples, and suggest changes or improvements for future projects of a similar nature?

- Mitch - My knowledge and skills on this project were lacking as I am still trying to get my head around the basics of MERN. In future projects I need to do further my overall understanding with experience by building my own application allowing me to learn and understand all aspects.

- Kieran - I'm proud of our accomplishments on this assignment as a team, and my individual contribution. I found my strength to be in creating documentation, facilitating communication among the team and with the client, and configuring the express server. I am very proud of how neat the express server is and how modular the code is. In the future I'd like to have more involvement in the react client side of things, as while I did have a small contribution, I'd like to learn more about using redux which was a big part of our assignment.

- Shubha - There is lots of scope of learning as with every project you get the better understanding  of your area of weakness and strength. I learnt a lot sifrom my teammates especially the way to approach the problem. I got the better understanding of the overall work flow of the app from client side to server side.My knowledge of react -redux gradually got better and on server I still need to work on writing the queries from the database.The take away of this project is to build a small app and work on your weakness and turn them into your strength.

- Glenn - My knowledge of react and redux has gradually increased over the course of this project and being able to keep my code DRY and well organized has gotten better, but was certainly a struggle early on, during this project. As for future improvements, there needs to be an ability to login/register, edit tags, and add new photos.

- Margaret - Coming Soon!





