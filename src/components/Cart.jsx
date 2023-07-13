import React, { useEffect } from "react";
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
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const productsCollectionRef = collection(db, "cart");

  const getCartItem = async () => {
    try {
      if (user) {
        const data = await getDocs(query(productsCollectionRef));
        console.log(data);

        const filteredData = data.docs
          .map((doc) => ({
            documentId: doc.id,
            ...doc.data(),
          }))
          .filter((item) => item.userId === user.uid);

        dispatch(setCartItems(filteredData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getCartItem();
    }
  }, [user]);

  const deleteProductFromCart = async (documentId) => {
    dispatch(
      setCartItems(cartItems.filter((item) => item.documentId !== documentId))
    );
    try {
      // console.log(db);
      const productDoc = doc(db, "cart", documentId);
      await deleteDoc(productDoc);
      // getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const totalAmount =
    cartItems.length > 0
      ? cartItems.reduce((acc, item) => acc + item.price, 0)
      : 0;

  console.log(cartItems);

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
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
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
                  <TableCell align="right">
                    <Button
                      onClick={() => deleteProductFromCart(item.documentId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <></>
            )}
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
