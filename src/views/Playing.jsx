import { Button, Card, Col, Row } from "react-bootstrap";
import { monsters, weakness } from "../data";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function getEnemy() {
  const index = Math.floor(Math.random() * monsters.length) + 1;
  return monsters[index > 0 ? index - 1 : index];
}

function makeAction({
  actionId,
  bases,
  player,
  enemy,
  value,
  type,
  start,
  updateEnemy,
  updatePlayer,
}) {
  const source = start === "player" ? { ...player } : { ...enemy };
  const target = start === "player" ? { ...enemy } : { ...player };
  const sourceString = start === "player" ? "player" : "enemy";
  const actionFunctions = {
    1: () =>
      performAttack({
        source,
        sourceString,
        target,
        type,
        value,
        updateEnemy,
        updatePlayer,
      }),
    2: () =>
      updateStat({
        source,
        stat: "life",
        sourceString,
        value,
        maxValue: bases[start].life,
        updateEnemy,
        updatePlayer,
      }),
    3: () =>
      updateStat({
        source,
        stat: "defense",
        sourceString,
        value,
        maxValue: undefined,
        updateEnemy,
        updatePlayer,
      }),
    4: () =>
      updateStat({
        source,
        stat: "attack",
        sourceString,
        value,
        maxValue: undefined,
        updateEnemy,
        updatePlayer,
      }),
    5: () =>
      updateStat({
        source,
        stat: "speed",
        sourceString,
        value,
        maxValue: undefined,
        updateEnemy,
        updatePlayer,
      }),
  };

  if (actionFunctions[actionId]) {
    return actionFunctions[actionId]();
  } else {
    console.log("Invalid actionId");
  }
}

function performAttack({
  source,
  target,
  type,
  value,
  updateEnemy,
  updatePlayer,
  sourceString,
}) {
  const isWeak = target.types.some((typx) => typx.weakness.includes(type));

  let totalValue = Math.floor(source.attack * `0.${value}`);

  if (!isWeak) totalValue -= Math.round(target.defense * `0.${value}`);

  target.life -= totalValue;

  if (sourceString === "player") {
    if (target.life <= 0) return endGame({ enemy: target, player: source });
    updateEnemy({ ...target, life: target.life });
  } else {
    if (target.life <= 0) return endGame({ enemy: source, player: target });
    updatePlayer({ ...target, life: target.life });
  }
}

function updateStat({
  source,
  sourceString,
  stat,
  value,
  maxValue,
  updateEnemy,
  updatePlayer,
}) {
  const updatedStat = source[stat] + value;

  if (maxValue !== undefined && updatedStat > maxValue) return;

  source[stat] = updatedStat;

  if (sourceString === "player") {
    updatePlayer({ ...source });
  } else {
    updateEnemy({ ...source });
  }
}

function endGame({ player, enemy }) {
  if (player.life <= 0) return console.log("you lose!");
  if (enemy.life <= 0) return console.log("you win!");
}

function firstTurn({ playerSpeed, enemySpeed }) {
  if (playerSpeed == enemySpeed)
    return Math.floor(Math.random() * 2) ? "player" : "enemy";
  return playerSpeed < enemySpeed ? "enemy" : "player";
}

function Playing() {
  const { idMonster } = useParams();
  const bases = {};
  const [player, setPlayer] = useState(
    monsters.find(({ id }) => id == idMonster)
  );
  const [enemy, setEnemy] = useState(getEnemy());
  const [turn, setTurn] = useState(
    firstTurn({
      playerSpeed: player.speed,
      enemySpeed: enemy.speed,
    })
  );
  bases.player = { ...player };
  bases.enemy = { ...enemy };

  function updatePlayer(newValue) {
    setPlayer(newValue);
  }

  function updateEnemy(newValue) {
    setEnemy(newValue);
  }

  return (
    <>
      <img src={player.image} alt="" />
      <img src={enemy.image} alt="" />
      <Card>
        player life: {player.life}, enemy life: {enemy.life}, turn: {turn}
        <Row xs={1} md={2} className="g-4">
          {player.attacks.map((skill, index) => (
            <Button
              key={index}
              onClick={() =>
                makeAction({
                  actionId: skill.action.id,
                  bases,
                  player,
                  enemy,
                  value: skill.value,
                  type: skill.type,
                  start: "player",
                  updateEnemy,
                  updatePlayer,
                })
              }
            >
              {skill.name}
            </Button>
          ))}
        </Row>
      </Card>
    </>
  );
}

export default Playing;
