import All from "./components/CarPictures";
import Footer from "./components/Footer";
import Front from "./components/Landing";

export default async function Main() {
  // initilize cart
  return (
    <div>
      <div className="bg-white">
        <header className="relative bg-white"></header>
      </div>
      <Front />
      <All />
    </div>
  );
}
