import inquirer from "inquirer";
import { Warrior } from "./Warrior.js";

const berserker = new Warrior("Guts", "Berserker", 20, 100, 20, 65);

const merc = new Warrior("Vincent", "Merc", 25, 70, 30, 40);

const vagabond = new Warrior("Musashi", "Vagabond", 40, 60, 15, 55);

const gunslinger = new Warrior("Clint", "Gunslinger", 10, 75, 20, 60);

const roster = [berserker, merc, vagabond, gunslinger];

const viewRoster = () => {
  for (let i = 0; i < roster.length; i++) {
    roster[i].statSheet();
  }
  mainmenu();
};

const singlePlayer = () => {};

const twoPlayer = () => {};

async function rules() {
  await console.log("These are the rules for Warriors Of Wrath");
  await setTimeout(function () {
    console.log(
      "Before the fight begins you must select single-player or two-player."
    );
  }, 1000);
  await setTimeout(function () {
    console.log(
      "If you select single-player, you may choose your fighter and opponent\nTwo-player allows the same thing but will allow the opponent to be controlled by a second player using the same keyboard.\n"
    );
  }, 3000);
  await setTimeout(function () {
    console.log(
      "During the fight you will be presented with the option to do an Basic or Heavy Attack, as well as to Guard or 'Total Guard'.\n"
    );
  }, 5000);
  await setTimeout(function () {
    console.log(
      "A Basic Attack will do lesser damage than a Heavy Attack.\nTry to use this to try to mindgame your opponent and use a Heavy Attack when they aren't ready to defend themselves while using Basic Attacks for the attack they defend against.\n"
    );
  }, 8000);
  await setTimeout(function () {
    console.log(
      "You can also Guard and Total Guard.\nUsing Guard will make your fighter defend themselves. Reducing the damage taken from an attack by your defense.\nEvery fighter has different defense so be sure to view the roster and check them.\n"
    );
  }, 12000);
  await setTimeout(function () {
    console.log(
      "A Total Guard will make your fighter use everything they have to defend themselves, making it so damage is taken regardless of the attack used against you and can only be used once per battle.\nMake sure to use your Total Guard when you feel your opponent is going to use a Heavy Attack to get the most use out of it!\n"
    );
  }, 16000);
  await setTimeout(function () {
    mainmenu();
  }, 200000);
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
          berserker.statSheet();
          break;
        case "Two-Player":
          berserker.statSheet();
          break;
        case "View Roster":
          viewRoster();
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

// berserker.statSheet();
// merc.statSheet();
// merc.totalGuard();
// berserker.attack(merc, berserker.heavyAttack);
// merc.totalGuard();
// berserker.nextMove(merc);
