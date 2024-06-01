import searchIcon from "../components/icons/search.svg";
import { Link, useLocation } from "react-router-dom";

const NavBar = ({ search, searchMovie, setSearch }) => {
  const location = useLocation();

  return (
    <header>
      <div className="navigation">
        <Link className="brand" to="/home">
          MyMovies
        </Link>
        <Link className="my-favorite" to="/my-favorite">
          My Favorite
        </Link>
      </div>

      {location.pathname != "/my-favorite" && (
        <div className="search">
          <input
            placeholder="Search for movie"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <img
            src={searchIcon}
            alt="search icon"
            onClick={() => {
              searchMovie(search);
              setSearch("");
            }}
          />
        </div>
      )}
    </header>
  );
};

export default NavBar;
