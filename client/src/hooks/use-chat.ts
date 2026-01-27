import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

// Chat types
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
}

export function useChatStream(conversationId?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStream, setCurrentStream] = useState('');

  return {
    messages,
    isStreaming,
    currentStream,
    isLoading,
    sendMessage: async (message: string) => {
      setIsLoading(true);
      setIsStreaming(true);

      // Add user message immediately
      const userMessage: Message = {
        id: Date.now().toString(),
        content: message,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });

        if (!res.ok) throw new Error("Failed to send message");

        const data = await res.json();

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          sender: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);

      } catch (error) {
        console.error("Chat Error:", error);
        // Fallback if API completely fails (network error)
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "Sorry, I am having trouble connecting. Please check your internet connection. 🙏",
          sender: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
        setIsStreaming(false);
      }

      return "Response received";
    }
  };
}

export function useConversations() {
  const mockConversations: Conversation[] = [
    {
      id: '1',
      title: 'General Chat',
      messages: []
    }
  ];

  return {
    data: mockConversations,
    isLoading: false
  };
}

export function useCreateConversation() {
  return {
    mutate: (title: string, options?: { onSuccess?: (conv: Conversation) => void }) => {
      // Mock implementation
      const newConv: Conversation = {
        id: Date.now().toString(),
        title,
        messages: []
      };

      if (options?.onSuccess) {
        options.onSuccess(newConv);
      }
    },
    isLoading: false
  };
}