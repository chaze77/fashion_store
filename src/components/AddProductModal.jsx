import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px",
};

export default function AddProductModal({ open, close, getProducts }) {
  const [productItem, setProductItem] = useState({
    id: "",
    name: "",
    type: "",
    color: [],
    size: [],
    img: "", // Исправлено: было "text"
    gender: "",
    price: 0,
  });

  const handleProductChange = (fieldName, value) => {
    const updatedProductItem = {
      ...productItem,
      [fieldName]: value,
    };

    setProductItem(updatedProductItem);
  };

  const onSubmitProduct = async () => {
    try {
      await addDoc(collection(db, "products"), productItem);
    } catch (error) {
      console.log(error);
    }
    getProducts();
    close();
  };

  console.log(productItem);
  return (
    <div>
      <Button onClick={open}>Open modal</Button>
      <Modal
        keepMounted
        open={open}
        onClose={close}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <TextField
              label="id"
              type="text"
              name="id"
              value={productItem.id}
              onChange={(e) => handleProductChange("id", e.target.value)}
            />
            <TextField
              label="name"
              type="text"
              name="name"
              value={productItem.name}
              onChange={(e) => handleProductChange("name", e.target.value)}
            />
            <FormControl>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender-select"
                name="gender"
                value={productItem.gender}
                onChange={(e) => handleProductChange("gender", e.target.value)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="gender-label">Type</InputLabel>
              <Select
                labelId="type-label"
                id="type-select"
                name="type"
                value={productItem.type}
                onChange={(e) => handleProductChange("type", e.target.value)}
              >
                <MenuItem value="Hoodies">hoodies</MenuItem>
                <MenuItem value="T-Shirts">t-shirts</MenuItem>
                <MenuItem value="Suits">suits</MenuItem>
                <MenuItem value="Jeans">jeans</MenuItem>
                <MenuItem value="Shoes">shoes</MenuItem>
                <MenuItem value="Jackets">jackets</MenuItem>
                <MenuItem value="Bags">bags</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="price"
              type="number"
              name="price"
              value={productItem.price}
              onChange={(e) => handleProductChange("price", e.target.value)}
            />
            <TextField
              label="text"
              type="text"
              name="text"
              value={productItem.text}
              onChange={(e) => handleProductChange("text", e.target.value)}
            />
            <TextField
              label="images"
              type="file"
              name="images"
              value={productItem.images}
              onChange={(e) => handleProductChange("images", e.target.value)}
            />

            <Box sx={{ display: "flex", gap: "3px" }}>
              <TextField
                label="color"
                name="color"
                value={productItem.color[0]}
                onChange={(e) => {
                  const updatedColor = [...productItem.color];
                  updatedColor[0] = e.target.value;
                  setProductItem((prevItem) => ({
                    ...prevItem,
                    color: updatedColor,
                  }));
                }}
              />
              <TextField
                label="color"
                name="color"
                value={productItem.color[1]}
                onChange={(e) => {
                  const updatedColor = [...productItem.color];
                  updatedColor[1] = e.target.value;
                  setProductItem((prevItem) => ({
                    ...prevItem,
                    color: updatedColor,
                  }));
                }}
              />
              <TextField
                label="color"
                name="color"
                value={productItem.color[2]}
                onChange={(e) => {
                  const updatedColor = [...productItem.color];
                  updatedColor[2] = e.target.value;
                  setProductItem((prevItem) => ({
                    ...prevItem,
                    color: updatedColor,
                  }));
                }}
              />
            </Box>

            <Box sx={{ display: "flex", gap: "3px" }}>
              <TextField
                label="size"
                name="size"
                value={productItem.size[0]}
                onChange={(e) => {
                  const updatedSize = [...productItem.size];
                  updatedSize[0] = e.target.value;
                  setProductItem((prevItem) => ({
                    ...prevItem,
                    size: updatedSize,
                  }));
                }}
              />
              <TextField
                label="size"
                name="size"
                value={productItem.size[1]}
                onChange={(e) => {
                  const updatedSize = [...productItem.size];
                  updatedSize[1] = e.target.value;
                  setProductItem((prevItem) => ({
                    ...prevItem,
                    size: updatedSize,
                  }));
                }}
              />
              <TextField
                label="size"
                name="size"
                value={productItem.size[2]}
                onChange={(e) => {
                  const updatedSize = [...productItem.size];
                  updatedSize[2] = e.target.value;
                  setProductItem((prevItem) => ({
                    ...prevItem,
                    size: updatedSize,
                  }));
                }}
              />
            </Box>

            <Box>
              <Button>Back</Button>
              <Button type="submit" onClick={onSubmitProduct}>
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
