# HomeHub

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Description

This application is a full-stack property management solution. It is built with javascript with a SQL backend. It uses the following libraries: express, sequelize, dotenv, mysql2, bcrypt, connect-session-sequelize, dayjs, express-handlebars, and express-session. 
HomeHub services two types of users:
-Landlords will be able to track their properties and add new ones, invite tenants and assign them to a unit, receive maintenance requests, and communicate with their tenants.
-Tenant will be able to check their rental unit details, submit maintenance tickets to their landlord, and communicate with them through a messaging system.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)


## Installation

This application runs on the browser.

To run the code locally:
>Clone the repository.
>Download required packages: npm i.
>Run mysql from the /db directory
>SOURCE the schema.sql file to create the database.
>Seed the tables from the main directory using: npm run seed.
>Run the server: npm start.
>The local application may be accessed on your browser using: http://localhost:3001/


## Usage

The link to access the deployed application is: <>
 
- Landlord Usage:
    * Create a new landlord account or sign in as landlord. The dashboard has the following options:
    * Your properties(if any): Displays current units, allows landlord to add new property and invite tenants.
    * Maintenance tickets(if any): Displays a list of maintenance tickets for your properties. Allows the landlord to update them.
    * Your messages: Shows the conversations with your tenants. Allows the landlord to start a new conversation.
    * Update profile: Allows the landlord to update their profile info, including their password. Displays a list of their current tenants.

- Tenant Usage:
    * Sign in as a tenant while the tenant check box is checked. The dashboard has the following options:
    * Your unit: Lists information about your rental unit.
    * Your maintenance tickets: Displays a list of the maintenance tickets the tenant has sent.
    * Add maintenance ticket: Opens a window to create a new maintenance ticket.
    * Your messages: Shows tenant-landlord conversations. Allows tenant to start a new conversation.
    * Update your profile: The tenant can update email/password for their account.

Screenshots of the app in use:

<img src=https://raw.githubusercontent.com/Anabel-Espinoza/HomeHub/main/public/images/screenshots/hh-home-02.png width=30% margin=10px alt="HomeHub Homepage"> <img src=https://raw.githubusercontent.com/Anabel-Espinoza/HomeHub/main/public/images/screenshots/landlord-properties.png width=30% margin=10px alt="Landlord Dashboard"> <img src=https://raw.githubusercontent.com/Anabel-Espinoza/HomeHub/main/public/images/screenshots/landlord-convo.png width=30% margin=10px alt="Landlord Convo"> <img src=https://raw.githubusercontent.com/Anabel-Espinoza/HomeHub/main/public/images/screenshots/tenant-dashboard.png width=30% margin=10px alt="Tenant Dashboard"> <img src=https://raw.githubusercontent.com/Anabel-Espinoza/HomeHub/main/public/images/screenshots/tenant-add-ticket.png width=30% margin=10px alt="Tenant Add Ticket"> 


## Credits

Team:
- Alyssa Geria (https://github.com/alyssageria)
- Anabel Espinoza (https://github.com/Anabel-Espinoza)
- Jamin Hogan (https://github.com/JaminHLO)
- Nick Pham (https://github.com/NganPham89)

Instruction Team:
- Instructor: Saurav Khatiwada
- TAs: Andres Inciarte, Morgan Riley, Constan Fernando, Andres Jimenez.


## License

This Project is covered by the MIT License.
