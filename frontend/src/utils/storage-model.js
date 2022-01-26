import { Storage } from '@capacitor/storage';

const add = async (inputKey, inputValue) => {
  await Storage.set({
    key: inputKey,
    value: JSON.stringify(inputValue),
  });
};

const getStorage = async (inputKey) => {
  const { value } = await Storage.get({ key: inputKey });
  const data = await JSON.parse(value);
  return data;
};

const deleteKey = async (inputKey) => {
  await Storage.remove({ key: inputKey });
};

const LocStorage = { add, getStorage, deleteKey };

export default LocStorage;
