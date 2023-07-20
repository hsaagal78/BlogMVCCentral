# BlogMVCCentral


TTB Blog is a simple blogging platform that allows users to share their thoughts and ideas through blog posts.

## Features

- User Registration and Login: Users can create an account or log in to an existing account to access the dashboard and create new blog posts.
- Dashboard: Once logged in, users are directed to the dashboard, where they can add new blog posts and view their existing posts.
- Add New Blog Post: Users can add a new blog post by providing a title and text content through the "Add a new thought" form on the dashboard.
- Edit Blog Post: Users have the option to edit their existing blog posts by clicking the "Edit Post" button on each post's card in the dashboard.
- Logout: Users can log out of their account when they are done using the platform.

## Getting Started

To run the TTB Blog locally on your machine, follow these steps:

1. Clone this repository to your local machine using `https://github.com/hsaagal78/BlogMVCCentral`.

2. Install the required dependencies by running `npm install` in the project's root directory.

3. Set up the database: Make sure you have a MySQL server running. Create a new database and update the connection details in the `db/connection.js` file.

4. Run the application using `npm start`.

5. Access the application in your web browser at `http://localhost:3000`.

## Dependencies

TTB Blog relies on the following dependencies:

- [Inquirer](https://www.npmjs.com/package/inquirer) - A library for creating interactive command-line interfaces (CLIs) in Node.js.
- [mysql2](https://www.npmjs.com/package/mysql2) - Generate RFC-compliant mysql2 in JavaScript.
- [Sequelize](https://www.npmjs.com/package/sequelize) -  Object-Relational Mapping (ORM) library for Node.js. It supports multiple SQL database systems
- [Express](https://www.npmjs.com/package/express) - for routing, middleware, template engines, and more. 
- [Dotenv](https://www.npmjs.com/package/dotenv) -  It helps in managing sensitive data and configuration settings by keeping them separate from the source code
- [Tailwind](https://v2.tailwindcss.com/docs) -  CSS framework that provides a set of pre-built utility classes
- [bcrypt](https://www.npmjs.com/package/bcrypt)-  library for hashing passwords in Node.js applications. It provides a secure and efficient way to hash passwords
- [handlebars](https://www.npmjs.com/package/handlebars) -  It enables developers to create dynamic HTML templates by incorporating logic and data placeholders..

## Contributing

If you would like to contribute to TTB Blog, please fork this repository and submit a pull request with your changes.

# license 
![GitHub license](https://img.shields.io/badge/license-Apache%202.0-blue.svg)

This project is licensed under the Apache 2.0 license.

* [License](#license)


# Contact and Credit 

For any inquiries, please contact me at

 - Hernan Sagal, hsagal78@gmail.com

 # Pictures

![Screenshot](/lb/homePage.png)
![Screenshot](/lb/editPage.png)
![Screenshot](/lb/dashboardPage.png)