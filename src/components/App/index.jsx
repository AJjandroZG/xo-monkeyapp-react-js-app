import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "../Atoms";
import { Loading } from "../Molecules";
import { Body, SideMenu } from "../Organisms";
import { firebaseAppListener } from "../../firebase";
import { sideMenuOptions } from "../../commons/const";
import Routes from "../Routes";
import "./styles.css";

const { Content } = Layout;

const App = () => {
  const [authed, setauthed] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const onListenerFirebaseAuth = () => {
    firebaseAppListener(async (user) => {
      setisLoading(true);
      if (user) {
        setauthed(true);
      } else {
        setauthed(false);
      }
      setisLoading(false);
    });
  };

  useEffect(() => {
    onListenerFirebaseAuth();
  }, []);

  const Views = () => <Routes authed={authed} />;

  return (
    <Layout>
      {isLoading ? (
        <Body component={<Loading />} />
      ) : authed ? (
        <Layout>
          <SideMenu sideMenuOptions={sideMenuOptions} />
          <Body component={<Views />} />
        </Layout>
      ) : (
        <Content className="content">
          <Views />
        </Content>
      )}
    </Layout>
  );
};

export default () => (
  <Router>
    <App />
  </Router>
);
