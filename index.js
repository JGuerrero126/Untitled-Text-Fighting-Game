import inquirer from "inquirer";

function Warrior(name, type, defense, hitpoints, basicAttack, heavyAttack) {
  this.name = name;
  this.type = type;
  this.defense = defense;
  this.hitpoints = hitpoints;
  this.basicAttack = basicAttack;
  this.heavyAttack = heavyAttack;
  this.guarding = false;
}

Warrior.prototype.statSheet = function () {
  console.log(
    `Name: ${this.name}\nType: ${this.type}\nDefense: ${this.defense}\nHitPoints: ${this.hitpoints}\nBasic Attack: ${this.basicAttack}\nHeavy Attack: ${this.heavyAttack}`
  );
  console.log("\n-------------\n");
};

Warrior.prototype.attack = function (character2, damage) {
  if (character2.guarding === false) {
    console.log(
      `${this.name} attacks ${character2.name} for ${damage} points of damage!\n`
    );
    character2.hitpoints -= damage;
  } else {
    console.log(
      `${this.name} attacks ${
        character2.name
      } for ${damage} points of damage!\nHowever, ${
        character2.name
      } guards against the attack!\nThe damage was reduced to ${
        damage - character2.defense
      }\n`
    );
    character2.guarding === false;
    character2.hitpoints -= damage - character2.defense;
  }
  if (character2.isAlive()) {
    console.log(
      `${character2.name} has ${character2.hitpoints} health remaining!\n`
    );
  } else {
    console.log(
      `That attack killed ${character2.name}! Game Over!\n${this.name} is the victor!\n`
    );
  }
};

Warrior.prototype.guard = function () {
  this.guarding = true;
  console.log(`${this.name} is now guarding!\n`);
};

Warrior.prototype.isAlive = function () {
  if (this.hitpoints > 0) {
    return true;
  }
  return false;
};

const berserker = new Warrior("Guts", "Berserker", 20, 100, 20, 45);

const merc = new Warrior("Vincent", "Merc", 25, 70, 30, 40);

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
          berserker.statSheet();
          break;
        case "Rules":
          berserker.statSheet();
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
