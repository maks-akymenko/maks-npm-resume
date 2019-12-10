#!/usr/bin/env node
"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");

const response = chalk.bold.yellow;

const resume = require("./resume.json");

const resumePrompts = {
  type: "list",
  name: "resumeOptions",
  message: "What would you like to know?",
  choices: [...Object.keys(resume), "See you!"]
};

function main() {
  console.log("Hi there👋 my name's Maks and welcome to my resume");
  resumeHandler();
}

function resumeHandler() {
  inquirer.prompt(resumePrompts).then(answer => {
    if (answer.resumeOptions == "Bye") {
      return;
    }
    const option = answer.resumeOptions;
    const resumeOption = resume[`${option}`]

    if (resumeOption) {
      console.log(response("--------------------------------------"));
      resumeOption.forEach(info => {
        console.log(response("|   => " + info));
      });
      console.log(response("--------------------------------------"));
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
          resumeHandler();
        } else {
          console.log(response("Thank you for your time!"));
          return;
        }
      });
  }).catch(err => console.log('Ooops,', err))
}

main();
