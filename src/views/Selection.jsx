import { Card, Col, Row } from "react-bootstrap";
import { monsters, types } from "../data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Selection() {
  const navigate = useNavigate();
  const [bugs, setMonsters] = useState(monsters);

  const selectMonster = (monster) => {
    navigate(`/playing/${monster.id}`);
  };
  return (
    <>
      <h1>Select a monster!</h1>
      <Row xs={1} md={5} className="g-4">
        {bugs.map((monster, index) => (
          <Col key={index}>
            <Card
              style={{ cursor: "pointer" }}
              onClick={() => selectMonster(monster)}
            >
              <Card.Img
                variant="top"
                src={monster.image}
                alt=""
                style={{ height: "250px", width: "250px" }}
              />
              <Card.Title>{monster.name}</Card.Title>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Selection;
