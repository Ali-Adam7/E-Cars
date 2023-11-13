import Categories from "./components/Categories";
import All from "./components/All";
import Front from "./components/Front";

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
