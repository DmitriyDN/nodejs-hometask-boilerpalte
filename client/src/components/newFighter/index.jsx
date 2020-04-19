import { TextField } from "material-ui"
import { createFighter } from "../../services/domainRequest/fightersRequest";
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import './newFighter.css';

export default function NewFighter({ onCreated }) {
    const [name, setName] = useState();
    const [power, setPower] = useState();

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onPowerChange = (event) => {
        setPower(event.target.value);
    }

    const onSubmit = async () => {
        const data = await createFighter({ name, power });
        if(data && !data.error) {
            onCreated(data);
        }
    }

    return (
        <div id="new-fighter">
            <div>New Fighter</div>
            <TextField onChange={onNameChange} id="standard-basic" label="Standard" placeholder="Name"/>
            <TextField onChange={onPowerChange} id="standard-basic" label="Standard" placeholder="Power" type="number" />
            <Button onClick={onSubmit} variant="contained" color="primary">Create</Button>
        </div>
    );
};