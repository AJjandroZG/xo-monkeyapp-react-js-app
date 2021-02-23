import React from "react";
import { Login, SingIn, Profile, Race, Playing } from "../../components/Views";
import { Tag } from "../../components/Atoms";
import { firebaseAppSingOut } from "../../firebase";

export const privateRoutes = [
  {
    location: "/",
    component: <Playing/>,
    exact: true,
  },
  {
    location: "/playing/:id",
    component: <Playing/>,
    exact: true,
  },
  {
    location: "/profile",
    component: <Profile />,
    exact: true,
  },
  {
    location: "/race",
    component: <Race />,
    exact: true,
  },
];

export const publicRoutes = [
  {
    location: "/login",
    component: <Login />,
    exact: true,
  },
  {
    location: "/register",
    component: <SingIn />,
    exact: true,
  },
];

export const sideMenuOptions = [
  {
    name: "Sala de juegos",
    key: 1,
    icon: "PlayCircleOutlined",
    subMenu: [],
    location: "/",
  },
  {
    name: "Mi Perfil",
    key: 2,
    icon: "UserOutlined",
    subMenu: [],
    location: "/profile",
  },
  {
    name: "Mi Carrera",
    key: 3,
    icon: "TagOutlined",
    subMenu: [],
    location: "/race",
  },
  {
    name: "Cerrar Sesión",
    key: 4,
    icon: "ExportOutlined",
    subMenu: [],
    location: "",
    onClick: () => firebaseAppSingOut(),
  },
];

export const columnsTableRace = [
  {
    title: "Oponente",
    dataIndex: "opponent",
    key: "opponent",
    align: "center",
  },
  {
    title: "Resultado",
    dataIndex: "result",
    key: "result",
    align: "center",
  },
  {
    title: "Rounds",
    dataIndex: "rounds",
    key: "rounds",
    align: "center",
  },
  {
    title: "",
    key: "tags",
    dataIndex: "tags",
    render: (tags) => (
      <Tag color={tags > 0 ? "green" : "red"}>
        {tags > 0 ? "Victoria" : "Derrota"}
      </Tag>
    ),
  },
];

export const columnsTableUsers = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    align: "center",
  },
];
