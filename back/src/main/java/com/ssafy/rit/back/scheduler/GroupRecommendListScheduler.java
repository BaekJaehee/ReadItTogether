package com.ssafy.rit.back.scheduler;

import com.ssafy.rit.back.service.GroupRecommendListService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GroupRecommendListScheduler {

    private final GroupRecommendListService groupRecommendListService;

    @Scheduled(cron = "0 0 3 * * *")
    public void createGroupRecommendList() {
        groupRecommendListService.createGroupRecommendList();
    }

    @Scheduled(cron = "0 0 2 * * SUN")
    public void changeIsReceivable() {
        groupRecommendListService.changeIsReceivable();
    }
}
