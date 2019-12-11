#!/usr/bin/env node
"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");
const resume = require("./resume.json");
// add response color
const response = chalk.bold.yellow;

const options = {
  type: "list",
  name: "resumeOptions",
  message: "What would you like to know?",
  choices: [...Object.keys(resume), "See you!"]
};

function showResume() {
  console.log("Hi there 👋  my name's Maks and welcome to my resume");
  handleResume();
}

function handleResume() {
  inquirer.prompt(options).then(answer => {
    if (answer.resumeOptions == "See you!") {
      console.log(response("Thank you for your time!"));
      return;
    }
    const option = resume[`${answer.resumeOptions}`]

    if (option) {
      console.log(response(new inquirer.Separator()));
      option.forEach(info => {
        console.log(response("|   => " + info));
      });
      console.log(response(new inquirer.Separator()));
    }

    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Back", "Exit"]
      })
      .then(choice => {
        if (choice.exitBack == "Back") {
          handleResume();
        } else {
          console.log(response("Thank you for your time!"));
          return;
        }
      });
  }).catch(err => console.log('Ooops,', err))
}

showResume();
