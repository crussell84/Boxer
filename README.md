# Boxer

Boxer is a lightweight, responsive inventory management tool built using Materialize, running on a Node Express server, all backed by a MySQL database.


## To View Live
https://boxerinventory.herokuapp.com/

**Demo User Login Info:** demouser01 / testing1

## To Run Locally
- Clone/download the repo
- Open the root of the repo in your terminal
- (Optional) run the vagrant up command to use the provided vagrant file to provision a VM, then run vagrant ssh to use it. This requires both Vagrant and Virtualbox to be installed on your machine
    - VirtualBox
    - Vagrant
- Navigate to the '/var/code' directory if using vagrant
- Run npm install to install the required Node modules
- Use the provided `models/schema.sql` file to create the needed database
    - If not using the provided VM, you will need to edit the password on line 4 of the `config/config.json` file to match your password
- Run `node server.js` to trigger the creation of the needed tables through Sequelize
    - There is a seeder file with some mock user & product data which can be run via the Sequelize CLI 
        - Install the CLI by running `npm install -g sequelize-cli`
        - Run the seeder `sequelize db:seed:all`
- You will then be able to view the site in your browser with the server running locally

## Technologies Used 
- Node
- Express
- Sequelize
- Passport.js
- Materialize
- Heroku
- HTML/CSS/JS

## Team Members
- [Viktor Daniyelyan](https://github.com/VitoDaniel)
- [Mason Hester](https://github.com/MasonHester)
- [Rick Knowlton](https://github.com/rickknowlton)
- [Christine Russell](https://github.com/crussell84/)
