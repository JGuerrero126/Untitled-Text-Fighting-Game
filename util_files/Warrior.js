import { values } from "./Values.js";

export function Warrior(
  name,
  type,
  defense,
  hitpoints,
  basicAttack,
  heavyAttack,
  stamina
) {
  this.name = name;
  this.type = type;
  this.defense = defense;
  this.hitpoints = hitpoints;
  this.totalHP = hitpoints;
  this.basicAttack = basicAttack;
  this.heavyAttack = heavyAttack;
  this.guarding = false;
  this.perfectGuard = false;
  this.remainingPG = 1;
  this.stamina = stamina;
  this.totalStamina = stamina;
}

// A quick stamina usage guide: THIS ARE THE INITIAL VALUES, IT IS POSSIBLE THEY HAVE CHANGED
//
// Guard uses 5 Stamina;
// Total Guard uses 8 Stamina;
// Basic Attack uses 15 Stamina;
// Heavy Attack uses 30 Stamina;

Warrior.prototype.statSheet = function () {
  console.log(
    `Name: ${this.name}\nType: ${this.type}\nDefense: ${this.defense}\nHitPoints: ${this.hitpoints}\nBasic Attack: ${this.basicAttack}\nHeavy Attack: ${this.heavyAttack}\n Stamina: ${this.stamina}`
  );
  console.log("\n-------------\n");
};

Warrior.prototype.attack = function (character2, damage, type) {
  if (character2.guarding === true || character2.perfectGuard === true) {
    if (character2.guarding === true) {
      if (damage - character2.defense > 0) {
        console.log(
          `${this.name} attacks ${
            character2.name
          } for ${damage} points of damage!\nHowever, ${
            character2.name
          } guards against the attack!\nThe damage was reduced to ${
            damage - character2.defense
          }\n`
        );
        character2.guarding = false;
        character2.hitpoints -= damage - character2.defense;
        type === "Basic"
          ? (this.stamina -= values.basicAttack)
          : (this.stamina -= values.heavyAttack);
      } else {
        console.log(
          `${this.name} attacks ${character2.name} for ${damage} points of damage!\nHowever, ${character2.name} defenses were so strong all damage was negated!\n`
        );
        character2.guarding = false;
        type === "Basic"
          ? (this.stamina -= values.basicAttack)
          : (this.stamina -= values.heavyAttack);
      }
    }
    if (character2.perfectGuard === true) {
      console.log(
        `${this.name} tried to attack ${character2.name}.\nBut ${character2.name} perfectly defend themselves! No damage taken!\n`
      );
      character2.perfectGuard = false;
      character2.remainingPG--;
      type === "Basic"
        ? (this.stamina -= values.basicAttack)
        : (this.stamina -= values.heavyAttack);
    }
  } else {
    console.log(
      `${this.name} attacks ${character2.name} for ${damage} points of damage!\n`
    );
    character2.hitpoints -= damage;
    type === "Basic"
      ? (this.stamina -= values.basicAttack)
      : (this.stamina -= values.heavyAttack);
  }
  if (character2.isAlive()) {
    console.log(
      `${character2.name} has ${character2.hitpoints} health and ${character2.stamina} stamina remaining!\n`
    );
  } else {
    console.log(
      `That attack killed ${character2.name}! Game Over!\n${this.name} is the victor!\n`
    );
  }
};

Warrior.prototype.guard = function () {
  if (this.staminaCheck("Guard")) {
    this.guarding = true;
    this.stamina -= values.guard;
    console.log(`${this.name} is now guarding!\n`);
  } else {
    this.guarding = true;
    this.stamina -= values.guard;
    console.log(`${this.name} guards with the last of their strength!\n`);
  }
};

Warrior.prototype.totalGuard = function () {
  if (this.remainingPG > 0) {
    if (this.staminaCheck("Total Guard")) {
      console.log(
        `${this.name} is giving all their might to defend themselves!\n`
      );
      this.perfectGuard = true;
      this.stamina -= values.totalGuard;
    } else {
      console.log(
        `${this.name} is using their last bit of strength to defend themselves!\n`
      );
      this.perfectGuard = true;
      this.stamina -= values.totalGuard;
    }
  } else {
    console.log(
      `${this.name} tried to perfectly defend, but they were too tired.\n`
    );
  }
};

Warrior.prototype.isAlive = function () {
  if (this.hitpoints > 0) {
    return true;
  }
  return false;
};

Warrior.prototype.nextMove = function (character2, move) {
  if (move <= 4) {
    return this.guard();
  }
  if (move > 4 && move <= 8) {
    return this.totalGuard();
  }
  if (move > 8 && move <= 14) {
    return this.attack(character2, this.basicAttack);
  }
  if (move > 14) {
    return this.attack(character2, this.heavyAttack);
  }
};

Warrior.prototype.endStalemate = function (character2) {
  this.guarding = false;
  character2.guarding = false;
  this.perfectGuard = false;
  character2.perfectGuard = false;
};

Warrior.prototype.staminaCheck = function (move) {
  if (move === "Guard") {
    return this.stamina - values.guard >= 0 ? true : false;
  }
  if (move === "Total Guard") {
    return this.stamina - values.totalGuard >= 0 ? true : false;
  }
  if (move === "Basic Attack") {
    return this.stamina - values.basicAttack >= 0 ? true : false;
  }
  if (move === "Heavy Attack") {
    return this.stamina - values.heavyAttack >= 0 ? true : false;
  }
};

Warrior.prototype.hasStamina = function () {
  return this.stamina > 0 ? true : false;
};
