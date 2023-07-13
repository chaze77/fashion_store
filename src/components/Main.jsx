import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { Box, Container, Tab, Tabs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setProductsList } from "../slices/productsSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import AddProductModal from "./AddProductModal";
import "./style.css";

const Main = () => {
  const productsCollectionRef = query(collection(db, "products"));
  const dispatch = useDispatch();
  const { productsList } = useSelector((state) => state.products);
  const { isAdmin } = useSelector((state) => state.auth);
  const [selectedTab, setSelectedTab] = useState("all");
  const [showModal, setShowModal] = useState(false);

  // Функция для обработки изменения выбранной вкладки
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Фильтрация списка товаров по выбранному типу
  const filteredProducts =
    selectedTab === "all"
      ? productsList // Если выбрана вкладка "all", показываем все товары
      : productsList.filter((item) => item.type === selectedTab);

  const getProducts = async () => {
    try {
      const data = await getDocs(productsCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        documentId: doc.id,
        ...doc.data(),
      }));
      console.log(filteredData);

      dispatch(setProductsList(filteredData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (documentId) => {
    dispatch(
      setProductsList(
        productsList.filter((item) => item.documentId !== documentId)
      )
    );
    try {
      // console.log(db);
      const productDoc = doc(db, "products", documentId);
      await deleteDoc(productDoc);
      // getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab className="tab" label="all" value="all" />
          <Tab className="tab" label="hoodies" value="Hoodies" />
          <Tab className="tab" label="t-shirts" value="T-Shirts" />
          <Tab className="tab" label="suits" value="Suits" />
          <Tab className="tab" label="shoes" value="Shoes" />
          <Tab className="tab" label="jeans" value="Jeans" />
          <Tab className="tab" label="jackets" value="Jackets" />
          <Tab className="tab" label="bags" value="Bags" />
        </Tabs>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {filteredProducts.map((item) => (
          <Card key={item.id} sx={{ maxWidth: 345 }}>
            <Link style={{ textDecoration: "none" }} to={`/main/${item.id}`}>
              <CardMedia
                sx={{ height: 300 }}
                image={item.img}
                title={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.text}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  {item.price} USD
                </Typography>
              </CardContent>
            </Link>
            <CardActions>
              {isAdmin ? (
                <>
                  <Button
                    onClick={() => deleteProduct(item.documentId)}
                    size="small"
                  >
                    Delete
                  </Button>
                  <Button onClick={handleOpenModal} size="small">
                    Add
                  </Button>
                </>
              ) : null}
            </CardActions>
          </Card>
        ))}
        {showModal ? (
          <AddProductModal
            open={handleOpenModal}
            close={handleCloseModal}
            getProducts={getProducts}
          />
        ) : null}
      </Box>
    </Container>
  );
};

export default Main;
