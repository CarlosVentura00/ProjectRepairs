import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div className="content" style={{ textAlign: "center" }}>
            <h1 style={{ textAlign: "center", marginTop: "30px" }}>Welcome to Hitachi Solutions assistance center</h1>
            <div className="NewRepair_Screen" style={{ marginBottom: "20px", marginTop: "50px" }}>
                <Link to="/createRepair">
                    <button className="btn btn-primary" >Request Assistance</button>
                </Link>
            </div>
            <div className="CheckRequests_Screen">
                <Link to="/requests">
                    <button className="btn btn-primary">Check Requests</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
