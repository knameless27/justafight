import { Button, Card, Col, Row, Modal, ProgressBar } from "react-bootstrap";
import { getAttack, monsters } from "../data";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../assets/playing.css";
import cloneDeep from "lodash/cloneDeep";

function getEnemy() {
  const index = Math.floor(Math.random() * monsters.length) + 1;
  return monsters[index > 0 ? index - 1 : index];
}

function changeTurn({
  actionId,
  bases,
  player,
  enemy,
  value,
  type,
  start,
  updateEnemy,
  updatePlayer,
  turn,
  updateTurn,
  updateHistory,
  history,
  handleShow,
}) {
  if (turn == "player") {
    makeAction({
      actionId,
      bases,
      player,
      enemy,
      value,
      type,
      start,
      updateEnemy,
      updatePlayer,
      updateHistory,
      history,
      handleShow,
    });
  }
  if (turn == "enemy") {
    setTimeout(() => {
      makeAction({
        actionId,
        bases,
        player,
        enemy,
        value,
        type,
        start: "enemy",
        updateEnemy,
        updatePlayer,
        updateHistory,
        history,
        handleShow,
      });
    }, 800);
  }
  setTimeout(() => {
    updateTurn(turn == "player" ? "enemy" : "player");
  }, 100);
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
  updateHistory,
  history,
  handleShow,
}) {
  const source = start === "player" ? { ...player } : { ...enemy };
  const target = start === "player" ? { ...enemy } : { ...player };
  const sourceString = start === "player" ? "player" : "enemy";
  const newHistory = `(${sourceString}): ${source.name} use ${
    getAttack(actionId).name
  }`;
  updateHistory([...history, newHistory]);
  console.log(history);
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
        history,
        updateHistory,
        handleShow,
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
        history,
        updateHistory,
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
        history,
        updateHistory,
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
        history,
        updateHistory,
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
        history,
        updateHistory,
      }),
    6: () =>
      updateStat({
        source,
        stat: "defense",
        sourceString,
        value,
        maxValue: undefined,
        updateEnemy,
        updatePlayer,
        increase: false,
        history,
        updateHistory,
      }),
    7: () =>
      updateStat({
        source,
        stat: "damage",
        sourceString,
        value,
        maxValue: undefined,
        updateEnemy,
        updatePlayer,
        increase: false,
        history,
        updateHistory,
      }),
    8: () =>
      updateStat({
        source,
        stat: "speed",
        sourceString,
        value,
        maxValue: undefined,
        updateEnemy,
        updatePlayer,
        increase: false,
        history,
        updateHistory,
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
  updateHistory,
  history,
  handleShow,
}) {
  const isWeak = target.types.some((typx) => typx.weakness.includes(type));

  let totalValue = Math.floor(source.attack * `0.${value}`);

  if (!isWeak) totalValue -= Math.round(target.defense * `0.${value}`);

  target.life = totalValue < 0 ? target.life : target.life - totalValue;

  const newHistory = `(${sourceString}): ${source.name} did a total of ${
    totalValue < 0 ? 0 : totalValue
  } damage!`;
  updateHistory([...history, newHistory]);

  if (sourceString === "player") {
    if (target.life <= 0)
      return endGame({
        enemy: target,
        player: source,
        updateHistory,
        history,
        handleShow,
      });
    updateEnemy({ ...target, life: target.life });
  } else {
    if (target.life <= 0)
      return endGame({
        enemy: source,
        player: target,
        updateHistory,
        history,
        handleShow,
      });
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
  increase = true,
  updateHistory,
  history,
}) {
  const updatedStat = increase ? source[stat] + value : source[stat] - value;

  if (maxValue !== undefined && updatedStat > maxValue) return;

  source[stat] = updatedStat;
  let newHistory;
  if (increase) {
    newHistory = `(${sourceString}): ${source.name} increased its ${stat} by ${value}!`;
    if (sourceString === "player") {
      updatePlayer({ ...source });
    } else {
      updateEnemy({ ...source });
    }
  } else {
    newHistory = `(${sourceString}): ${source.name} ${stat} decreases by ${value}!`;
    if (sourceString === "player") {
      updateEnemy({ ...source });
    } else {
      updatePlayer({ ...source });
    }
  }
  updateHistory([...history, newHistory]);
}

