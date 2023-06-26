import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routing from "./Router/Routing";
import Upload from "./components/Upload";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Upload /> */}
        <Routing />
      </BrowserRouter>
    </div>
  );
}

export default App;
