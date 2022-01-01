import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins
    .filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "dec") {
        if (sortBy === "name") {
          return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        }
        return b[sortBy] - a[sortBy];
      }

      if (sortBy === "name") {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      }
      return a[sortBy] - b[sortBy];
    });

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} value={search}></input>

        <select
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
          className="sort-by"
        >
          <option value="name">Name</option>
          <option value="market_cap">Market Cap</option>
          <option value="current_price">Current price</option>
          <option value="price_change_percentage_24h">24hr%</option>
          <option value="total_volume">Total volume</option>
        </select>
        <button
          className="sort"
          onClick={() => {
            setSortOrder("dec");
            if (sortOrder === "dec") {
              setSortOrder("asc");
            }
          }}
        >
          Sort - {sortOrder}
        </button>
      </div>
      <div className="coin-container">
        <div className="coin-row1">
          <div className="coin-title1 coin-title">Name</div>
          <div className="coin-title2 coin-title">Symbol</div>
          <div className="coin-title3 coin-title">Current price</div>
          <div className="coin-title4 coin-title">Total volume</div>
          <div className="coin-title5 coin-title">24hr%</div>
          <div className="coin-title6 coin-title">Market cap</div>
        </div>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
    </div>
  );
}

export default App;
