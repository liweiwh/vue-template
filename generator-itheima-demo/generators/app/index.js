"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the prime ${chalk.red("generator-itheima-demo")} generator!`
      )
    );

    const prompts = [
      {
        type: "confirm",
        name: "question",
        message: "Do you want to install this template?",
        default: true
      },
      {
        type: "input",
        name: "installer",
        message: "Choose npm package manager? (npm or yarn)",
        default: "npm"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // Console.log("result:" + this.props.installer);
    this.fs.copy(this.templatePath("**"), this.destinationPath("./"));
  }

  install() {
    if (this.props.installer === "yarn") {
      this.yarnInstall();
    } else {
      this.npmInstall();
    }
    // This.installDependencies();
  }
};
