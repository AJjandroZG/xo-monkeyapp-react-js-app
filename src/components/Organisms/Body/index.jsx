import React from "react";
import { Layout } from "../../Atoms";
import "./style.css";
const {Content} = Layout

const Contents = ({ component }) => {
  return <Content className="body-content-page">{component}</Content>;
};
export default Contents;
