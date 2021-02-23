import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Card, Form, Button, Input, Icon, Space } from "../../Atoms";
import { RecoveryPassword } from "../../Molecules";
import { firebaseAppAuth } from "../../../firebase";
import { Error } from "../../../commons/helpers";
import logo from "../../../assets/logo.png";
import "./styles.css";

const Login = () => {
  const [visible, setvisible] = useState(false);

  const onFinish= async(values)=>{
    try {
      await firebaseAppAuth(values.username, values.password)
    } catch (error) {
      Error(
        "Error de autenticación:",
        "Verifique sus credenciales ó de click en Regístrate aquí para poder acceder en esta plataforma"
      )
    }
  }

  return (
    <Card.Grid hoverable className="card-login">
      <img alt="logo" src={logo} className="img-login" />
      <RecoveryPassword visible={visible} onCancel={()=>setvisible(false)} />
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Ingresé su correo" }]}
        >
          <Input prefix={<Icon name="UserOutlined" />} placeholder="Correo de usuario" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Ingresé su contraseña" }]}
        >
          <Input
            prefix={<Icon name="LockOutlined" />}
            type="password"
            minLength={6}
            placeholder="Contraseña"
          />
        </Form.Item>
        <Form.Item>
          <Button type="link" onClick={()=>setvisible(true)}>
            ¿Olvidaste tu contraseña?
          </Button>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Ingresar
            </Button>
            <Link to="/register">Regístrate aquí</Link>
          </Space>
        </Form.Item>
      </Form>
    </Card.Grid>
  );
};

export default Login;
