import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { PostAPI} from "../../../api/PostAPI";
import CommentItem from "../../molecules/CommentItem/CommentItem";
import {CommentAPI} from "../../../api/CommentAPI";
import {useDispatch, useSelector} from "react-redux";
import {setComments} from "../../../store/commentSlice";

import s from './style.module.css';
import PostItem from "../../molecules/PostItem/PostItem";
import NewComment from "../../molecules/NewComment/NewComment";
import GoBack from "../../atoms/GoBack/GoBack";

const CommentPost = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const comments = useSelector(state => state.commentSlice.comments);
    const dispatch = useDispatch();

    useEffect(() => {
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

                const sortedComments = response.data.sort((a, b) => {
                    // if (a.userId === auth.userId && b.userId !== auth.userId) {
                    //     return -1;
                    // }
                    // if (a.userId !== auth.userId && b.userId === auth.userId) {
                    //     return 1;
                    // }
                    return new Date(b.createdDate) - new Date(a.createdDate);
                });

                dispatch(setComments(sortedComments));
            } catch (error) {
                console.log(error);
            }
        }

        Promise.all([fetchPost(), fetchComments()]).then(() => {setLoading(false)});
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
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