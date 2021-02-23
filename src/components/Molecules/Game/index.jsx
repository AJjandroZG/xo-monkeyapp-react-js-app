import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Space } from "../../Atoms";
import { auth } from "../../../firebase";
import "./styles.css";

const Game = ({ data }) => {
  const { uid } = auth().currentUser;
  const [table, settable] = useState([]);
  const [state, setstate] = useState(false);

  useEffect(() => {
    settable(data.table);
  }, [data]);

  const action = (index) => {
    let input = data.users.indexOf(uid) === 0 ? "X" : "O";
    let temp = table;
    temp[parseInt(index, 10)] = input;
    settable(temp);
    setstate(!state)
  };

  return (
    <Card className="card-game">
      <Row gutter={16}>
        {table
          ? table.map((item, i) => (
              <Col key={i} span={8} style={{ padding: 20 }}>
                <Button
                  type="text"
                  onClick={() => action(i)}
                  disabled={item !== "-"}
                >
                  <b style={{fontSize: 40}}>{item}</b>
                </Button>
              </Col>
            ))
          : null}
      </Row>
      <Space>
        <Button type="primary">Tu turno</Button>
        <Button type="primary" danger>
          Rendirte
        </Button>
      </Space>
    </Card>
  );
};

export default Game;
