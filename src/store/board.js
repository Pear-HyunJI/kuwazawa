import { createSlice } from '@reduxjs/toolkit';
import { kuwazawa_noticeDB, kuwazawa_reviewDB } from '@/assets/firebase';

const boardSlice = createSlice({
    name: 'boards',
    initialState: {
        notice: [],
        list: []
    },
    reducers: {
        initNotice(state, action) {
            state.notice = action.payload.sort((a, b) => a.key > b.key ? -1 : 1);
            state.list = state.notice;
        },
        initReview(state, action) {
            state.review = action.payload.sort((a, b) => a.key > b.key ? -1 : 1);
            state.list = state.notice;
        },
        setList(state, action) {
            state.list = action.payload;
        },

    }
});

export const { initReview,initNotice, setList } = boardSlice.actions;

export const fetchNotice = () => async dispatch => {
    try {
        kuwazawa_noticeDB.on('value', snapshot => {
            const noticeObj = snapshot.val();
            const noticeArr = Object.entries(noticeObj).map(([key, value]) => {
                return { key: key, ...value };
            });
            dispatch(initNotice(noticeArr));
            dispatch(setList(noticeArr)); // setList 액션을 dispatch하여 list 상태를 초기화
        });
    } catch (error) {
        console.error('Error fetching notice:', error);
    }
};

export const fetchReview = () => async dispatch => {
    try {
        kuwazawa_reviewDB.on('value', snapshot => {
            const reviewObj = snapshot.val();
            const reviewArr = Object.entries(reviewObj).map(([key, value]) => {
                return { key: key, ...value };
            });
            dispatch(initReview(reviewArr));
            dispatch(setList(reviewArr)); // setList 액션을 dispatch하여 list 상태를 초기화
        });
    } catch (error) {
        console.error('Error fetching notice:', error);
    }
};

export default boardSlice.reducer;