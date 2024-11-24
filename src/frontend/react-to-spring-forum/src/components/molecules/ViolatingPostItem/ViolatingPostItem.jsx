import React from 'react';
import { Dropdown } from "react-bootstrap";
import CustomToggle from "../../atoms/CustomToggle/CustomToggle";
import { Heart, MessageCircle, Send } from "lucide-react";
import s from './style.module.css';

function ViolatingPostItem({post, onClick}) {
    if (!post?.user) return null;

    return (
        <div className={s.violatingPostItem} onClick={() => onClick(post)}>
            <div className={s.postContainer}>
                <div className={s.avatarContainer}>
                    <img src={post.user.avatar} alt={post.user.name} className={s.avatar}/>
                </div>

                <div className={s.contentWrapper}>
                    <div className={s.header}>
                        <div className={s.userInfo}>
                            <span className={s.name}>{post.user.name}</span>
                            <span className={s.username}>@{post.user.username}</span>
                        </div>

                        <Dropdown className={s.dropdown}>
                            <Dropdown.Toggle as={CustomToggle} />
                            <Dropdown.Menu>
                                <Dropdown.Item> Warning </Dropdown.Item>
                                <Dropdown.Item> Delete </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className={s.title}>{post.title}</div>

                    <div className={s.engagementMetrics}>
                        <div className={s.metricItem}>
                            <Heart className={s.metricIcon} size={20} />
                            <span className={s.metricCount}>{post.reactions.totalReact}</span>
                        </div>
                        <div className={s.metricItem}>
                            <MessageCircle className={s.metricIcon} size={20} />
                            <span className={s.metricCount}>{post.reactions.totalComment}</span>
                        </div>
                        <div className={s.metricItem}>
                            <Send className={s.metricIcon} size={20}/>
                            <span className={s.metricCount}>{post.reactions.totalShare}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViolatingPostItem;