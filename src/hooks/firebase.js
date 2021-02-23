import { db } from "../firebase";

export const getData = async (collection, where) => {
  const data = { data: [] };
  try {
    const ref = db().collection(collection);
    const whereRef = where
      ? ref.where(where.field, where.op, where.value)
      : ref;
    data.snapshot = await whereRef.get();
    data.snapshot.forEach((doc) => {
      data.data.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    data.success = true;
  } catch (error) {
    data.success = false;
    data.data = [];
  }
  return data;
};

export const getDoc = async (collection, doc) => {
  const data = {};
  try {
    const ref = db().collection(collection).doc(doc);
    data.doc = await (await ref.get()).data();
    data.doc = {
      ...data.doc,
      id: doc
    }
    data.success = true;
  } catch (error) {
    data.success = false;
  }
  return data;
};

export const updateDoc = async (collection, doc, data) => {
  try {
    const ref = db().collection(collection).doc(doc);
    await ref.update(data)
    return true;
  } catch (error) {
    return false;
  }
};

export const setDoc = async (collection, doc, data) => {
  try {
    const ref = db().collection(collection).doc(doc);
    await ref.set(data)
    return true;
  } catch (error) {
    return false;
  }
};

export const addDoc = async (collection, data) => {
  try {
    const ref = db().collection(collection);
    await ref.add(data)
    return true;
  } catch (error) {
    return false;
  }
};

export const listenerDoc = async (collection, doc, callback) => {
  try {
    const ref = db().collection(collection).doc(doc);
    ref.onSnapshot((e)=> callback(e.data()))
  } catch (error) {
    return false;
  }
};