function endGame({ player, enemy, updateHistory, history, handleShow }) {
  handleShow();
  if (player.life <= 0) {
    const newHistory = `you lose!`;
    updateHistory([...history, newHistory]);
    return;
  }
  if (enemy.life <= 0) {
    const newHistory = "you win!";
    updateHistory([...history, newHistory]);
    return;
  }
}

function firstTurn({ playerSpeed, enemySpeed }) {
  if (playerSpeed == enemySpeed)
    return Math.floor(Math.random() * 2) ? "player" : "enemy";
  return playerSpeed < enemySpeed ? "enemy" : "player";
}

function Playing() {
  const { idMonster } = useParams();
  const navigate = useNavigate();
  const [bases, setBases] = useState({
    player: {},
    enemy: {},
  });
  const [player, setPlayer] = useState(
    monsters.find(({ id }) => id == idMonster)
  );
  const [enemy, setEnemy] = useState(getEnemy());
  const [show, setShow] = useState(false);
  const [history, setHistory] = useState(["The combat beggins!"]);
  const [turn, setTurn] = useState(
    firstTurn({
      playerSpeed: player.speed,
      enemySpeed: enemy.speed,
    })
  );

  function updateBases() {
    const tempPlayer = cloneDeep(player);
    const tempEnemy = cloneDeep(enemy);
    setBases({ player: tempPlayer, enemy: tempEnemy });
  }

  let counter = 0;
  useEffect(() => {
    updateBases();
    counter++;
    if (counter == 1) {
      enemyAttack();
    }
  }, []);

  useEffect(() => {
    enemyAttack();
  }, [turn]);

  const enemyAttack = () => {
    if (turn == "enemy") {
      const indx = Math.round(Math.random() * enemy.attacks.length);
      const attack = enemy.attacks[indx - 1 < 0 ? 0 : indx - 1];
      changeTurn({
        actionId: attack.action.id,
        bases,
        player,
        enemy,
        value: attack.value,
        type: attack.type,
        start: "enemy",
        updateEnemy,
        updatePlayer,
        turn,
        updateTurn,
        updateHistory,
        history,
        handleShow,
      });
    }
  };

  function updateHistory(newValue) {
    setHistory(newValue);
  }

  function updateTurn(newValue) {
    setTurn(newValue);
  }

  function updatePlayer(newValue) {
    setPlayer(newValue);
  }

  function updateEnemy(newValue) {
    setEnemy(newValue);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function tryAgain() {
    window.location.href = window.location.href;
  }

  function newCharacter() {
    navigate(`/selection`);
  }
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            {player.life <= enemy.life ? "You lose!" : "You win!"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={tryAgain}>
            Try again!
          </Button>
          <Button variant="primary" onClick={newCharacter}>
            Select a new character!
          </Button>
        </Modal.Footer>
      </Modal>
      <Row md={2}>
        <Col>
          <Card className="enemyCard">
            {enemy.name}
            <ProgressBar
              variant="danger"
              animated
              now={enemy.life}
              max={bases.enemy.life}
            />
            {enemy.life} / {bases.enemy.life}
          </Card>
        </Col>
        <Col>
          <div className="enemyContainer">
            <img src={enemy.image} alt="" className="enemyImage" />
          </div>
        </Col>
        <Col>
          <img src={player.image} alt="" />
        </Col>
        <Col>
          <Card className="playerCard">
            {player.name}
            <ProgressBar
              variant="success"
              animated
              now={player.life}
              max={bases.player.life}
            />
            {player.life} / {bases.player.life}
          </Card>
        </Col>
      </Row>
      <div>
        <Row>
          <Col className="history" ref={scrollContainerRef}>
            {history.map((entry, i) => {
              const isPlayerEntry = entry.includes("(player):");
              const authorClass = isPlayerEntry
                ? "player-entry"
                : "enemy-entry";
              return (
                <p key={i} className={authorClass}>
                  {entry}
                </p>
              );
            })}
          </Col>
          {turn == "player" && (
            <Col>
              <Row md={2} className="g-2">
                {player.attacks.map((skill, index) => (
                  <Col className="d-grid" key={index}>
                    <Button
                      size="lg"
                      onClick={() =>
                        changeTurn({
                          actionId: skill.action.id,
                          bases,
                          player,
                          enemy,
                          value: skill.value,
                          type: skill.type,
                          start: "player",
                          updateEnemy,
                          updatePlayer,
                          turn,
                          updateTurn,
                          updateHistory,
                          history,
                          handleShow,
                        })
                      }
                    >
                      {skill.name}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
}

export default Playing;
