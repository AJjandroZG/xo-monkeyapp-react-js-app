import React, { useState, useEffect } from "react";
import { columnsTableUsers } from "../../../commons/const";
import { NoData } from "../../../commons/helpers";
import { Card, Table, Button, Tag, Dropdown, Menu } from "../../Atoms";
import { getData, updateDoc } from "../../../hooks/firebase";
import { auth, firestoreFieldValue } from "../../../firebase";

const Users = () => {
  const { uid } = auth().currentUser
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [addButton, setaddButton] = useState(false);

  const menu =(doc)=> (
    <Menu>
      <span>A:</span>
      <Menu.Item>
        <Button type="link" onClick={() => challenge(doc.id, 3)}>
          3 Rounds
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link" onClick={() => challenge(doc.id, 5)}>
          5 Rounds
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link" onClick={() => challenge(doc.id, 7)}>
          7 Rounds
        </Button>
      </Menu.Item>
    </Menu>
  );

  if (addButton) {
    let temp = [];
    data.forEach((doc) => {
      let challenged = doc.challenged
        ? doc.challenged.indexOf(uid) > -1
          ? true
          : false
        : false;
      temp.push({
        ...doc,
        action: challenged ? (
          <Tag color="blue">Retado</Tag>
        ) : doc.playing ? (
          <Tag color="green">Jugando</Tag>
        ) : (
          <Dropdown overlay={()=>menu(doc)}>
            <Button type="primary">
              Retar
            </Button>
          </Dropdown>
        ),
      });
    });
    setdata(temp);
    setaddButton(false);
  }

  const challenge = async (opponent, rounds) => {
    let uid = auth().currentUser.uid;
    await updateDoc("users", opponent, {
      challenged: firestoreFieldValue.arrayUnion(uid),
      rounds: firestoreFieldValue.arrayUnion(rounds)
    });
    setisLoading();
    get();
  };

  const get = async () => {
    let where = {
      op: "!=",
      field: "email",
      value: auth().currentUser.email,
    };
    let res = await getData("users", where);
    if (res.success) {
      let temp = [];
      res.data.forEach((doc) => {
        temp.push({
          ...doc,
          key: doc.id,
        });
      });
      setdata(temp);
      setaddButton(true);
    } else {
      NoData();
    }
    setisLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <Card title="Jugadores" style={{ width: 500, height: 500 }}>
      <Table
        loading={isLoading}
        dataSource={data}
        scroll={{
          y: "100%",
        }}
        columns={columnsTableUsers}
        pagination={false}
      />
    </Card>
  );
};

export default Users;
