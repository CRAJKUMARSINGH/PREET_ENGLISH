// Chat hooks for compatibility
import { useState } from 'react';

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
      
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: message,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Mock AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "This is a mock AI response to: " + message,
          sender: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
        setIsStreaming(false);
      }, 1000);
      
      return "Mock response";
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