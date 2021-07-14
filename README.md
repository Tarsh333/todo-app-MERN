MERN stack todo app
-------------------

* * *

Front-End -React  
Back-End -Node.js,Express.js & MongoDB  
  
Steps to run it locally -  

1.  Fork the app and clone it
2.  Make sure you have Node.js and Mongodb installed in your computer
3.  Open two terminal (one for running Server and other for the UI)
4.  (Only once) Run from root ``` cd todo && npm install ``` on one terminal and ``` cd server && npm install ``` on other
5.  For server run ``` node server.js ``` in terminal in which server folder is open and it will open on a new tab on port 5000.
6.  Make sure that you have created a data folder and then a db folder so that your file directory looks like ``` C:\\data\\db ```. This is default to store data locally by mongodb
7.  (Skip this step if while installing mongodb you made run as a service) Start mongod as well by going to ``` C:\\Program Files\\MongoDB\\Server\\4.4\\bin ``` and opening terminal there and run ``` mongod ```
8.  For UI run ``` npm start ``` from terminal in which todo folder is open and it will open on a new tab on port 3000.
9.  Go to http://localhost:3000 to see the application running.