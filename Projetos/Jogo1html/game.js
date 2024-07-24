class Character {
    constructor(name, health, attack, imageUrl) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.imageUrl = imageUrl;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        }
    }

    isAlive() {
        return this.health > 0;
    }
}

class Player extends Character {
    constructor(name, health, attack, imageUrl) {
        super(name, health, attack, imageUrl);
    }

    heal() {
        this.health += 60; // Amount of healing
        if (this.health > 100) {
            this.health = 100; // Max health cap
        }
    }
}

class Enemy extends Character {
    constructor(name, health, attack, imageUrl) {
        super(name, health, attack, imageUrl);
    }
}

const game = {
    player: new Player('Hero', 100, 20, '540px-Noel_medarot_s_artwork.png'),
    enemies: [
        new Enemy('Kuwabot', 30, 5, 'Kuwagata_Baizan_(Medarot_S).png'),
        new Enemy('Rokubot', 50, 10, '569px-Rokusho_(KWG01)_MS_Artwork.png'),
        new Enemy('G-Beebot', 80, 15, 'G-Metabee_(Medarot_S).png'),
        new Enemy('Ninjabot', 150, 25, 'Nin-Ninja_MGM_Artwork.png'),
        new Enemy('Malvatron', 120, 20, 'Blackmail_MS_Artwork_(Old).png'),
        new Enemy('Scopitron', 100, 30, 'Scorpio_(Medarot_S).png')
    ],
    currentEnemyIndex: 0,
    currentEnemy: null,

    start() {
        this.currentEnemyIndex = 0;
        this.player.health = 100;
        this.updateMessage('Game Started! Prepare for battle!');
        this.updateCharacterImage('player', this.player.imageUrl);
        this.nextPhase();
    },

    nextPhase() {
        if (this.currentEnemyIndex >= this.enemies.length) {
            this.updateMessage('Congratulations! You have defeated all enemies!');
            this.updateCharacterImage('enemy', 'super-bowl-trophy-winner-png-27.png');
            return;
        }

        this.currentEnemy = this.enemies[this.currentEnemyIndex];
        this.updateMessage(`A wild ${this.currentEnemy.name} appears!`);
        this.updateCharacterImage('enemy', this.currentEnemy.imageUrl);
        this.updateControls(true);
    },

    attack() {
        if (!this.currentEnemy.isAlive() || !this.player.isAlive()) return;

        this.player.attackEnemy(this.currentEnemy);
        if (!this.currentEnemy.isAlive()) {
            this.updateMessage(`You defeated the ${this.currentEnemy.name}!`);
            this.currentEnemyIndex++;
            this.nextPhase();
        } else {
            this.enemyTurn();
        }
    },

    heal() {
        if (!this.player.isAlive()) return;

        this.player.heal();
        this.updateMessage(`You healed yourself! Current health: ${this.player.health}`);
        this.enemyTurn();
    },

    enemyTurn() {
        if (!this.currentEnemy.isAlive()) return;

        this.currentEnemy.attackPlayer(this.player);
        this.updateMessage(`The ${this.currentEnemy.name} attacked you! Your health: ${this.player.health}`);

        if (!this.player.isAlive()) {
            this.updateMessage('You have been defeated. Game Over!');
            this.updateControls(false);
        }
    },

    updateMessage(message) {
        document.getElementById('message').innerText = message;
    },

    updateControls(enable) {
        const controls = document.querySelectorAll('#controls button');
        controls.forEach(button => {
            button.disabled = !enable;
        });
    },

    updateCharacterImage(characterType, imageUrl) {
        const imgElement = document.getElementById(`${characterType}-image`);
        imgElement.src = imageUrl;
    }
};

Character.prototype.attackEnemy = function (enemy) {
    enemy.takeDamage(this.attack);
};

Character.prototype.attackPlayer = function (player) {
    player.takeDamage(this.attack);
};
