import "./App.css";
import ShopCard from "./component/ShopCard";

function App() {
  return (
    <>
      <ShopCard
        img={
          "https://images.pexels.com/photos/12922525/pexels-photo-12922525.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        }
        dress_Name={"T-shirt"}
        color={"Green"}
        size={"small"}
      />
    </>
  );
}

export default App;
