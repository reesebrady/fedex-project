import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="jumbotron mt-5">
      <div className="container">
        <h1 className="display-4">EV Charger Finder</h1>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <p className="lead mt-4">
                A project created by Ope, Surya, and Reese to allow users to
                find electric vehicle chargers nearby
              </p>
              <Link to="/map">
                <button type="button" className="btn btn-secondary mt-4">
                  Click here to navigate to the map
                </button>
              </Link>
            </div>
            <div className="col">
              <img src="../../public/images/charger.png" width="700" height="500"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
