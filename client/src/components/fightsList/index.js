import React, { useState, useEffect } from "react";
import { getFights } from "../../services/domainRequest/fightRequest";
import { Button } from "@material-ui/core";
import FightItem from "../fightItem";
import "./fightsList.css";

export default function FightsList({ fightsList }) {
  return (
    <div id="fights-list">
      {fightsList.map((fight) => (
        <FightItem key={fight.id} fight={fight} />
      ))}
    </div>
  );
}
