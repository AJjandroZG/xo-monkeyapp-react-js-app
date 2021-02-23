import React, { useEffect, useState } from "react";
import { Card, Avatar, Icon, Input, Button, Spin, Form } from "../../Atoms";
import { Error, Success } from "../../../commons/helpers";
import { auth } from "../../../firebase";
import { updateDoc } from "../../../hooks/firebase";
import "./styles.css";
const { Meta } = Card;

const Profile = () => {
  const [user, setuser] = useState({});
  const [isLoadingUser, setisLoadingUser] = useState(false);
  const [isLoadingPassword, setisLoadingPassword] = useState(false);
  const [disabledButtonSubmit, setdisabledButtonSubmit] = useState(true);
  const [form] = Form.useForm();

  const getUser = async () => {
    try {
      let name = await auth().currentUser.displayName;
      let email = await auth().currentUser.email;
      setuser({
        name,
        email,
      });
    } catch (error) {
      Error(
        "Error:",
        "No se pudo cargar los datos del usuario, refresque la página."
      );
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const editName = async () => {
    setisLoadingUser(true);
    try {
      await auth().currentUser.updateProfile({
        displayName: user.name,
      });
      await updateDoc("users", auth().currentUser.uid, {
        name: user.name
      })
      Success("Muy bien", "Tu nombre fue actualizado correctamente.");
    } catch (error) {
      Error(
        "Error:",
        "No se pudo actualizar el nombre del usuario, refresque la página."
      );
    }
    setisLoadingUser(false);
  };

  const onFinish = async (values) => {
    setisLoadingPassword(true);
    try {
      if (values.password === values.passwordConfirmed) {
        let credential = await auth.EmailAuthProvider.credential(
          user.email,
          values.passwordCurrent
        );
        await auth().currentUser.reauthenticateWithCredential(credential);
        await auth().currentUser.updatePassword(values.passwordConfirmed);
        form.resetFields();
        setdisabledButtonSubmit(true);
        Success("Muy bien", "Tu contraseña fue actualizada correctamente.");
      } else {
        Error(
          "Error de contraseñas:",
          "las contraseñas no coinciden, verifique que ambas coincidan para realizar bien el cambio de contraseña"
        );
      }
    } catch (error) {
      console.log(error);
      Error(
        "Error:",
        "No se pudo actualizar la contraseña del usuario, refresque la página."
      );
    }
    setisLoadingPassword(false);
  };

  const size = 500;
  return (
    <div className="content-profile">
      <Card
        cover={<Avatar size={100} icon={<Icon name="UserOutlined" />} />}
        className="avatar-profile"
      >
        <Spin spinning={isLoadingUser} size="large">
          <div className="card-profile">
            <Meta
              title={<b className="size">Mi perfil</b>}
              description={
                <h4 className="avatar-menu-text-profile">{user.email}</h4>
              }
              style={{ textAlign: "center" }}
            />
            <Input
              prefix={<Icon name="EditOutlined" />}
              placeholder="Nombre"
              onChange={(e) =>
                setuser((state) => ({ ...state, name: e.target.value }))
              }
              value={user.name}
            />
            <div className="button-save">
              <Button ghost onClick={editName}>
                Guardar
              </Button>
            </div>
          </div>
        </Spin>
      </Card>
      <Card
        title={<b style={{ fontSize: 20 }}>Cambiar contraseña</b>}
        style={{ height: size, width: size }}
      >
        <Spin spinning={isLoadingPassword} size="large">
          <Form
            name="change-password"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onChange={() => setdisabledButtonSubmit(false)}
            form={form}
          >
            <Form.Item
              name="passwordCurrent"
              rules={[{ required: true, message: "Ingresé una contraseña" }]}
            >
              <Input.Password
                prefix={<Icon name="LockOutlined" />}
                minLength={6}
                placeholder="Contraseña actual"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Ingresé una contraseña" }]}
            >
              <Input.Password
                prefix={<Icon name="LockOutlined" />}
                minLength={6}
                placeholder="Nueva contraseña"
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
            <Form.Item>
              <div className="button-submit">
                <Button
                  ghost
                  disabled={disabledButtonSubmit}
                  htmlType="submit"
                  className="login-form-button"
                >
                  Cambiar contraseña
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default Profile;
