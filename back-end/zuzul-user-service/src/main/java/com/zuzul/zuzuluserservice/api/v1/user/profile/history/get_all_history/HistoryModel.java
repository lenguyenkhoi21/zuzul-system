package com.zuzul.zuzuluserservice.api.v1.user.profile.history.get_all_history;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HistoryModel {
    private String historyId;
    private long dateCreated;
    private List<String> productName;
    private int totalPrice;
}
