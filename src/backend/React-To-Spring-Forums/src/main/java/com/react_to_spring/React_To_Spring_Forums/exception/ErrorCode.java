package com.react_to_spring.React_To_Spring_Forums.exception;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public enum ErrorCode {
//    Internal Server Error Undefined	9999
    UNCATEGORIZED_EXCEPTION(9999, HttpStatus.INTERNAL_SERVER_ERROR, "Uncategorized Error"),
//    Internal Server Error	Developer error 1xxx
    INVALID_KEY(1001, HttpStatus.INTERNAL_SERVER_ERROR, "Invalid Key"),
    CANNOT_SEND_EMAIL(1002, HttpStatus.INTERNAL_SERVER_ERROR, "Cannot send email"),
    CANNOT_UPLOAD_IMAGE(1003, HttpStatus.INTERNAL_SERVER_ERROR, "Cannot upload image"),
//    Bad Request Client Input Error 2xxx
    INVALID_USERNAME(2001, HttpStatus.BAD_REQUEST, "Username should be at least {} characters"),
    INVALID_PASSWORD(2002, HttpStatus.BAD_REQUEST, "Password should be at least {} characters, " +
            "contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
    REQUIRED_EMAIL(2003, HttpStatus.BAD_REQUEST, "Email is required"),
    SAME_PASSWORD(2004, HttpStatus.BAD_REQUEST, "New password must be different from the old password"),
    REACT_ALREADY_EXISTS(2005, HttpStatus.BAD_REQUEST , "The user already has a react on the post" ),
    REQUIRED_POST_ID(2006, HttpStatus.BAD_REQUEST, "Post ID is required"),
    REQUIRED_USER_ID(2007, HttpStatus.BAD_REQUEST, "User ID is required"),
    REQUIRED_REACT_ID(2008, HttpStatus.BAD_REQUEST, "React ID is required"),
    REQUIRED_REACT_NAME(2009, HttpStatus.BAD_REQUEST, "React name is required"),
    REQUIRED_COMMENT_ID(2010, HttpStatus.BAD_REQUEST, "Comment ID is required"),
    CONTENT_IS_EMPTY(2011, HttpStatus.BAD_REQUEST, "Content is empty"),
    TITLE_IS_EMPTY(2012, HttpStatus.BAD_REQUEST, "Title is empty"),
    USER_NOT_POST_OWNER(2013, HttpStatus.BAD_REQUEST, "Cannot edit/delete other people's posts"),
    USER_NOT_COMMENT_OWNER(2014, HttpStatus.BAD_REQUEST, "Cannot edit/delete other people's comments"),
    USER_NOT_REACT_OWNER(2015, HttpStatus.BAD_REQUEST, "Cannot edit/delete other people's reacts"),
    FIRST_NAME_IS_EMPTY(2016, HttpStatus.BAD_REQUEST, "First name is empty"),
    LAST_NAME_IS_EMPTY(2017, HttpStatus.BAD_REQUEST, "Last name is empty"),
    CANNOT_ADD_YOURSELF_AS_FRIEND(2018, HttpStatus.BAD_REQUEST, "Cannot add yourself as friend"),
    ALREADY_FRIEND(2019, HttpStatus.BAD_REQUEST, "Already friend"),
    ALREADY_SENT_ADD_FRIEND_REQUEST(2020, HttpStatus.BAD_REQUEST, "Already sent add friend request"),
    ADD_FRIEND_REQUEST_NOT_FOUND(2021, HttpStatus.BAD_REQUEST, "Add friend request not found"),
    ALREADY_SENT_REPORT(2022, HttpStatus.BAD_REQUEST, "Already sent report"),
    ALREADY_RECEIVED_ADD_FRIEND_REQUEST(2023, HttpStatus.BAD_REQUEST, "Already received add friend request"),
    THIS_POST_HAS_NOT_BEEN_REPORTED(2024, HttpStatus.BAD_REQUEST, "This post has not been reported"),

    //    Existed Error 3xxx
    USER_EXISTED(3001, HttpStatus.BAD_REQUEST, "User existed"),
    USER_PROFILE_EXISTED(3002, HttpStatus.BAD_REQUEST, "User profile existed"),
    EMAIL_EXISTED(3003, HttpStatus.BAD_REQUEST, "Email existed"),
    ROLE_EXISTED(3004, HttpStatus.BAD_REQUEST, "Role existed"),
    PERMISSION_EXISTED(3005, HttpStatus.BAD_REQUEST, "Permission existed"),
//    Not Found Error 4xxx
    USER_NOT_FOUND(4001, HttpStatus.NOT_FOUND, "User not found"),
    ROLE_NOT_FOUND(4002, HttpStatus.NOT_FOUND, "Role not found"),
    USER_PROFILE_NOT_FOUND(4003, HttpStatus.NOT_FOUND, "User profile not found"),
    PERMISSION_NOT_FOUND(4004, HttpStatus.NOT_FOUND, "Permission not found"),
    POST_NOT_FOUND(4005, HttpStatus.NOT_FOUND, "Post not found"),
    REACT_NOT_FOUND(4006, HttpStatus.NOT_FOUND, "React not found"),
    VERIFY_CODE_NOT_FOUND(4007, HttpStatus.NOT_FOUND, "Verify code not found"),
    COMMENT_NOT_FOUND(4008, HttpStatus.NOT_FOUND, "Comment not found"),
    CHAT_ROOM_NOT_FOUND(4009, HttpStatus.NOT_FOUND, "Chat room not found"),
    NOTIFICATION_NOT_FOUND(4010, HttpStatus.NOT_FOUND, "Notification not found"),
    FRIEND_NOT_FOUND(4011, HttpStatus.NOT_FOUND, "Friend not found"),
    REPORT_VIOLATING_POST_NOT_FOUND(4012, HttpStatus.NOT_FOUND, "Report violating post not found"),
    NOTIFICATION_RECIPIENT_NOT_FOUND(4013,HttpStatus.NOT_FOUND,"Notification Recipient not found" ),
    ACTOR_NOT_FOUND(4014,HttpStatus.NOT_FOUND ,"Actor of notification not found"),
//    Unauthorized	Client	5xxx (Unauthenticated error)
    INVALID_TOKEN(5001, HttpStatus.UNAUTHORIZED, "Invalid token"),
    INVALID_USERNAME_PASSWORD(5002, HttpStatus.UNAUTHORIZED, "Invalid username or password"),
    ACCOUNT_NOT_VERIFIED(5003, HttpStatus.UNAUTHORIZED, "Account not verified"),
    INCORRECT_PASSWORD(5004, HttpStatus.UNAUTHORIZED, "Incorrect password"),
    UNAUTHENTICATED(5005, HttpStatus.UNAUTHORIZED, "Authentication failed"),
    VERIFY_CODE_EXPIRED(5006, HttpStatus.UNAUTHORIZED, "Code is expired"),
//    Forbidden	Client	6xxx (Unauthorized error)
    UNAUTHORIZED(6001, HttpStatus.FORBIDDEN, "Don't have permission");


    final Integer code;
    final HttpStatus status;
    final String message;
}
