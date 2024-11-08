const characters = [
    { name: "Mario", speed: 4, maneuverability: 3, power: 3, points: 0 },
    { name: "Peach", speed: 3, maneuverability: 4, power: 2, points: 0 }
];

const BLOCK_TYPES = {
    STRAIGHT: "Reta",
    CURVE: "Curva",
    CONFRONTATION: "Confronto"
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    const random = Math.random();
    if (random < 0.33) return BLOCK_TYPES.STRAIGHT;
    if (random < 0.66) return BLOCK_TYPES.CURVE;
    return BLOCK_TYPES.CONFRONTATION;
}

async function logRollResult(name, blockType, diceRoll, attribute) {
    console.log(`${name} 🎲 rolled for ${blockType} ${diceRoll} + ${attribute} = ${diceRoll + attribute}`);
}

async function evaluateBlock(character1, character2, blockType) {
    const diceRoll1 = await rollDice();
    const diceRoll2 = await rollDice();

    let score1, score2;

    if (blockType === BLOCK_TYPES.STRAIGHT) {
        score1 = diceRoll1 + character1.speed;
        score2 = diceRoll2 + character2.speed;
        await logRollResult(character1.name, "speed", diceRoll1, character1.speed);
        await logRollResult(character2.name, "speed", diceRoll2, character2.speed);
    } else if (blockType === BLOCK_TYPES.CURVE) {
        score1 = diceRoll1 + character1.maneuverability;
        score2 = diceRoll2 + character2.maneuverability;
        await logRollResult(character1.name, "maneuverability", diceRoll1, character1.maneuverability);
        await logRollResult(character2.name, "maneuverability", diceRoll2, character2.maneuverability);
    } else {
        score1 = diceRoll1 + character1.power;
        score2 = diceRoll2 + character2.power;
        console.log(`${character1.name} confronts ${character2.name}! 🥊`);
        await logRollResult(character1.name, "power", diceRoll1, character1.power);
        await logRollResult(character2.name, "power", diceRoll2, character2.power);

        if (score1 > score2 && character2.points > 0) {
            console.log(`${character1.name} wins the confrontation! ${character2.name} loses 1 point 🐢`);
            character2.points--;
        } else if (score2 > score1 && character1.points > 0) {
            console.log(`${character2.name} wins the confrontation! ${character1.name} loses 1 point 🐢`);
            character1.points--;
        } else if (score1 === score2) {
            console.log("It's a tie! No points lost.");
        }
        return;
    }

    if (score1 > score2) {
        console.log(`${character1.name} scores 1 point ★`);
        character1.points++;
    } else if (score2 > score1) {
        console.log(`${character2.name} scores 1 point ★`);
        character2.points++;
    }
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`\n🏁 Round ${round}\n`);
        const blockType = await getRandomBlock();
        console.log(`Block: ${blockType}`);
        await evaluateBlock(character1, character2, blockType);
        console.log("-----------------------------");
    }
}

async function declareWinner(character1, character2) {
    console.log("Final Results:");
    console.log(`${character1.name}: ${character1.points} point(s)`);
    console.log(`${character2.name}: ${character2.points} point(s)`);

    if (character1.points > character2.points)
        console.log(`\n${character1.name} wins the race! Congratulations! 🏆`);
    else if (character2.points > character1.points)
        console.log(`\n${character2.name} wins the race! Congratulations! 🏆`);
    else console.log("The race ends in a tie");
}

(async function main() {
    const [player1, player2] = characters;
    console.log(`\n🏁🚨 Race between ${player1.name} and ${player2.name} starting...\n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();
