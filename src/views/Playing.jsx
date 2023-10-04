import { Button, Card, Col, Row } from "react-bootstrap";
import { monsters } from "../data";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

let player, enemy, turn;
const bases = {};

function getEnemy() {
  const index = Math.floor(Math.random() * monsters.length) + 1;
  return monsters[index > 0 ? index - 1 : index];
}

function makeAction({ actionId, percent, type, start }) {
  if (actionId == 1) {
  }
  console.log("owo");
}

function firstTurn({ playerSpeed, enemySpeed }) {
  if (playerSpeed == enemySpeed) return Math.floor(Math.random() * 2);
  return playerSpeed < enemySpeed ? 1 : 0;
}

function Playing() {
  const { idMonster } = useParams();
  player = { ...monsters.find(({ id }) => id == idMonster) };
  enemy = { ...getEnemy() };
  bases.player = { ...player };
  bases.enemy = { ...enemy };

  turn = firstTurn({
    playerSpeed: player.speed,
    enemySpeed: enemy.speed,
  });

  return (
    <>
      <img src={player.image} alt="" />
      <img src={enemy.image} alt="" />
      <Card>
        player life: {player.life}, enemy life: {enemy.life}
        <Row xs={1} md={2} className="g-4">
          {player.attacks.map((skill, index) => (
            <Button
              key={index}
              onClick={() =>
                makeAction({
                  actionId: skill.action.id,
                  percent: skill.percent,
                  type: skill.type,
                  start: "play"
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
