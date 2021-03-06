const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const questions = [];
const generateMarkdown = require("./utils/generateMarkdown");
const profileObj = {};

function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your Git Hub user name?",
        name: "userName"
      },
      {
        type: "input",
        message: "What's your email address?",
        name: "email"
      }
    ])
    .then(function (input) {
      axios
        .get("https://api.github.com/users/" + input.userName)
        .then(function (response) {
          // console.log(response.data);

          profileObj.avatar_url = response.data.avatar_url;
          profileObj.email = input.email;
          inquirer
            .prompt([
              {
                type: "input",
                message: "What is the title of your project?",
                name: "title"
              },
              {
                type: "input",
                message: "Give a short description of your project",
                name: "description"
              },
              // {
              //   type: "input",
              //   message: "Table of Contents",
              //   name: "tableOfContent"
              // },
              {
                type: "input",
                message: "What packages did you install?",
                name: "installation"
              },
              // {
              //   type: "input",
              //   message: "Usage",
              //   name: "usage"
              // },
              {
                type: "input",
                message: "What kind of licesnse should your project have?",
                name: "license"
              },
              {
                type: "input",
                message: "What does the user need to know about using this repo?",
                name: "contributing"
              },
              {
                type: "input",
                message: "What command should you run to run tests?",
                name: "tests"
              },
              {
                type: "input",
                message: "Questions",
                name: "questions"
              }
            ])
            .then(function (input) {
              profileObj.title = input.title;
              profileObj.description = input.description;
              // profileObj.tableOfContent = input.tableOfContent;
              profileObj.installation = input.installation;
              // profileObj.usage = input.usage;
              profileObj.license = input.license;
              profileObj.contributing = input.contributing;
              profileObj.tests = input.tests;
              profileObj.questions = input.questions;
              var readMeData = generateMarkdown(profileObj);
              fs.writeFile("./README.md", readMeData, function (error) { });
            });
        });
    });
}

promptUser();
