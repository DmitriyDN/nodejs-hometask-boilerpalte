import React, { useState, useEffect } from "react";
import { getFighter } from "../../services/domainRequest/fightersRequest";

import "./fightItem.css";

export default function FightItem({ fight }) {
  const [firstFighter, setFirstFighter] = useState({});
  const [secondFighter, setSecondFighter] = useState({});
  useEffect(() => {
    getFighter(fight.fighter1).then((res) => {
      setFirstFighter(res);
    });
    getFighter(fight.fighter2).then((res) => setSecondFighter(res));
  }, []);
  return (
    <div className="fight">
      <div className="left-fighter-stats">
        <p>Name:{firstFighter.name}</p>
        <p>Shots:{fight.fighter1Shot}</p>
        <p>Health:{Math.round(fight.fighter1Health)}%</p>
      </div>
      {fight.fighter1Health === 0 ? (
        <>
          <p>LOSE</p>
          <p>VS</p>
          <p>WIN</p>
        </>
      ) : (
        <>
          <p>WIN</p>
          <p>VS</p>
          <p>LOSE</p>
        </>
      )}
      <div className="right-fighter-stats">
        <p>Name:{secondFighter.name}</p>
        <p>Shots:{fight.fighter2Shot}</p>
        <p>Health:{Math.round(fight.fighter2Health)}%</p>
      </div>
    </div>
  );
}
