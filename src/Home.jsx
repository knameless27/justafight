import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./home.css";

function Home() {
  return (
    <>
      <h1>Just a fight!</h1>
      <Link to={`selection`}>
        <Button>Play!</Button>
      </Link>
    </>
  );
}

export default Home;
