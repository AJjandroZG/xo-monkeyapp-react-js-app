import React from "react";
import { Icon, Menu, Card } from "../../Atoms";
import { Link } from "react-router-dom";
import darck_logo from "../../../assets/darck_logo.png";
import "./style.css";
const { Meta } = Card;

const recursiveOptions = (option, onClose) => {
  if (option.subMenu.length > 0) {
    return (
      <Menu.SubMenu
        title={
          <div className="item-menu">
            <Icon name={option.icon} className="icon-menu" />
            {option.name}
          </div>
        }
        key={option.key}
      >
        {option.subMenu.map((subItem) => recursiveOptions(subItem, onClose))}
      </Menu.SubMenu>
    );
  } else {
    return (
      <Menu.Item key={option.key} className="item-menu">
        <Link
          key={`ref:${option.location}`}
          to={option.location}
          onClick={() => {
            if (onClose) onClose();
            if (option.onClick) option.onClick();
          }}
          style={{ color: "greenyellow" }}
        >
          <Icon name={option.icon} className="icon-menu" />
          {option.name}
        </Link>
      </Menu.Item>
    );
  }
};

const Menus = ({ sideMenuOptions, onClose }) => {
  return (
    <Menu mode="inline" className="side-menu" theme="dark">
      <img
        alt="darck-logo"
        src={darck_logo}
        key="logo-key"
        className="image-menu"
      />
      {sideMenuOptions
        ? sideMenuOptions.map((option) => recursiveOptions(option, onClose))
        : null}
      <div key="info-programer" className="card-info">
        <Card hoverable>
          <Meta
            title="Alejandro Zelaya"
            description={
              <div>
                <p>alejandrojosezelayagarcia@gmail.com</p>
                <p>Tel: 9652-8250</p>
              </div>
            }
          />
        </Card>
      </div>
    </Menu>
  );
};
export default Menus;
