import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const HistoryOfShopping = () => {
  const [cartProductList, setCartProductList] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const productsCollectionRef = collection(db, "cart");

  console.log("новый", user);

  const getProductsHistory = async () => {
    try {
      if (user) {
        const data = await getDocs(query(productsCollectionRef));

        const filteredData = [];
        data.forEach((doc) => {
          const productData = doc.data();
          if (productData.userId === user.uid) {
            filteredData.push({
              documentId: doc.id,
              ...productData,
            });
          }
        });

        setCartProductList(filteredData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getProductsHistory();
    }
  }, [user]);

  return (
    <div>
      {cartProductList.map((product) => (
        <div key={product.documentId}>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.color}</p>
          <p>{product.size}</p>
          <p>{product.orederId}</p>
        </div>
      ))}
    </div>
  );
};

export default HistoryOfShopping;
