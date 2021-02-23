import React from "react";
import { Card, Form, Button, Input, Icon, Space } from "../../Atoms";
import { firebaseAppCreateUser, auth } from "../../../firebase";
import { setDoc } from "../../../hooks/firebase";
import { Link } from "react-router-dom";
import { Error } from "../../../commons/helpers";
import logo from "../../../assets/logo.png";
import "./styles.css";

const Login = () => {
  const onFinish = async (values) => {
    let message = [];

    if (values.password !== values.passwordConfirmed)
      message.push({
        message:
          "Las contraseñas no coinciden, verifique que estas coincidan para poder hacer el registro con éxito",
      });
    if (!values.username.includes("@"))
      message.push({
        message: "El correo no es válido, cambielo por un correo valido",
      });
    if (message.length === 0) {
      try {
        let {user} = await firebaseAppCreateUser(values.username, values.passwordConfirmed);
        await auth().currentUser.updateProfile({
          displayName: values.name,
        });
        await setDoc("users",user.uid,{
          email: values.username,
          name: values.name
        })
      } catch (error) {
        Error(
          "Error:",
          "Ocurrio un error en el registro, intentelo nuevamente"
        )
      }
    } else {
      Error(
        "Error:",
        <div>
          {message.map((msg) => (
            <p>- {msg.message}</p>
          ))}
        </div>
      );
    }
  };

  return (
    <Card.Grid hoverable className="card-register">
      <img alt="logo" src={logo} className="img-register" />
      <Form
        name="sing-in"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Ingresé un correo" }]}
        >
          <Input
            prefix={<Icon name="UserOutlined" />}
            placeholder="Correo de usuario"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Ingresé una contraseña" }]}
        >
          <Input.Password
            prefix={<Icon name="LockOutlined" />}
            minLength={6}
            placeholder="Contraseña"
          />
        </Form.Item>
        <Form.Item
          name="passwordConfirmed"
          rules={[{ required: true, message: "Confirme la contraseña" }]}
        >
          <Input.Password
            prefix={<Icon name="LockOutlined" />}
            minLength={6}
            placeholder="Confirmar contraseña"
          />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Ingresé su nombre" }]}
        >
          <Input prefix={<Icon name="EditOutlined" />} placeholder="Nombre" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Regístrarse
            </Button>
            <Link to="/login">Iniciar sesión aquí</Link>
          </Space>
        </Form.Item>
      </Form>
    </Card.Grid>
  );
};

export default Login;
