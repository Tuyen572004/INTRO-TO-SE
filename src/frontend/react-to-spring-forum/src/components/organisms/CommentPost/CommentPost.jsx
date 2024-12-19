import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { PostAPI} from "../../../api/PostAPI";
import CommentItem from "../../molecules/CommentItem/CommentItem";
import {CommentAPI} from "../../../api/CommentAPI";
import {useDispatch, useSelector} from "react-redux";
import {setComments} from "../../../store/commentSlice";
import PostItem from "../../molecules/PostItem/PostItem";
import NewComment from "../../molecules/NewComment/NewComment";
import GoBack from "../../atoms/GoBack/GoBack";
import {jwtDecode} from "jwt-decode";


import s from './style.module.css';
import Loading from "../../atoms/Loading/Loading";

const CommentPost = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const comments = useSelector(state => state.commentSlice.comments);
    const dispatch = useDispatch();

    const fetchPost = async () => {
        try {
            const response = await PostAPI.get(id);
            setPost(response.data);
        } catch (error) {
            if (error.response?.data?.code === 4005) {
                navigate('*');
            } else {
                console.log(error);
            }
        }
    };

    const fetchComments = async () => {
        try {
            const response = await CommentAPI.getAllCommentByPostId(id);

            const auth = jwtDecode(localStorage.getItem('accessToken').toString());
            const myId = auth.user.userId;
            const sortedComments = response.data.sort((a, b) => {

                const isAUser = a.user.id === myId ? 1 : 0;
                const isBUser = b.user.id=== myId ? 1 : 0;

                if (isAUser !== isBUser) {
                    return isBUser - isAUser;
                }

                return new Date(b.createdDate) - new Date(a.createdDate);
            });

            dispatch(setComments(sortedComments));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Promise.all([fetchPost(), fetchComments()]).then(() => {setLoading(false)});
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className={s.container}>
                <GoBack />
                <PostItem post={post}/>

                <div className={s.commentTitle}>
                    Comment
                </div>

                <NewComment postId={id}/>

                <div className={s.comments}>
                    {comments?.map((comment) => (
                        <div key={comment.id}>
                            <CommentItem comment={comment} postId={id}/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CommentPost;