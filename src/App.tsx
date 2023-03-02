import { useState } from "react";
import CardList from "./components/CardList";
function App() {
  return (
    <div className="App  mx-auto my-32 max-w-screen-2xl justify-center">
      <h1 className="text-center text-4xl ">Matching cards!</h1>
      <CardList />
    </div>
  );
}

export default App;
