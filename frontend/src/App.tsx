import {Route, Routes} from "react-router-dom";
import { Container } from "react-bootstrap";
import {Home} from "./pages/Home";
import {Store} from "./pages/Store";
import { Order } from "./pages/Order";
import { MyNav } from "./components/MyNav";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import "./App.css";

export function App() {
  
  return (
    <ShoppingCartProvider>
      <MyNav />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={ <Store />} />
          <Route path="/order" element={ <Order />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}


