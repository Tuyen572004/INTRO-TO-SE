package com.react_to_spring.React_To_Spring_Forums.controller;

import com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost.ReportViolatingPostRequestDTO;
import com.react_to_spring.React_To_Spring_Forums.dto.request.reportpost.ResponseReportViolatingPostRequest;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ApiResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.PageResponse;
import com.react_to_spring.React_To_Spring_Forums.dto.response.ReportViolatingPostRequestResponse;
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

    @DeleteMapping("/report")
    @Operation(summary = "Un-Report Report Violating Post",
            description = "Un-Report a report of a violating post")
    public ApiResponse<Void> deleteReportViolatingPost(@RequestParam("postId") String postId) {
        reportViolatingPostsService.deleteReportViolatingPost(postId);
        return ApiResponse.<Void>builder().message("Un-Report submitted successfully").build();
    }

    @DeleteMapping("/delete/{id}")
    @Operation(summary = "Delete Report Violating Post by ID",
            description = "Delete a report of a violating post by ID")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Void> deleteReportViolatingPostById(@PathVariable("id") String id) {
        reportViolatingPostsService.deleteReportViolatingPostById(id);
        return ApiResponse.<Void>builder().message("Report deleted successfully").build();
    }


    @GetMapping("/is-reported")
    @Operation(summary = "Check if Post is Reported",
            description = "Check if a post has been reported")
    public ApiResponse<Boolean> isReported(@RequestParam("postId") String postId) {
        boolean isReported = reportViolatingPostsService.isReported(postId);
        return ApiResponse.<Boolean>builder().data(isReported).build();
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
    public ApiResponse<PageResponse<ReportViolatingPostRequestResponse>> getAllReportViolatingPosts(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        PageResponse<ReportViolatingPostRequestResponse> responses = reportViolatingPostsService.getAllReportViolatingPostRequestResponses(page, size);
        return ApiResponse.<PageResponse<ReportViolatingPostRequestResponse>>builder().data(responses).build();
    }

    @GetMapping("count")
    @Operation(summary = "Get Count of Report Violating Posts",
            description = "Get the count of reports of violating posts")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<Long> getReportViolatingPostCount() {
        return ApiResponse.<Long>builder().
                data(reportViolatingPostsService.getReportViolatingPostCount())
                .build();
    }
}