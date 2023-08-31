import { useEffect, useState } from "react";
import logo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData([]);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    const target = e.target as typeof e.target & {
      key: { value: string };
      value: { value: string };
    };
    const key = target.key.value;
    const value = target.value.value;

    const _data = await axios.post(
      `${import.meta.env.VITE_REST_API_ROOT_URL}data`,
      { key: key, value: value }
    );
    console.log(_data);
    alert(`A name was submitted: {${key} : ${value}}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="150px" />
        <p>Hello Vite + React!</p>
        <p>{data.length != 0 && data.map((d) => `${d[0]}: ${d[1]},`)}</p>
        <p>
          <button
            type="button"
            onClick={async () => {
              console.log("clicked");
              const _data = await axios.get(
                `${import.meta.env.VITE_REST_API_ROOT_URL}data`
              );
              console.log(_data.data);
              setData(_data.data.res);
            }}
          >
            Get Data from DB
          </button>
        </p>
        <form onSubmit={handleSubmit}>
          <label>
            Key:
            <input type="text" name="key" />
          </label>
          <label>
            Value:
            <input type="text" name="value" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
