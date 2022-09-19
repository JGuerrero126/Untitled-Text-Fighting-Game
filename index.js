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
          console.log(`\n${P1.name} VS ${P2.name}\n`);
          console.log(`Battle Start!`);
          battle(P1, P2);
        });
    });
};

async function battle(P1, P2) {
  // let p1CurrentMove = null;
  let p2PastMove = null;
  // let p2CurrentMove = null;
  do {
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
        var p2CurrentMove = P2.nextMove(P1);
        if (choice.p1move === "Guard" || choice.p1move === "Total Guard") {
          if (choice.p1move === "Guard") {
            var p1CurrentMove = P1.guard();
          }
          if (choice.p1move === "Total Guard") {
            var p1CurrentMove = P1.totalGuard();
          }
        }
        if (
          choice.p1move === "Basic Attack" ||
          choice.p1move === "Heavy Attack"
        ) {
          if (choice.p1move === "Basic Attack") {
            var p1CurrentMove = P1.attack(P2, P1.basicAttack);
          }
          if (choice.p1move === "Heavy Attack") {
            var p1CurrentMove = P1.attack(P2, P1.heavyAttack);
          }
        }
        // var p2CurrentMove = P2.nextMove(P1);
        // if (p2PastMove === p2CurrentMove) {
        //   p2CurrentMove = P2.nextMove(P1);
        // }
        // if (
        //   (p1CurrentMove === P1.guard() || p1CurrentMove === P1.totalGuard()) &&
        //   (p2CurrentMove === P2.guard() || p2CurrentMove === P2.totalGuard())
        // ) {
        //   console.log(
        //     "Both Warriors Attempted To Guard! The Battle is at a standstill!"
        //   );
        // }
        // if (
        //   (p1CurrentMove === P1.attack(P2, P1.basicAttack) ||
        //     p1CurrentMove === P1.attack(P2, P1.heavyAttack)) &&
        //   (p2CurrentMove === P2.guard() || p2CurrentMove === P2.totalGuard())
        // ) {
        //   p2CurrentMove;
        //   p1CurrentMove;
        // } else {
        p1CurrentMove;
        if (P2.isAlive() === true) {
          p2CurrentMove;
        }
        // }
      });
  } while (P1.isAlive() && P2.isAlive());
}

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

const testMove = (warrior) => {
  var testing = warrior.totalGuard();
  testing;
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
          // testMove(berserker);
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
