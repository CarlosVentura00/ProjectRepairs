import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Home from './containers/Home';
import CreateRequest from "./containers/CreateRequest";
import Requests from "./containers/Requests";

function App() { 
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/createRepair" element={<CreateRequest />} />
                    <Route path="/requests" element={<Requests />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </div>
  )
}

export default App;
