package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost.ReportViolatingPostRequestDTO;
import com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost.ResponseReportViolatingPostRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.entity.ReportViolatingPostRequest;
import com.react_to_spring.React_To_Spring_Forums.service.reportposts.ReportViolatingPostsService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/report-posts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ReportViolatingPostsController {

    ReportViolatingPostsService reportViolatingPostsService;

    @PostMapping("/report")
    @Operation(summary = "Report Violating Post",
            description = "Report a post that violates the rules")
    public ApiResponse<Void> reportViolatingPost(@RequestBody ReportViolatingPostRequestDTO request) {
        reportViolatingPostsService.sendReportViolatingPostRequest(request);
        return ApiResponse.<Void>builder().message("Report submitted successfully").build();
    }

    @PostMapping("/response")
    @Operation(summary = "Response to Report Violating Post",
            description = "Respond to a report of a violating post")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> responseReportViolatingPost(@RequestBody ResponseReportViolatingPostRequest request) {
        reportViolatingPostsService.responseReportViolatingPostRequest(request);
        return ApiResponse.<Void>builder().message("Response submitted successfully").build();
    }

    @GetMapping("/all")
    @Operation(summary = "Get All Report Violating Posts",
            description = "Get all reports of violating posts")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<PageResponse<ReportViolatingPostRequest>> getAllReportViolatingPosts(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        PageResponse<ReportViolatingPostRequest> responses = reportViolatingPostsService.getAllReportViolatingPostRequests(page, size);
        return ApiResponse.<PageResponse<ReportViolatingPostRequest>>builder().data(responses).build();
    }
}