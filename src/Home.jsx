import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./assets/home.css";

function Home() {
  return (
    <>
      <div className="container">
        <div className="item">
          <h1>Just a fight!</h1>
          <Link to={`selection`} className="buttonsito">
            <Button>Play!</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
