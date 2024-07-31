import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Table = ({ audiobooks }) => {
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <p className={styles.title_tab}>Title</p>
                <p className={styles.genre_tab}>Genre</p>
                <p className={styles.rating_tab}>Rating</p>
            </div>

            {audiobooks.map((audiobook) => (
                <div className={styles.audiobook} key={audiobook._id}>
                    <div className={styles.title_container}>
                        <Link to={`/audiobook/${audiobook._id}`} className={styles.title_link}>
                            <img src={audiobook.img} alt="audiobook" className={styles.audiobook_img} />
                        </Link>
                        <p className={styles.audiobook_title}>
                            {audiobook.title} ({audiobook.year})
                        </p>
                    </div>
                    <div className={styles.genre_container}>
                        {audiobook.genre.map((genre, index) => (
                            <p key={genre} className={styles.audiobook_genre}>
                                {genre}
                                {index !== audiobook.genre.length - 1 && "/"}
                            </p>
                        ))}
                    </div>
                    <div className={styles.rating_container}>
                        <img
                            src="/images/star.png"
                            alt="star"
                            className={styles.star_img}
                        />
                        <p className={styles.audiobook_rating}>{audiobook.rating}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Table;
