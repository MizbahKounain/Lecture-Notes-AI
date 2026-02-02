package com.notex.backend.service;

import com.google.gson.*;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.*;
import java.nio.charset.StandardCharsets;

@Service
public class AiService {

        // 🔑 PUT YOUR GROQ API KEY HERE
        private static final String API_KEY = System.getenv("GROQ_API_KEY");

        public String cleanAndSummarize(String transcript) throws Exception {

                String prompt = """
                                You are an academic note-taking assistant.

                                Convert the following lecture transcript into
                                clear, well-structured, professional notes for students.

                                Formatting rules (STRICT):
                                - Output ONLY plain text
                                - Do NOT use asterisks (*), dashes (-), bullets (•), or markdown
                                - Do NOT use emojis
                                - Use numbered points only (1., 2., 3.),Use dot after numbers

                                Structure the notes using these headings (exact wording):
                                Title:
                                Introduction
                                Key Concepts
                                Summary

                                Guidelines:
                                - Title should reflect the lecture topic
                                - Introduction should briefly explain the topic
                                - Key Concepts should contain the main ideas in numbered points
                                - Summary should briefly recap the lecture in numbered points
                                - Keep language simple, clear, and professional
                                - Make it easy for students to study from

                                Lecture Transcript:
                                """ + transcript;

                JsonObject root = new JsonObject();
                root.addProperty("model", "llama-3.1-8b-instant");

                JsonArray messages = new JsonArray();
                JsonObject user = new JsonObject();
                user.addProperty("role", "user");
                user.addProperty("content", prompt);
                messages.add(user);

                root.add("messages", messages);
                root.addProperty("temperature", 0.3);

                String body = new Gson().toJson(root);

                HttpRequest request = HttpRequest.newBuilder()
                                .uri(URI.create("https://api.groq.com/openai/v1/chat/completions"))
                                .header("Content-Type", "application/json")
                                .header("Authorization", "Bearer " + API_KEY)
                                .POST(HttpRequest.BodyPublishers.ofString(body, StandardCharsets.UTF_8))
                                .build();

                HttpClient client = HttpClient.newHttpClient();
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() != 200) {
                        return "AI API error: " + response.body();
                }

                JsonObject json = JsonParser.parseString(response.body()).getAsJsonObject();

                return json
                                .getAsJsonArray("choices")
                                .get(0)
                                .getAsJsonObject()
                                .getAsJsonObject("message")
                                .get("content")
                                .getAsString();
        }

        public String generateStudyNotes(String notes) throws Exception {

                String prompt = """
                                You are an academic exam preparation assistant.

                                Convert the following notes into exam-oriented study material.

                                Structure the output using ONLY plain text and these sections:

                                Title:
                                Important Definitions
                                Possible Exam Questions
                                Key Points to Remember

                                Rules:
                                - Use numbered points only (1., 2., 3.)
                                - Do NOT use bullets, asterisks, emojis, or markdown
                                - Keep answers concise and student-friendly
                                - Focus on exam relevance

                                Notes:
                                """ + notes;

                JsonObject root = new JsonObject();
                root.addProperty("model", "llama-3.1-8b-instant");
                root.addProperty("temperature", 0.3);

                JsonArray messages = new JsonArray();
                JsonObject user = new JsonObject();
                user.addProperty("role", "user");
                user.addProperty("content", prompt);
                messages.add(user);

                root.add("messages", messages);

                String body = new Gson().toJson(root);

                HttpRequest request = HttpRequest.newBuilder()
                                .uri(URI.create("https://api.groq.com/openai/v1/chat/completions"))
                                .header("Content-Type", "application/json")
                                .header("Authorization", "Bearer " + API_KEY)
                                .POST(HttpRequest.BodyPublishers.ofString(body, StandardCharsets.UTF_8))
                                .build();

                HttpClient client = HttpClient.newHttpClient();
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() != 200) {
                        return "AI API error: " + response.body();
                }

                JsonObject json = JsonParser.parseString(response.body()).getAsJsonObject();

                return json
                                .getAsJsonArray("choices")
                                .get(0)
                                .getAsJsonObject()
                                .getAsJsonObject("message")
                                .get("content")
                                .getAsString();
        }

}
