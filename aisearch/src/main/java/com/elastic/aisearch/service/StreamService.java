package com.elastic.aisearch.service;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


@Service
public class StreamService {
    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    public SseEmitter createEmitter(String streamId) {
        SseEmitter emitter = new SseEmitter(0L);
        emitters.put(streamId, emitter);

        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
        scheduler.scheduleAtFixedRate(() -> {
            try {
                emitter.send(SseEmitter.event().name("keep-alive").data("ping"));
            } catch (IOException e) {
                emitter.completeWithError(e);
                scheduler.shutdown();
            }
        }, 0, 25, TimeUnit.SECONDS);

        emitter.onCompletion(scheduler::shutdown);
        emitter.onTimeout(() -> {
            scheduler.shutdown();
            emitter.complete();
        });

        return emitter;
    }

    public void sendAiAbstractToUser(String streamId, Object abstractDTO) {
        SseEmitter emitter = emitters.get(streamId);
        System.out.println("Enviando stream.");
        if (emitter != null) {
            try {
                System.out.println("Eviando para " + streamId + " o resumo " + abstractDTO.toString());
                emitter.send(SseEmitter.event()
                        .name("AiAbstract")
                        .data(abstractDTO));

            } catch (IOException e) {
                emitters.remove(streamId);
            }
        }
    }
}
