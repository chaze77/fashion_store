import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../slices/cartSlice";
import { setError } from "../slices/authSlice";

const Details = () => {
  const params = useParams();
  const { productsList } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  const { error, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  console.log(params);
  const navigate = useNavigate();

  const cardToShow = params.id
    ? productsList.find((product) => product.id === params.id)
    : null;
  console.log(cardToShow);

  // const initialColor = cardToShow?.color[0];
  // const initialSize = cardToShow?.size[0];
  // Определите начальное значение выбранного цвета
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    dispatch(setError(null)); // Сброс ошибки
  };

  const isChoosen = selectedColor === "" && selectedSize === "";

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    dispatch(setError(null)); // Сброс ошибки
  };

  const addToCart = () => {
    if (!isChoosen) {
      const newItem = {
        id: cardToShow.id,
        name: cardToShow.name,
        price: cardToShow.price,
        size: selectedSize || null,
        color: selectedColor || null,
        userId: user?.uid || null,
      };

      console.log(newItem);

      const updatedCartItems = [...cartItems, newItem];
      dispatch(setCartItems(updatedCartItems));

      // Сохранение в localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      navigate("/main/cart");
    } else {
      dispatch(setError("please choose color and size"));
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        border: "1px solid red",
        gap: "40px",
        paddingTop: "40px",
      }}
    >
      <Card sx={{ maxWidth: 450 }}>
        <CardMedia
          sx={{ height: 350, width: 350 }}
          image={cardToShow?.img}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cardToShow?.name}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {cardToShow?.price} USD
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "40px",
            marginBottom: error ? "20px" : "240px",
          }}
        >
          <Box>
            <p>Choose color</p>
            <Select
              sx={{ width: 100 }}
              value={selectedColor}
              onChange={handleColorChange}
            >
              {cardToShow &&
                cardToShow.color?.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
            </Select>
          </Box>

          <Box>
            <p>Choose size</p>
            <Select
              sx={{ width: 100 }}
              value={selectedSize}
              onChange={handleSizeChange}
            >
              {cardToShow &&
                cardToShow.size?.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
            </Select>
          </Box>
        </Box>
        {error && (
          <p style={{ marginBottom: "200px" }} className="error-text">
            {error}
          </p>
        )}
        <Button variant="contained" onClick={addToCart} size="small">
          Add to Cart
        </Button>
      </Box>
    </Container>
  );
};

export default Details;
