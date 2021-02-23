import React, { useEffect, useState } from "react";
import { getDoc } from "../../../hooks/firebase";
import { auth } from "../../../firebase";
import { NoData } from "../../../commons/helpers";
import "./styles.css";

const TableGame = ({ data, setisloading }) => {
  const { uid } = auth().currentUser;
  const [rounds, setrounds] = useState([]);
  const [opponent, setopponent] = useState("");
  const [visible, setvisible] = useState(false);

  const get = async (users) => {
    let id = users.filter((e) => e !== uid);
    let res = await getDoc("users", id[0]);
    if (res.success) {
      setopponent(res.doc);
    } else {
      NoData();
    }
    setisloading(false)
    setvisible(true)
  };


  useEffect(() => {
    let temp = [];
    for (let i = 0; i < data.rounds; i++) {
      temp.push(i + 1);
    }
    setrounds(temp);
    if (data.users) {
      get(data.users);
    }
  }, [data]);

  return (
    <>
      { visible
        ? <ul className="header-table-game">
        <li className="line1-header-table-game">
          <div style={{ width: 100 }}>
            <b className="text-header-table-game">ROUNDS</b>
          </div>
          {rounds.map((e) => (
            <b key={e} className="text-header-table-game">
              {e}
            </b>
          ))}
        </li>
        <li className="line1-header-table-game">
          <div style={{ width: 100 }}>
            <b className="text-header-table-game">{opponent.name}</b>
          </div>
          {rounds.map((e) => (
            <b key={e} className="text-header-table-game">
              -
            </b>
          ))}
        </li>
        <li className="line1-header-table-game">
          <div style={{ width: 100 }}>
            <b className="text-header-table-game">Tú</b>
          </div>
          {rounds.map((e) => (
            <b key={e} className="text-header-table-game">
              -
            </b>
          ))}
        </li>
      </ul>
      : null
      }
    </>
    
  );
};

export default TableGame;
