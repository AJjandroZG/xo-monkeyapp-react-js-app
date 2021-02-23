import React, { useState } from "react";
import { Modal, Input, Icon, Spin } from "../../Atoms";
import { firebaseResetPassword } from "../../../firebase";
import { Error } from "../../../commons/helpers";

const RecoveryPass = ({ visible, onCancel }) => {
  const [email, setemail] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const onOk = async () => {
    setisLoading(true);
    try {
      await firebaseResetPassword(email);
      setemail("");
      onCancel()
    } catch (error) {
      Error("Error:", "Error al enviar el correo");
    }
    setisLoading(false);
  };

  return (
    <Modal
      title="Proceso de recuperación de contraseña"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Spin spinning={isLoading}>
        <Input
          prefix={<Icon name="UserOutlined" />}
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="Correo de usuario"
        />
      </Spin>
    </Modal>
  );
};

export default RecoveryPass;
