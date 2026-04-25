import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatbotService } from '../../services/chatbot.service';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  isOpen = false;
  messages: ChatMessage[] = [];
  userInput: string = '';
  isLoading = false;
  xmlContext: string | null = null;

  constructor(private http: HttpClient, private chatbotService: ChatbotService) {}

  ngOnInit() {
    this.chatbotService.currentXmlContext.subscribe(xml => {
      this.xmlContext = xml;
    });
    
    // Initial greeting
    this.messages.push({
      role: 'assistant',
      content: 'Hello! I am your DGR Assistant. How can I help you with aviation compliance today?'
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    const userText = this.userInput;
    this.messages.push({ role: 'user', content: userText });
    this.userInput = '';
    this.isLoading = true;

    // Build the prompt by appending the XML context if it exists
    let promptText = userText;
    if (this.xmlContext) {
      promptText += `\n\nContext - Uploaded XML File:\n${this.xmlContext}`;
    }

    this.http.post<any>('http://localhost:8000/ai', { text: promptText }).subscribe({
      next: (response) => {
        const result = response.result || response;
        let answer = "I couldn't process that request.";
        
        if (result.answer) {
          answer = result.answer;
        } else if (result.violation) {
          answer = `**Violation:** ${result.violation}\n\n**Reference:** ${result.regulation_reference || 'N/A'}\n\n**Action Required:** ${result.action_required || 'None'}`;
        } else if (result.message) {
          answer = result.message;
        }

        this.messages.push({ role: 'assistant', content: answer });
        this.isLoading = false;
        this.scrollToBottom();
      },
      error: (error) => {
        console.error('Chat error:', error);
        this.messages.push({ role: 'assistant', content: 'Sorry, I am having trouble connecting to the backend.' });
        this.isLoading = false;
        this.scrollToBottom();
      }
    });
  }
  
  scrollToBottom() {
    setTimeout(() => {
      const container = document.getElementById('chat-messages-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);
  }
}
