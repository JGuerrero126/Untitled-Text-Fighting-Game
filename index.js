#!/usr/bin/env node

import inquirer from "inquirer";
import { Warrior } from "./util_files/Warrior.js";
import { rules } from "./util_files/Rules.js";
import { viewRoster } from "./util_files/ViewRoster.js";
import { reset } from "./util_files/Reset.js";

const berserker = new Warrior("Guts", "Berserker", 20, 100, 20, 65);

const merc = new Warrior("Vincent", "Merc", 25, 70, 30, 55);

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
          console.log(`\n${P1.name} VS ${P2.name}\n`);
          console.log(`Battle Start!`);
          battle(P1, P2, 1);
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
          battle(P1, P2, 2);
        });
    });
};

async function battle(P1, P2, playerNum) {
  if (playerNum === 1) {
    let p1Move = null;
    let p2Move = null;
    await inquirer
      .prompt([
        {
          type: "list",
          message: "Your Move! What do you wanna do?",
          name: "p1move",
          choices: ["Guard", "Total Guard", "Basic Attack", "Heavy Attack"],
        },
      ])
      .then((choice) => {
        p2Move = Math.floor(Math.random() * 21);
        if (p2Move <= 8) {
          P2.nextMove(P1, p2Move);
        }
        if (choice.p1move === "Guard" || choice.p1move === "Total Guard") {
          if (choice.p1move === "Guard") {
            P1.guard();
          }
          if (choice.p1move === "Total Guard") {
            P1.totalGuard();
          }
        }
        if (
          choice.p1move === "Basic Attack" ||
          choice.p1move === "Heavy Attack"
        ) {
          if (choice.p1move === "Basic Attack") {
            P1.attack(P2, P1.basicAttack);
          }
          if (choice.p1move === "Heavy Attack") {
            P1.attack(P2, P1.heavyAttack);
          }
        }
        if (P2.isAlive() === true && p2Move > 8) {
          P2.nextMove(P1, p2Move);
        }
      });
    if (P1.isAlive() && P2.isAlive()) {
      battle(P1, P2, 1);
    } else {
      reset(P1, P2);
      console.log("\nThe battle is over!\n");
      inquirer
        .prompt([
          {
            type: "list",
            name: "menuchoice",
            message: "What would you like to do now!",
            choices: ["Rematch", "Main Menu"],
          },
        ])
        .then((choice) => {
          switch (choice.menuchoice) {
            case "Rematch":
              battle(P1, P2, 1);
              break;
            case "Main Menu":
              mainmenu();
              break;
            default:
              console.log(
                "I'm sorry I didn't understand your choice, please start over."
              );
              mainmenu();
          }
        });
    }
  }
  if (playerNum === 2) {
    await inquirer
      .prompt([
        {
          type: "list",
          message: "Player One! Your Move! What do you wanna do?",
          name: "playerOneMove",
          choices: ["Guard", "Total Guard", "Basic Attack", "Heavy Attack"],
        },
      ])
      .then(async (firstChoice) => {
        await inquirer
          .prompt([
            {
              type: "list",
              message: "Player Two! You're Up! What do you wanna do?",
              name: "playerTwoMove",
              choices: ["Guard", "Total Guard", "Basic Attack", "Heavy Attack"],
            },
          ])
          .then((secondChoice) => {
            if (
              (firstChoice.playerOneMove === "Guard" ||
                firstChoice.playerOneMove === "Total Guard") &&
              (secondChoice.playerTwoMove === "Guard" ||
                secondChoice.playerTwoMove === "Total Guard")
            ) {
              console.log(
                `${P1.name} and ${P2.name} both guard, the battle is at a standstill!`
              );
              P1.endStalemate(P2);
            } else if (
              (firstChoice.playerOneMove === "Basic Attack" ||
                firstChoice.playerOneMove === "Heavy Attack") &&
              (secondChoice.playerTwoMove === "Guard" ||
                secondChoice.playerTwoMove === "Total Guard")
            ) {
              if (secondChoice.playerTwoMove === "Guard") {
                P2.guard();
              }
              if (secondChoice.playerTwoMove === "Total Guard") {
                P2.totalGuard();
              }
              if (firstChoice.playerOneMove === "Basic Attack") {
                P1.attack(P2, P1.basicAttack);
              }
              if (firstChoice.playerOneMove === "Heavy Attack") {
                P1.attack(P2, P1.heavyAttack);
              }
            } else {
              if (
                firstChoice.playerOneMove === "Guard" ||
                firstChoice.playerOneMove === "Total Guard"
              ) {
                if (firstChoice.playerOneMove === "Guard") {
                  P1.guard();
                }
                if (firstChoice.playerOneMove === "Total Guard") {
                  P1.totalGuard();
                }
              }
              if (
                firstChoice.playerOneMove === "Basic Attack" ||
                firstChoice.playerOneMove === "Heavy Attack"
              ) {
                if (firstChoice.playerOneMove === "Basic Attack") {
                  P1.attack(P2, P1.basicAttack);
                }
                if (firstChoice.playerOneMove === "Heavy Attack") {
                  P1.attack(P2, P1.heavyAttack);
                }
              }
              if (P2.isAlive()) {
                if (
                  secondChoice.playerTwoMove === "Guard" ||
                  secondChoice.playerTwoMove === "Total Guard"
                ) {
                  if (secondChoice.playerTwoMove === "Guard") {
                    P2.guard();
                  }
                  if (secondChoice.playerTwoMove === "Total Guard") {
                    P2.totalGuard();
                  }
                }
                if (
                  secondChoice.playerTwoMove === "Basic Attack" ||
                  secondChoice.playerTwoMove === "Heavy Attack"
                ) {
                  if (secondChoice.playerTwoMove === "Basic Attack") {
                    P2.attack(P1, P2.basicAttack);
                  }
                  if (secondChoice.playerTwoMove === "Heavy Attack") {
                    P2.attack(P1, P2.heavyAttack);
                  }
                }
              }
            }
          });
      });
    if (P1.isAlive() && P2.isAlive()) {
      battle(P1, P2, 2);
    } else {
      reset(P1, P2);
      console.log("\nThe battle is over!\n");
      inquirer
        .prompt([
          {
            type: "list",
            name: "menuchoice",
            message: "What would you like to do now!",
            choices: ["Rematch", "Main Menu"],
          },
        ])
        .then((choice) => {
          switch (choice.menuchoice) {
            case "Rematch":
              battle(P1, P2, 1);
              break;
            case "Main Menu":
              mainmenu();
              break;
            default:
              console.log(
                "I'm sorry I didn't understand your choice, please start over."
              );
              mainmenu();
          }
        });
    }
  }
}

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

export default mainmenu;

mainmenu();
