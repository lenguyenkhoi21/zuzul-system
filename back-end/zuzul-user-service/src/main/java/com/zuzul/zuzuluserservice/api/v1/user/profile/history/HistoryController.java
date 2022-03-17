package com.zuzul.zuzuluserservice.api.v1.user.profile.history;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.create_history.CreateHistory;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.create_history.POSTCreateHistoryPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.create_history.POSTCreateHistoryResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_all_history.GETAllHistoryResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_all_history.GetAllHistory;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_all_history.HistoryModel;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_history_details.GETHistoryDetailResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_history_details.GetHistoryDetail;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(Constant.rootPathV1)
public class HistoryController {
    private final CreateHistory createHistory;
    private final GetAllHistory getAllHistory;
    private final GetHistoryDetail getHistoryDetail;

    @PostMapping("/user/history")
    public POSTCreateHistoryResponse createHistory (@RequestBody POSTCreateHistoryPayload payload, Principal principal) throws JsonProcessingException {
        return createHistory.createHistory(payload, principal);
    }

    @GetMapping("/user/{userId}/history/all")
    public List<HistoryModel> getAllHistory (@PathVariable("userId") String userId, Principal principal) {
        return getAllHistory.getAllHistory(userId, principal);
    }

    @GetMapping("/user/{userId}/history/{historyId}")
    public GETHistoryDetailResponse getHistoryDetail (@PathVariable("userId") String userId
            , @PathVariable("historyId") String historyId
            , Principal principal) {
        return getHistoryDetail.getHistoryDetail(userId, historyId, principal);
    }
}
