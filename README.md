#hw 
1. when u click on country it will get the wines from that country
2. add limit and offset query params to q1.
3. display the wine details from wine id
4. compile and build angular st angular is served from express

#things learnt today 14 dec
- proxy config and why we need it
    a. create proxy-config.js
    b. ng serve --proxy-config proxy-config.js
    >> angular will now take proxy and call localhost: 3000 from itself instead
    (serving express thru angular)
- set up backend first and connect to server before connecting backend to frontend
- think about how data should be saved and what type of server to use (rdbms, s3 (key-val), mongo (doc) )
- serve angular thru express
    a. ng build --prod to get SPA
    b. copy dist folder to express
    c. serve static file from express app.use(express.static(__dirname + '/frontend'))

** do not check frontend folder into express' git as it is an artefact