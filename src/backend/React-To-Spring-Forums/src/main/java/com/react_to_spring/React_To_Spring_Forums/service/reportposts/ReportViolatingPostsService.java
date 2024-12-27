package com.react_to_spring.React_To_Spring_Forums.service.reportposts;

import com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost.ReportViolatingPostRequestDTO;
import com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost.ResponseReportViolatingPostRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ReportViolatingPostRequestResponse;

public interface ReportViolatingPostsService {
    void sendReportViolatingPostRequest(ReportViolatingPostRequestDTO request);
    void responseReportViolatingPostRequest(ResponseReportViolatingPostRequest request);
    PageResponse<ReportViolatingPostRequestResponse> getAllReportViolatingPostRequestResponses(int page, int size);
    boolean isReported(String postId);
    void deleteReportViolatingPost(String postId);
}
