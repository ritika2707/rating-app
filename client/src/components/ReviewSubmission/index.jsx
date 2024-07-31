import { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const ReviewSubmission = ({ audiobookId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/audiobooks/${audiobookId}/reviews`, { rating, review });
            onReviewSubmitted(response.data);
            setRating(0);
            setReview('');
        } catch (err) {
            setError('Failed to submit review');
        }
    };

    return (
        <div className={styles.reviewForm}>
            <form onSubmit={handleSubmit} class={styles.form}>
                <h3>Submit Your Review</h3>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.rating}>
                    <div className={styles.stars}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <span
                                key={star}
                                className={styles.star}
                                onClick={() => setRating(star)}
                                style={{ color: star <= rating ? '#f39c12' : '#ccc' }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <div className={styles.review}>
                    <textarea
                        id="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        rows="4"
                        placeholder="Write your review here..."
                    />
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ReviewSubmission;