package com.react_to_spring.React_To_Spring_Forums.service.reportposts;

import com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost.ReportViolatingPostRequestDTO;
import com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost.ResponseReportViolatingPostRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.ReportViolatingPostRequest;

public interface ReportViolatingPostsService {
    void sendReportViolatingPostRequest(ReportViolatingPostRequestDTO request);
    void responseReportViolatingPostRequest(ResponseReportViolatingPostRequest request);
    PageResponse<ReportViolatingPostRequest> getAllReportViolatingPostRequests(int page, int size);
}
