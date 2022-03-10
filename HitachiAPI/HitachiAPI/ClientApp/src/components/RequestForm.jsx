import React, { useState, useRef } from "react";
import { mask } from 'node-masker';
import { Link } from "react-router-dom";

import issues from "../issues";
import laptops from "../laptops";


const RequestForm = (props) => {
    const { onSubmit } = props;

    const [selectedLaptopType, setSelectedLaptopType] = useState(laptops[0].id);
    const [selectedIssue, setSelectedIssue] = useState(issues[0].id);
    const [enteredNotes, setEnteredNotes] = useState('');
    const [enteredSerialNumber, setEnteredSerialNumber] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    const [uploadedPicture, setUploadedPicture] = useState('');

    const fileInput = useRef(null);

    const laptopTypeChangeHandler = (event) => {
        setSelectedLaptopType(event.target.value);
    }

    const issueChangeHandler = (event) => {
        setSelectedIssue(event.target.value);
    }

    const notesChangeHandler = (event) => {
        setEnteredNotes(event.target.value);
    }

    const serialNumberChangeHandler = (event) => {
        setEnteredSerialNumber(mask(event.target.value, '99999-999999'));
    }

    const emailChangeHandler = (event) => {
        const emailValue = event.target.value;
        setEnteredEmail(emailValue)
    }


    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    }

    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    }

    const emailBlurHandler = (event) => {
        const emailValue = event.target.value;

        if (emailValue) {
            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            const matched = emailValue.match(regex);
            if (!matched) {
                setEnteredEmail('')
            }
        }
    }

    const pictureChangeHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.target.files.length) {
            setUploadedPicture(event.target.files[0]);
        }
    }

    const selectFile = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const issueData = {
            laptopType: selectedLaptopType,
            issue: selectedIssue,
            notes: enteredNotes,
            serialNumber: enteredSerialNumber,
            email: enteredEmail,
            name: enteredName,
            date: enteredDate,
            picture: uploadedPicture
        };

        await onSubmit(issueData);

        setSelectedLaptopType(laptops[0].id);
        setSelectedIssue(issues[0].id);
        setEnteredNotes('');
        setEnteredSerialNumber('');
        setEnteredEmail('');
        setEnteredName('');
        setEnteredDate('');
        setUploadedPicture('');
    };

    return (
        <div className="repair-form" style={{ textAlign: "center" }}>
            <form onSubmit={submitHandler} style={{ textAlign: "center", marginTop: "50px" }}>
                <div>
                    <label style={{ width: "115px", textAlign: "right" }}>Laptop Type:</label>
                    <select style={{ width: "190px" }} value={selectedLaptopType} onChange={laptopTypeChangeHandler}>
                        {laptops.map((laptop) => (
                            <option key={laptop.id} value={laptop.id}>
                                {laptop.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label style={{ width: "115px", textAlign: "right" }}>Issue: </label>
                    <select value={selectedIssue} onChange={issueChangeHandler}>
                        {issues.map((issue) => (
                            <option key={issue.id} value={issue.id}>
                                {issue.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label style={{ width: "115px", textAlign: "right" }}>Notes: </label>
                    <input
                        type="text"
                        value={enteredNotes}
                        maxLength="500"
                        placeholder="max 500 characters"
                        onChange={notesChangeHandler}
                        required
                    />
                </div>
                <div>
                    <label style={{ width: "115px", textAlign: "right" }}>Serial Number: </label>
                    <input type="text" required value={enteredSerialNumber} placeholder="ex:12345-345637" onChange={serialNumberChangeHandler}></input>
                </div>
                <div>
                    <label style={{ width: "115px", textAlign: "right" }}>Name: </label>
                    <input type="text" required maxLength="10" placeholder="max 10 characters" value={enteredName} onChange={nameChangeHandler}></input>
                </div>
                <div>
                    <label style={{ width: "115px", textAlign: "right" }}>Email: </label>
                    <input type="text" placeholder="insert a valid email" required value={enteredEmail} onBlur={emailBlurHandler} onChange={emailChangeHandler}></input>
                </div>
                <div>
                    <label style={{ width: "115px", textAlign: "right" }}>Date: </label>
                    <input style={{ width: "190px" }} type="date" required value={enteredDate} onChange={dateChangeHandler}></input>
                </div>

                <div>
                    <input id="imageInput" type="file" ref={fileInput} style={{ "display": "none", width: "190px" }} onChange={pictureChangeHandler} />
                    <button type="button" onClick={selectFile} className="btn btn-primary btn-sm">Choose an image</button>

                    <label style={{ width: "190px" }}>{uploadedPicture ? uploadedPicture.name : 'No image uploaded'}</label>
                    <div style={{ display: "inline-table" }}>
                        {uploadedPicture
                            ? <img src={URL.createObjectURL(uploadedPicture)} style={{ maxWidth: "150px", maxHeight: "80px" }} />
                            : null}
                    </div>
                </div>

                <div className="submit-action" style={{ marginTop: "20px" }}>
                    <button type="submit">Submit Request</button>
                </div>
            </form>

            <Link to="/">
                <button type="button" className="btn btn-primary" style={{ width: "70px", marginTop: "20px" }}>Back</button>
            </Link>
        </div>
    );
};

export default RequestForm;