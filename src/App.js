import React, { useState } from "react";
import { Input } from "./components/Input/Input";
import { Button } from "./components/Button/Button";
import { ResultsList } from "./components/ResultsList/ResultsList";
import "./App.css";

const API_URL = "http://localhost:8010/proxy/suburbs.json?q=";

// const API_SAMPLE = [
//   { name: "Sydney South", state: { abbreviation: "NSW" } },
//   { name: "Sydney", state: { abbreviation: "NSW" } },
//   { name: "Sydney International Airport", state: { abbreviation: "NSW" } },
//   { name: "Sydney Domestic Airport", state: { abbreviation: "NSW" } },
//   { name: "Sydenham", state: { abbreviation: "VIC" } },
// ];

export default function App() {
  const [suburb, setSuburb] = useState("");
  const [items, setItems] = useState([]);
  const [hidden, setHidden] = useState(true);

  const handleChange = (value) => {
    fetch(`${API_URL}${value}`)
      .then((res) => res.json())
      .then((res) => {
        setItems(res.filter((r) => new RegExp(`^${value}`, "i").test(r.name)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    alert(suburb);
  };

  const handleSelect = (item) => {
    setSuburb(`${item.name}, ${item.state.abbreviation}`);
    setHidden(true);
  };

  const handleFocus = () => {
    setHidden(false);
  };

  return (
    <section>
      <div className="container">
        <div className="grid-left">
          <label data-testid="label">Suburb</label>
        </div>
        <div className="grid-right">
          <div className="search-input">
            <Input
              value={suburb}
              onChange={handleChange}
              onFocus={handleFocus}
              data-testid="input"
            />
            <Button onClick={handleClick} data-testid="button" />
          </div>
          <div>
            {!hidden && (
              <ResultsList
                items={items}
                onSelect={handleSelect}
                data_testid="auto_suggestion"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
