import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Box, Typography, Button, Table } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setCartItems } from "../slices/cartSlice";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backToMain = () => {
    navigate("/main");
  };

  const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  const removeFromCart = (itemId) => {
    // Получение текущего массива cartItems из localStorage
    // const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));

    // Фильтрация элементов по id для удаления
    const updatedCartItems = savedCartItems.filter(
      (item) => item.id !== itemId
    );

    // Сохранение обновленного массива cartItems в localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    // Обновление состояния корзины в Redux, если требуется
    dispatch(setCartItems(updatedCartItems));
  };

  const totalAmount = savedCartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.price} USD</TableCell>
                <TableCell align="right">{item.color}</TableCell>
                <TableCell align="right">{item.size}</TableCell>
                <Button onClick={() => removeFromCart(item.id)}>Delete</Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", gap: "40px", paddingTop: "40px" }}>
        <Typography variant="h5" sx={{ color: "blue" }}>
          Total Amount
        </Typography>
        <Typography variant="h5" sx={{ color: "blue" }}>
          {totalAmount} USD
        </Typography>
        <Button variant="contained">CHECKOUT</Button>
      </Box>
    </Container>
  );
};

export default Cart;
