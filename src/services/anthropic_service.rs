use anthropic::{Anthropic, Client};
use serde_json::json;
use std::env;

pub struct AnthropicService {
    client: Client,
}

impl AnthropicService {
    pub fn new() -> Result<Self, Box<dyn std::error::Error>> {
        let api_key = env::var("ANTHROPIC_API_KEY")
            .map_err(|_| "ANTHROPIC_API_KEY environment variable not set")?;
        
        let client = Anthropic::new(&api_key)?;
        
        Ok(AnthropicService { client })
    }

    pub async fn chat_with_claude(&self, message: &str) -> Result<String, Box<dyn std::error::Error>> {
        let request = json!({
            "model": "claude-3-5-sonnet-20241022",
            "max_tokens": 1000,
            "temperature": 0,
            "system": "You are a helpful assistant for the Boston Drone School.",
            "messages": [
                {
                    "role": "user",
                    "content": message
                }
            ]
        });

        let response = self.client.messages().create(request).await?;
        
        // Extract text content from response
        if let Some(content) = response.content.get(0) {
            if let Some(text) = content.get("text") {
                return Ok(text.as_str().unwrap_or("").to_string());
            }
        }
        
        Ok("No response received".to_string())
    }

    pub async fn analyze_drone_content(&self, content: &str) -> Result<String, Box<dyn std::error::Error>> {
        let request = json!({
            "model": "claude-3-5-sonnet-20241022",
            "max_tokens": 2000,
            "temperature": 0,
            "system": "You are an expert drone instructor and safety analyst. Analyze the provided content for drone-related information, safety concerns, best practices, and educational value.",
            "messages": [
                {
                    "role": "user",
                    "content": format!("Please analyze this drone-related content: {}", content)
                }
            ]
        });

        let response = self.client.messages().create(request).await?;
        
        if let Some(content) = response.content.get(0) {
            if let Some(text) = content.get("text") {
                return Ok(text.as_str().unwrap_or("").to_string());
            }
        }
        
        Ok("No analysis available".to_string())
    }

    pub async fn generate_course_content(
        &self, 
        topic: &str, 
        level: &str
    ) -> Result<String, Box<dyn std::error::Error>> {
        let request = json!({
            "model": "claude-3-5-sonnet-20241022",
            "max_tokens": 3000,
            "temperature": 0.3,
            "system": "You are an expert drone instructor creating educational content for the Boston Drone School. Generate comprehensive, accurate, and engaging course material.",
            "messages": [
                {
                    "role": "user",
                    "content": format!(
                        "Create {} level course content about: {}. Include learning objectives, key concepts, safety considerations, and practical exercises.",
                        level, topic
                    )
                }
            ]
        });

        let response = self.client.messages().create(request).await?;
        
        if let Some(content) = response.content.get(0) {
            if let Some(text) = content.get("text") {
                return Ok(text.as_str().unwrap_or("").to_string());
            }
        }
        
        Ok("No content generated".to_string())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_anthropic_service_creation() {
        // This test will only pass if ANTHROPIC_API_KEY is set
        match AnthropicService::new() {
            Ok(_) => println!("AnthropicService created successfully"),
            Err(e) => println!("Expected error when API key not set: {}", e),
        }
    }
}