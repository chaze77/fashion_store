import React, { useEffect } from "react";
import { storeData } from "../data/Data";
import { db } from "../config/firebase";
import { addDoc, collection, doc } from "firebase/firestore";

const Upload = () => {
  useEffect(() => {
    // Функция загрузки данных в Firestore
    const uploadDataToFirestore = async () => {
      try {
        for (const item of storeData) {
          // Создаем новый документ в коллекции "products" и устанавливаем его данные
          const docRef = await addDoc(collection(db, "products"), item);
          console.log(
            "Данные успешно добавлены в Firestore. ID документа:",
            docRef.id
          );
        }
      } catch (error) {
        console.error("Ошибка при добавлении данных в Firestore:", error);
      }
    };

    // Вызываем функцию загрузки данных
    uploadDataToFirestore();
  }, []);

  return <div></div>;
};

export default Upload;
