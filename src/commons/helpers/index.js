import { Modal } from "../../components/Atoms";

export const NoData = () => {
  Modal.error({
    title: "Error:",
    content: "Error al obtener los datos",
  });
};

export const Error = (title, message)=>{
  Modal.error({
    title: title,
    content: message,
  });
}

export const Success = (title, message)=>{
  Modal.success({
    title: title,
    content: message,
  });
}

export const forPadding = (width) => {
  let y = -(0.0316239316239)*(width) + 58.974358974359 
  return y;
};
