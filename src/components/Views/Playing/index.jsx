import React, { useEffect, useState, Fragment } from "react";
import { Users, Notifications } from "../../Molecules";
import { CurrentGame } from "../../Organisms";
import { useParams, useHistory } from "react-router-dom";
import { auth } from "../../../firebase";
import { getData, listenerDoc } from "../../../hooks/firebase";
import { NoData } from "../../../commons/helpers";
import "./styles.css";

const Playing = () => {
  const [data, setdata] = useState({});
  const { uid } = auth().currentUser;
  const { id } = useParams();
  const history = useHistory();

  const get = async () => {
    let where = {
      value: uid,
      op: "array-contains",
      field: "users",
    };
    let res = await getData("playing", where);
    if (res.success) {
      if (res.data.length > 0) {
        history.push(`/playing/${res.data[0].id}`);
        setdata(res.data[0]);
      }
    } else {
      NoData();
    }
  };

  useEffect( async () => {
    await listenerDoc("playing", id, async (doc) => {
        console.log(doc)
      });
  }, [])

  useEffect(() => {
    get();
  }, []);

  return (
    <Fragment>
      {id ? (
        <CurrentGame data={data} />
      ) : (
        <div className="content-playing">
          <Users />
          <Notifications />
        </div>
      )}
    </Fragment>
  );
};

export default Playing;
