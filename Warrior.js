export function Warrior(
  name,
  type,
  defense,
  hitpoints,
  basicAttack,
  heavyAttack
) {
  this.name = name;
  this.type = type;
  this.defense = defense;
  this.hitpoints = hitpoints;
  this.basicAttack = basicAttack;
  this.heavyAttack = heavyAttack;
  this.guarding = false;
  this.perfectGuard = false;
  this.remainingPG = 1;
}

Warrior.prototype.statSheet = function () {
  console.log(
    `Name: ${this.name}\nType: ${this.type}\nDefense: ${this.defense}\nHitPoints: ${this.hitpoints}\nBasic Attack: ${this.basicAttack}\nHeavy Attack: ${this.heavyAttack}`
  );
  console.log("\n-------------\n");
};

Warrior.prototype.attack = function (character2, damage) {
  if (character2.guarding === true || character2.perfectGuard === true) {
    if (character2.guarding === true) {
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
    if (character2.perfectGuard === true) {
      console.log(
        `${this.name} tried to attack ${character2.name}.\nBut ${character2.name} perfectly defend themselves! No damage taken!\n`
      );
      character2.perfectGuard = false;
      character2.remainingPG--;
    }
  } else {
    console.log(
      `${this.name} attacks ${character2.name} for ${damage} points of damage!\n`
    );
    character2.hitpoints -= damage;
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

Warrior.prototype.totalGuard = function () {
  if (this.remainingPG > 0) {
    console.log(
      `${this.name} is giving all their might to defend themselves!\n`
    );
    this.perfectGuard = true;
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

Warrior.prototype.nextMove = function (character2) {
  const move = Math.floor(Math.random() * 21);
  // console.log(move);
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
