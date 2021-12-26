import axios from 'axios'
import {useState, useEffect   } from "react";
import './App.css';
import Coin from './Coin';





function App() {

const [coins, setCoins] = useState([])
const [search, setSearch] = useState('')
const [sort, setSort] = useState('asc')
useEffect(() => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  )
  .then(res => {
    setCoins(res.data)
    console.log(res. data)
  })
  .catch(error => console.log(error))

}, [])

const handleChange = e => {
  setSearch(e.target.value)
}

const filteredCoins = coins.filter(coin =>
  coin.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a,b) => {
    if (sort == 'dec') {
      return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    }
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  })

  return (
    <div className="coin-app">
    <div className='coin-search'>
    <h1 className='coin-text'>Search a currency</h1>
      <input type="text" placeholder='Search' className='coin-input' onChange={handleChange}></input>
      <button className='sort' onClick={() => {
        setSort('dec')
        if(sort == 'dec'){
          setSort('asc')
        }
      }}>Sort - {sort}</button>
    </div>
    {filteredCoins.map(coin => {
      return (
        <Coin key={coin.id} 
        name={coin.name} 
        image={coin.image} 
        symbol={coin.symbol}
        marketcap={coin.market_cap}
        price={coin.current_price}
        priceChange={coin.price_change_percentage_24h}
        volume={coin.total_volume}
        />
      )
    })}
    </div>
  );
}

export default App;
