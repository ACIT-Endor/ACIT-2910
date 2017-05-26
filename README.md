# ACIT-2910
Project course at BCIT - Endor fast food outlet

Team Endor - Endor Eats
Endor eats is an intergalactic food restaurant known for it's services across different systems and plantes, as well as providing quality catering services. Endor eats vision is to expand beyond major star systems and encourage growth of lesser and developing systems to stand out and contribute to our starry society. 

This website is Endor Eat's primary mode of ordering and serving cutomers across the galaxy. The website requires the use of a postgreSQL table to work as orders, user information and inventory information is all stored using a database. This website is currently hosted on heroku at the link: acit-2910.herokuapp.com
Hosting limitations exist and can break upon overload.

# Instruction on running your own "Endor Eats":
Considering you are familiar with node.js (if not, head over to https://nodejs.org , your world is about to change) and node.js and postgresql database is installed, follow these steps:
 

## The Following instructions are for Windows Machines

1. Open a CMD/Powershell window

2. Type: "npm install --save" to the the newest node_modules (be sure to keep this window open for later)

3. Make sure your postgres DB information is upto date (copy paste the queries from dbqueries.txt), if you have an exsisting endor postgres db it is recommended you run a "DROP DATABASE endor" from postgres.

4. After updating DB, open a CMD/Powershell in the root folder and run the commands:
    - node_modules\webpack\bin\webpack.js
    - node index.js
    
    This will start the server on the localmachine and can be accessed by typing "localhost:10000" in your browser (preferably Chrome).
    
5. Login as an admin user to 'Open' the store to allow users to login and begin ordering.
    Note: You can see a list of users by seeing the Database queries or by checking the 'users' table in your postgres db.
    
6. Login as kitchen usre to see the kitchen page where items are cooked.
    Note: Navigate to 'localhost:10000/profile'


## Running Tests: 
1. In one CMD/PowerShell type node "node_modules\webpack\bin\webpack.js", after webpack is complete type "node index.js"

6. In another CMD/PwerShell opened in parallel type: "node nightwatch.js -t tests/order1x.js"

7. To run the tests there is:

- node nightwatch.js -t tests/order1x.js
    User Logs in and orders 1x item

- node nightwatch.js -t tests/order2x.js
    User Logs in and orders 1x, 1y, 1z item
    
- node nightwatch.js -t tests/order3x.js
    User Logs in and orders 1x, 1y, 1x item

- node nightwatch.js -t tests/adminLogin.js
    User Logs in and sees the admin page and opening the store

- node nightwatch.js -t tests/kitchenLogin.js
    User Logs in and sees the kitchen page

(if you want to you can run
"node nightwatch.js --tag login" to run them all after each other)

**Run tests/adminLogin.js first as it opens the store, the other tests rely on the store to be open
