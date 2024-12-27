package com.react_to_spring.React_To_Spring_Forums.service.reportposts;

import com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost.ReportViolatingPostRequestDTO;
import com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost.ResponseReportViolatingPostRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PostResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ReportViolatingPostRequestResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.UserInfoResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.ReportViolatingPostRequest;
import com.react_to_spring.React_To_Spring_Forums.entity.User;
import com.react_to_spring.React_To_Spring_Forums.entity.UserProfile;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.repository.PostRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.ReportViolatingPostRequestRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserProfileRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.UserRepository;
import com.react_to_spring.React_To_Spring_Forums.service.notification.NotificationService;
import com.react_to_spring.React_To_Spring_Forums.service.post.PostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportViolatingPostsServiceImpl implements ReportViolatingPostsService {
    PostRepository postRepository;
    UserRepository userRepository;
    UserProfileRepository userProfileRepository;
    ReportViolatingPostRequestRepository reportViolatingPostRequestRepository;

    NotificationService notificationService;
    PostService postService;

    @Override
    public void sendReportViolatingPostRequest(ReportViolatingPostRequestDTO request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (reportViolatingPostRequestRepository.existsBySendingUserIdAndPostId(authentication.getName(), request.getPostId())) {
            throw new AppException(ErrorCode.ALREADY_SENT_REPORT);
        }

        if (!postRepository.existsById(request.getPostId())) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }

        ReportViolatingPostRequest reportViolatingPostRequest = ReportViolatingPostRequest.builder()
                .postId(request.getPostId())
                .reason(request.getReason())
                .sendingUserId(authentication.getName())
                .build();
        reportViolatingPostRequest = reportViolatingPostRequestRepository.save(reportViolatingPostRequest);


        notificationService.sendReportViolatingPostNotification(authentication.getName(), reportViolatingPostRequest.getId());
    }

    @Override
    public void responseReportViolatingPostRequest(ResponseReportViolatingPostRequest request) {
        ReportViolatingPostRequest reportViolatingPostRequest = reportViolatingPostRequestRepository.findById(request.getReportId())
                .orElseThrow(() -> new AppException(ErrorCode.REPORT_VIOLATING_POST_NOT_FOUND));
        reportViolatingPostRequestRepository.deleteById(reportViolatingPostRequest.getId());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(request.isAccepted()) {
           notificationService.sendAcceptReportViolatingPostNotification(authentication.getName(), reportViolatingPostRequest.getId());
        }


    }

    @Override
    public PageResponse<ReportViolatingPostRequestResponse> getAllReportViolatingPostRequestResponses(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<ReportViolatingPostRequest> responses
                = reportViolatingPostRequestRepository.findAll(pageable);

        List<ReportViolatingPostRequest> requests = responses.getContent();
        List<ReportViolatingPostRequestResponse> responseList = new ArrayList<>();

        for (ReportViolatingPostRequest item : requests) {
            String sendingUserId = item.getSendingUserId();
            String postId = item.getPostId();
            String reason = item.getReason();

            User user = userRepository.findById(sendingUserId)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

            UserProfile userProfile = userProfileRepository.findByUserId(sendingUserId)
                    .orElseThrow(() -> new AppException(ErrorCode.USER_PROFILE_NOT_FOUND));

            UserInfoResponse userInfoResponse = UserInfoResponse.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .name(userProfile.getFirstName() + " " + userProfile.getLastName())
                    .avatar(userProfile.getProfileImgUrl())
                    .build();

            PostResponse postResponse = postService.getPostById(postId);

            ReportViolatingPostRequestResponse response = ReportViolatingPostRequestResponse.builder()
                    .user(userInfoResponse)
                    .post(postResponse)
                    .reason(reason)
                    .build();

            responseList.add(response);
        }

        return PageResponse.<ReportViolatingPostRequestResponse>builder()
                .page(page)
                .size(size)
                .totalElements(responses.getTotalElements())
                .totalPages(responses.getTotalPages())
                .data(responseList)
                .build();
    }

    @Override
    public boolean isReported(String postId) {
        if (!postRepository.existsById(postId)) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        return reportViolatingPostRequestRepository.existsBySendingUserIdAndPostId(userId, postId);
    }

    @Override
    public void deleteReportViolatingPost(String postId) {
        if (!postRepository.existsById(postId)) {
            throw new AppException(ErrorCode.POST_NOT_FOUND);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();

        if (!reportViolatingPostRequestRepository.existsBySendingUserIdAndPostId(userId, postId)) {
            throw new AppException(ErrorCode.THIS_POST_HAS_NOT_BEEN_REPORTED);
        }

        reportViolatingPostRequestRepository.deleteBySendingUserIdAndPostId(userId, postId);
    }
}
