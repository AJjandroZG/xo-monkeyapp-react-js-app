import React from "react";
import { Layout } from "../../Atoms";
import { Menu } from "../../Molecules";
const { Sider } = Layout;

const SideMenu = ({ sideMenuOptions }) => {
  return (
    <Sider width={300} className="Scroll">
      <Menu sideMenuOptions={sideMenuOptions} />
    </Sider>
  );
};
export default SideMenu;
