import React, { useEffect, useState } from "react";
import { Table } from "../../Atoms";
import { columnsTableRace } from "../../../commons/const";
import { NoData } from "../../../commons/helpers";
import { auth } from "../../../firebase";
import { getData, getDoc } from "../../../hooks/firebase";
import "./styles.css";

const Race = () => {
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const get = async () => {
      let uid = auth().currentUser.uid
      let where = {
        value: uid,
        op: "array-contains",
        field: "users"
      }
    let res = await getData("races", where);
    if (res.success) {
        let temp = [];
        res.data.forEach(doc => {
            let opponent = doc.users.filter(e => e !== uid);
            let index = doc.users.indexOf(uid);
            let result = index === 0
                ? `${doc.resultX} - ${doc.resultO}`
                : `${doc.resultO} - ${doc.resultX}`;
            let tags = index === 0
                ? doc.resultX - doc.resultO
                : doc.resultO - doc.resultX
            temp.push({
                key: doc.id,
                opponent: opponent[0],
                result,
                tags,
                rounds: doc.rounds
            })
        });

        for (const doc of temp) {
            let opponent = await getDoc("users", doc.opponent)
            doc.opponent = opponent.doc.name;
        }
        setdata(temp)
    } else {
        NoData()
    }
    setisLoading(false)
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <Table
      loading={isLoading}
      className="table-race"
      dataSource={data}
      scroll={{
        y: "100%",
      }}
      columns={columnsTableRace}
    />
  );
};

export default Race;
