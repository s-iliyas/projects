import { useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const coins = async () => {
    await axios
      .get("http://35.85.156.10:8000/?currency=inr")
      .then((data) => console.log(data))
      .catch((err) => console.log(err.message));
    return;
  };

  useEffect(() => {
    coins();
  }, []);

  return (
    <div>
      <p> Hi</p>
    </div>
  );
}

export default App;
