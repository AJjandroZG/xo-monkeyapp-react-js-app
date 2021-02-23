import React, { useEffect, useState } from "react";
import { List, Card, Avatar, Button } from "../../Atoms";
import challenge from "../../../assets/desafio.png";
import {
  listenerDoc,
  getDoc,
  updateDoc,
  addDoc,
} from "../../../hooks/firebase";
import { auth, firestoreFieldValue } from "../../../firebase";

const Notifications = () => {
  const uid = auth().currentUser.uid;
  const [data, setdata] = useState([]);
  const [indexes, setindexes] = useState([]);

  useEffect(async () => {
    await listenerDoc("users", uid, async (doc) => {
      if (doc.challenged) {
        let temp = [];
        let temp2 = [];
        for (const i in doc.challenged) {
          let opponent = await getDoc("users", doc.challenged[i]);
          opponent.doc.rounds = doc.rounds[i];
          temp.push(opponent.doc);
          temp2.push({
            uid: doc.challenged[i],
            index: parseInt(i, 10),
            rounds: doc.rounds,
          });
        }
        setdata(temp);
        setindexes(temp2);
      } else {
        setdata([]);
      }
    });
  }, [uid]);
  console.log(data);

  const remove = async (opponent) => {
    let doc = indexes.filter((e) => e.uid === opponent);
    doc[0].rounds.splice(doc[0].index, 1);
    await updateDoc("users", uid, {
      challenged: firestoreFieldValue.arrayRemove(opponent),
      rounds: doc[0].rounds,
    });
  };

  const playing = async (opponent) => {
    let doc = indexes.filter((e) => e.uid === opponent);
    let doc2 = data.filter((e) => e.id === opponent);
    doc[0].rounds.splice(doc[0].index, 1);
    await addDoc("playing", {
      rounds: doc2[0].rounds,
      round: 0,
      table: ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
      users: [opponent, uid],
    });
    await updateDoc("users", uid, {
      challenged: firestoreFieldValue.arrayRemove(opponent),
      playing: true,
      rounds: doc[0].rounds,
    });
    await updateDoc("users", opponent, {
      playing: true,
    });
    document.location.reload()
  };

  return (
    <Card title="Buzón de invetaciones" style={{ width: 500, height: 500 }}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                onClick={() => playing(item.id)}
                key="list-loadmore-edit"
              >
                Aceptar
              </Button>,
              <Button
                type="primary"
                onClick={() => remove(item.id)}
                danger
                key="list-loadmore-more"
              >
                Rechazar
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar size={50} src={challenge} />}
              title={item.name}
              description={`Te reta a un duelo de ${item.rounds} rounds`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Notifications;
