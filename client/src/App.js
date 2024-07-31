import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./components/Table";
import Sort from "./components/Sort";
import Genre from "./components/Genre";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import AudiobookDetail from "./components/AudiobookDetail";
import "./App.css";

const base_url = process.env.REACT_APP_API_URL;

function App() {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  const [filterGenre, setFilterGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllAudiobooks = async () => {
      try {
        const url = `${base_url}?page=${page}&sort=${sort.sort},${sort.order
          }&genre=${filterGenre.toString()}&search=${search}`;
        const { data } = await axios.get(url);
        setObj(data);
      } catch (err) {
        console.error("Failed to fetch audiobooks:", err);
      }
    };

    getAllAudiobooks();
  }, [sort, filterGenre, page, search]);

  return (
    <Router>
      <div className="wrapper">
        <div className="container">
          <div className="head">
            <button className="login_button">Login</button>
          </div>
          <div className="body">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div className="table_container">
                      <Table audiobooks={obj.audiobooks ? obj.audiobooks : []} />
                      <Pagination
                        page={page}
                        limit={obj.limit || 0}
                        total={obj.total || 0}
                        setPage={setPage}
                      />
                    </div>
                    <div className="filter_container">
                      <Search setSearch={setSearch} />
                      <Sort sort={sort} setSort={setSort} />
                      <Genre
                        filterGenre={filterGenre}
                        genres={obj.genres || []}
                        setFilterGenre={setFilterGenre}
                      />
                    </div>
                  </>
                }
              />
              <Route path="/audiobook/:id" element={<AudiobookDetail />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

