import React from 'react';
import { useLocation } from 'react-router-dom'
import ReviewList from '@/components/review/ReviewList';


const ReviewListView = () => {
    const location = useLocation()
    const { post } = location.state
    
    return (
        <div>
            <ReviewList post={post} />
        </div>
    );
};

export default ReviewListView;