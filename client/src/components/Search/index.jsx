import styles from "./styles.module.css";

const Search = ({ setSearch }) => {
    return (
        <div className={styles.container}>
            <input
                type="text"
                className={styles.search}
                placeholder="Search"
                onChange={({ currentTarget: input }) => setSearch(input.value)}
            />
        </div>
    );
};

export default Search;