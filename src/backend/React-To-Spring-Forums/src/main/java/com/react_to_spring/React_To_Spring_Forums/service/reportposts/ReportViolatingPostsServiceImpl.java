package com.react_to_spring.React_To_Spring_Forums.service.reportposts;

import com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost.ReportViolatingPostRequestDTO;
import com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost.ResponseReportViolatingPostRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.ReportViolatingPostRequest;
import com.react_to_spring.React_To_Spring_Forums.exception.AppException;
import com.react_to_spring.React_To_Spring_Forums.exception.ErrorCode;
import com.react_to_spring.React_To_Spring_Forums.repository.PostRepository;
import com.react_to_spring.React_To_Spring_Forums.repository.ReportViolatingPostRequestRepository;
import com.react_to_spring.React_To_Spring_Forums.service.notification.NotificationService;
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

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportViolatingPostsServiceImpl implements ReportViolatingPostsService {
    PostRepository postRepository;
    ReportViolatingPostRequestRepository reportViolatingPostRequestRepository;

    NotificationService notificationService;
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


        // notificationService.sendReportViolatingPostNotification(authentication.getName(), reportViolatingPostRequest.getId());
    }

    @Override
    public void responseReportViolatingPostRequest(ResponseReportViolatingPostRequest request) {
        ReportViolatingPostRequest reportViolatingPostRequest = reportViolatingPostRequestRepository.findById(request.getReportId())
                .orElseThrow(() -> new AppException(ErrorCode.REPORT_VIOLATING_POST_NOT_FOUND));
        reportViolatingPostRequestRepository.deleteById(reportViolatingPostRequest.getId());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(request.isAccepted()) {
           // notificationService.sendAcceptReportViolatingPostNotification(authentication.getName(), reportViolatingPostRequest.getId());
        }


    }

    @Override
    public PageResponse<ReportViolatingPostRequest> getAllReportViolatingPostRequests(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<ReportViolatingPostRequest> responses
                = reportViolatingPostRequestRepository.findAll(pageable);

        return PageResponse.<ReportViolatingPostRequest>builder()
                .page(page)
                .size(size)
                .totalElements(responses.getTotalElements())
                .totalPages(responses.getTotalPages())
                .data(responses.getContent())
                .build();
    }
}
