import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { PostAPI} from "../../../api/PostAPI";
import PostItem from "../../molecules/PostItem/PostItem";
import CommentItem from "../../molecules/CommentItem/CommentItem";
import {CommentAPI} from "../../../api/CommentAPI";

import s from './style.module.css';
import {useDispatch, useSelector} from "react-redux";
import {addComment, setComments} from "../../../store/CommentSlice";
import useAuth from "../../../hooks/useAuth";

const CommentPost = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    const { id } = useParams();
    const [post, setPost] = useState(null);

    const comments = useSelector(state => state.commentSlice.comments);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await PostAPI.get(id);
                console.log('Post:', response.data);
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
                console.log('Comments:', response.data);

                const sortedComments = response.data.sort((a, b) => {
                    if (a.userId === auth.userId && b.userId !== auth.userId) {
                        return -1;
                    }
                    if (a.userId !== auth.userId && b.userId === auth.userId) {
                        return 1;
                    }
                    return new Date(b.createdDate) - new Date(a.createdDate);
                });

                dispatch(setComments(sortedComments));
            } catch (error) {
                console.log(error);
            }
        }

        fetchPost();
        fetchComments();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className={s.container}>
            <PostItem post={post}/>
            <div className={s.commentTitle}>
                Comment
            </div>

            <hr className={"m-0"}/>

            <div className={s.comments}>
                {comments?.map((comment) => (
                    <div key={comment.id}>
                        <CommentItem comment={comment}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentPost;