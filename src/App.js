import axios from "axios";
import { useState } from "react";
import "./key";
import "./App.css";
import RecipeTile from "./components/recipe-tile";
import * as fcl from "@onflow/fcl";

 function App() {
  const [query, setquery] = useState("");
  console.log(query);
  const [recipes, setrecipes] = useState([]);
  const [healthLabel,sethealthLabel] =useState("vegan");

  const YOUR_APP_ID = `99635002`;
  const YOUR_APP_KEY = "dff288994895dce09d1ed65e772158d3";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&&health=${healthLabel}`;

  const getRecipeInfo = async () => {
    var result = await axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data.hits);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
  };

  return (
    <div className="app">
      <h1 onClick={getRecipeInfo}>Food Recipe Plaza 🍔</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          className="app__input"
          type="text"
          placeholder="enter ingridient"
          autoComplete="Off"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />

        <select className="app_healthLabels">
          <option   onClick={()=>sethealthLabel("vegan")}>Vegan</option>

          <option   onClick={()=>sethealthLabel("vegetarian")}>vegetarian</option>

          <option  onClick={()=>sethealthLabel("paleo")}>paleo</option>

          <option   onClick={()=>sethealthLabel("dairy-free")}>dairy-free</option>

          <option   onClick={()=>sethealthLabel("egg-free")}>egg-free</option>

          <option   onClick={()=>sethealthLabel("peanut-free")}>peanut-free</option>
        </select>
      </form>

      <div className="app__recipes">
        {!recipes == [] &&
          recipes.map((recipe) => {
            return <RecipeTile recipe={recipe} />;
          })}
      </div>
    </div>
  );
}

export default App;