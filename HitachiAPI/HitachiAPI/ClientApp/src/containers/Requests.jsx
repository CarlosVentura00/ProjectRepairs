import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import issues from "../issues";
import laptops from "../laptops";

const Requests = () => {
    const [requests, setRequests] = useState([]);

    const [laptopFilter, setLaptopFilter] = useState('');
    const [issueFilter, setIssueFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        fetch('https://localhost:44374/api/issue/GetRepair', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            body: JSON.stringify({
                laptopType: laptopFilter,
                issue: issueFilter,
                date: dateFilter,
            }),
        })
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((responseRequest) => {
                console.log(responseRequest);
                if (Array.isArray(responseRequest)) {
                    setRequests(responseRequest);
                } else {
                    setRequests([]);
                }
            });
    }, [laptopFilter, issueFilter, dateFilter]);

    const laptopFilterChangeHandler  = (event) => {
        setLaptopFilter(event.target.value);
    }

    const issueFilterChangeHandler = (event) => {
        setIssueFilter(event.target.value);
    }

    const dateFilterChangeHandler = (event) => {
        setDateFilter(event.target.value);
    }

    return (
        <div style={{ textAlign: "center" }}>

            <div>
                <label>Filter By Laptop:</label>
                <select value={laptopFilter} onChange={laptopFilterChangeHandler} defaultValue="">
                    <option value=""></option>
                    {laptops.map((laptop) => (
                        <option key={laptop.id} value={laptop.id}>
                            {laptop.label}
                        </option>
                    ))}
                </select>

                <label>Filter By Issue:</label>
                <select value={issueFilter} onChange={issueFilterChangeHandler} defaultValue="">
                    <option value=""></option>
                    {issues.map((issue) => (
                        <option key={issue.id} value={issue.id}>
                            {issue.label}
                        </option>
                    ))}
                </select>

                <label style={{ width: "115px", textlign: "right" }}>Filter By Date: </label>
                <input style={{ width: "190px" }} type="date" value={dateFilter} onChange={dateFilterChangeHandler}></input>
            </div>

            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Laptop Type</th>
                        <th scope="col">Serial Number</th>
                        <th scope="col">Issue</th>
                        <th scope="col">Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id}>
                            <td scope="row">{request.id}</td>
                            <td>{laptops.find((laptop) => laptop.id === request.laptopType)?.label || '-'}</td>
                            <td>{request.serialNumber}</td>
                            <td>{issues.find((issues) => issues.id === request.issue)?.label || '-'}</td>
                            <td>{new Date(request.date).toLocaleDateString()}</td>
                            <td>{request.name}</td>
                            <td>{request.email}</td>
                            <td>{request.notes}</td>
                            <td>{request.picture ? (
                                <img src={`data:image/png;base64,${request.picture}`} />
                                ) : null}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <Link to="/">
                <button className="btn btn-primary" style={{ width: "80px", marginTop: "20px" }}>Back</button>
            </Link>
           
        </div>

        
    );
};

export default Requests;
