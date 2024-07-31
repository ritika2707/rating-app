import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';
import ReviewSubmission from '../ReviewSubmission';

const base_url = process.env.REACT_APP_API_URL;

const AudiobookDetail = () => {
    const { id } = useParams();
    const [detailData, setDetailData] = useState(null);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const getDetailData = async () => {
            try {
                const url = `${base_url}/${id}`;
                const { data } = await axios.get(url);
                setDetailData(data.audiobook);
                if (data.reviews.length) {
                    const totalRatings = data.reviews.reduce((acc, review) => acc + review.rating, 0);
                    setAverageRating(totalRatings / data.reviews.length);
                }
            } catch (err) {
                console.error("Failed to fetch audiobook details:", err);
            }
        };

        getDetailData();
    }, [id]);

    const handleReviewSubmitted = (reviewData) => {
        setDetailData(prevData => {
            const updatedReviews = [...prevData.reviews, reviewData];
            const totalRatings = updatedReviews.reduce((acc, review) => acc + review.rating, 0);
            setAverageRating(totalRatings / updatedReviews.length);
            return {
                ...prevData,
                reviews: updatedReviews,
            };
        });
    };

    if (!detailData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.detailPage}>
            <div className={styles.audiobookDetail}>
                <img src={detailData.img} alt={detailData.title} className={styles.audiobookImg} />
                <div>
                    <h1>{detailData.title}</h1>
                    <h2>{detailData.author}</h2>
                    <p>{detailData.description}</p>
                    <div className={styles.audiobookGenres}>
                        {detailData.genre.map((genre, index) => (
                            <span key={genre} className={styles.audiobookGenre}>{genre}</span>
                        ))}
                    </div>
                    <div className={styles.audiobookRating}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <span key={star} className={styles.star}>
                                {star <= averageRating ? '★' : '☆'}
                            </span>
                        ))}
                        <span>{averageRating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
            <ReviewSubmission audiobookId={id} onReviewSubmitted={handleReviewSubmitted} />
        </div>
    );
};

export default AudiobookDetail;
