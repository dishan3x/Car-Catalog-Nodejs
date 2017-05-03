# Scrumtastic
Scrumtastic is a web-based agile development tool for [SCRUM](https://en.wikipedia.org/wiki/Scrum_(software_development))-like software development processes.  It maintains a product backlog, provides a sprint task board, and automatically generates a sprint burndown and release burnup charts.

To run this program

#set up the packet manager
npm init
npm install
npm install sqlite3


#inital migration to the databases
npm run migrate

#Run the server
node server.js
