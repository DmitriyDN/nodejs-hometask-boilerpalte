import React, { useState, useEffect } from "react";
import "./fightModal.css";
const FightModal = ({ firstFighter, secondFighter, onClose }) => {
  const [healthPercentageFirst, sethealthPercentageFirst] = useState(100);
  const [healthPercentageSecond, sethealthPercentageSecond] = useState(100);
  const [firstFighterBlock, setfirstFighterBlock] = useState(false);
  const [secondFighterBlock, setSecondFighterBlock] = useState(false);
  const [firstFighterTimer, setfirstFighterTimer] = useState(false);
  const [secondFighterTimer, setSecondFighterTimer] = useState(false);

  useEffect(() => {
    if (healthPercentageFirst === 0 || healthPercentageSecond === 0) {
      const winner = healthPercentageFirst <= 0 ? secondFighter : firstFighter;
      alert("Winner is = " + winner.name);
      onClose();
    }
  }, [healthPercentageFirst, healthPercentageSecond]);

  const firstFighterCombo = {
    81: false,
    87: false,
    69: false,
  };
  const secondFighterCombo = { 85: false, 73: false, 79: false };

  const eventKeyUp = (e) => {
    let damage = 0;
    switch (e.keyCode) {
      case 65:
        if (!firstFighterBlock) {
          if (!secondFighterBlock) {
            damage = getDamage(firstFighter, secondFighter);
            const currentHealthSecond = healthPercentageSecond - damage;
            sethealthPercentageSecond(
              currentHealthSecond < 0 ? 0 : currentHealthSecond
            );
          }
        }
        break;

      case 74:
        if (!secondFighterBlock) {
          if (!firstFighterBlock) {
            damage = getDamage(secondFighter, firstFighter);
            const currentHealthSecond = healthPercentageFirst - damage;
            sethealthPercentageFirst(
              currentHealthSecond < 0 ? 0 : currentHealthSecond
            );
          }
        }

        break;
      case 68:
        setfirstFighterBlock(false);
        break;

      case 76:
        setSecondFighterBlock(false);
        break;
    }
  };

  const eventKeyDown = (e) => {
    switch (e.keyCode) {
      case 68:
        setfirstFighterBlock(true);
        break;
      case 76:
        setSecondFighterBlock(true);
        break;
    }
  };

  const eventComboDown = (e) => {
    if (e.keyCode in firstFighterCombo) {
      firstFighterCombo[e.keyCode] = true;
    }
    if (e.keyCode in secondFighterCombo) {
      secondFighterCombo[e.keyCode] = true;
    }

    if (
      firstFighterCombo[81] &&
      firstFighterCombo[87] &&
      firstFighterCombo[69] &&
      !firstFighterTimer
    ) {
      const currentHealthSecond =
        healthPercentageSecond -
        firstFighter.power * 2 * (secondFighter.health / 100);
      sethealthPercentageSecond(
        currentHealthSecond < 0 ? 0 : currentHealthSecond
      );
      setfirstFighterTimer(true);
      setTimeout(() => {
        setfirstFighterTimer(false);
      }, 10000);
    }

    if (
      secondFighterCombo[85] &&
      secondFighterCombo[73] &&
      secondFighterCombo[79] &&
      !secondFighterTimer
    ) {
      const currentHealthFirst =
        healthPercentageFirst -
        secondFighter.power * 2 * (firstFighter.health / 100);
      sethealthPercentageFirst(currentHealthFirst < 0 ? 0 : currentHealthFirst);

      setSecondFighterTimer(true);
      setTimeout(() => {
        setSecondFighterTimer(false);
      }, 10000);
    }
  };
  const eventComboUp = (e) => {
    if (e.code in firstFighterCombo) {
      firstFighterCombo[e.code] = false;
    }
    if (e.code in secondFighterCombo) {
      secondFighterCombo[e.code] = false;
    }
  };
  function getDamage(attacker, defender) {
    const hit = getHitPower(attacker);
    const block = getBlockPower(defender);
    return hit - block < 0 ? 0 : (hit - block) * (defender.health / 100);
  }

  function getHitPower(fighter) {
    return fighter.power * Math.random() + 1;
  }

  function getBlockPower(fighter) {
    return fighter.defense * Math.random() + 1;
  }

  return (
    <div
      className="modal"
      onKeyDown={(e) => {
        eventKeyDown(e);
        eventComboDown(e);
      }}
      onKeyUp={(e) => {
        eventKeyUp(e);
        eventComboUp(e);
      }}
      tabIndex="0"
    >
      <div className="modal-content">
        <div className="modal-header">
          <div className="fighter-status">
            <p className="fighter-name">{firstFighter.name}</p>
            <div className="health-indicator">
              <div
                className="health-bar"
                style={{ width: healthPercentageFirst + "%" }}
              ></div>
            </div>
          </div>

          <p className="fighter-name">VS</p>
          <div className="fighter-status">
            <p className="fighter-name">{secondFighter.name}</p>
            <div className="health-indicator">
              <div
                className="health-bar"
                style={{ width: healthPercentageSecond + "%" }}
              ></div>
            </div>
          </div>
        </div>
        <div className="modal-body">
          <img
            className="lest-fighter"
            src="https://media.giphy.com/media/kdHa4JvihB2gM/giphy.gif"
            alt="first fighter"
          ></img>
          <img
            className="right-fighter"
            src="https://66.media.tumblr.com/tumblr_lq8g3548bC1qd0wh3o1_400.gif"
            alt="second fighter"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default FightModal;
