import inquirer from "inquirer";
import { Warrior } from "./Warrior.js";
import { rules } from "./Rules.js";
import { viewRoster } from "./ViewRoster.js";

const berserker = new Warrior("Guts", "Berserker", 20, 100, 20, 65);

const merc = new Warrior("Vincent", "Merc", 25, 70, 30, 40);

const vagabond = new Warrior("Musashi", "Vagabond", 40, 60, 15, 55);

const gunslinger = new Warrior("Clint", "Gunslinger", 10, 75, 20, 60);

const roster = [berserker, merc, vagabond, gunslinger];

const singlePlayer = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "P1",
        message: "Select Your Warrior!",
        choices: [...roster],
      },
    ])
    .then((choice) => {
      var P1 = choice.P1;
      roster.forEach((el) => {
        if (el.name === P1) {
          P1 = el;
          return;
        }
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "P2",
            message: "Select Your Opponent!",
            choices: [...roster],
          },
        ])
        .then((choice) => {
          var P2 = choice.P2;
          roster.forEach((el) => {
            if (el.name === P2) {
              P2 = el;
              return;
            }
          });
          console.log(`\nYou selected ${P1.name} as your Warrior\n`);
          console.log(`${P2.name} is your opponent!\n`);
        });
    });
};

const twoPlayer = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "P1",
        message: "Player One! Select Your Warrior!",
        choices: [...roster],
      },
    ])
    .then((choice) => {
      var P1 = choice.P1;
      roster.forEach((el) => {
        if (el.name === P1) {
          P1 = el;
          return;
        }
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "P2",
            message: "Player Two! Select Your Warrior!",
            choices: [...roster],
          },
        ])
        .then((choice) => {
          var P2 = choice.P2;
          roster.forEach((el) => {
            if (el.name === P2) {
              P2 = el;
              return;
            }
          });
          if (P1.name === P2.name) {
            console.log("WOAH! A mirror match! @O@ How interesting!");
          }
          console.log(
            `\nPlayer One has selected ${P1.name} as their Warrior!\n`
          );
          console.log(`Player Two selected ${P2.name} as their Warrior!\n`);
        });
    });
};

const mainmenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuchoice",
        message: "Welcome to Warriors Of Wrath!",
        choices: [
          "Single-Player",
          "Two-Player",
          "View Roster",
          "Rules",
          "Quit",
        ],
      },
    ])
    .then((choice) => {
      switch (choice.menuchoice) {
        case "Single-Player":
          singlePlayer();
          break;
        case "Two-Player":
          twoPlayer();
          break;
        case "View Roster":
          viewRoster(roster);
          mainmenu();
          break;
        case "Rules":
          rules();
          break;
        case "Quit":
          process.exit();
        default:
          console.log(
            "I'm sorry I didn't understand your choice, please start over."
          );
          mainmenu();
      }
    });
};

mainmenu();
