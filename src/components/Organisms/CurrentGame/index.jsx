import React, { useState } from "react";
import { TableGame, Loading, Game } from "../../Molecules";
import "./styles.css"

const CurrentGame = ({ data }) => {
  const [isloading, setisloading] = useState(true);
  return (
    <div className="content-current-game">
      {isloading ? <Loading /> : null}
      <TableGame data={data} setisloading={setisloading} />
      <Game data={data} />
    </div>
  );
};

export default CurrentGame;
