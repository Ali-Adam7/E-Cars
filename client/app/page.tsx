import Categories from "./components/Categories";
import All from "./components/CarPictures";
import Front from "./components/Landing";

export default async function Main() {
  // initilize cart
  return (
    <div>
      <div className="bg-white">
        {/* Mobile menu */}

        <header className="relative bg-white"></header>
      </div>
      <Front />
      <Categories />
      <All />
    </div>
  );
}
