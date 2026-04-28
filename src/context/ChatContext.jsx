import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sources, setSources] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("policybot_chats");
    if (savedHistory) {
      try {
        setChatHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load chat history:", e);
      }
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("policybot_chats", JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Load current chat from localStorage on mount or when currentChatId changes
  useEffect(() => {
    if (currentChatId) {
      const chat = chatHistory.find((c) => c.id === currentChatId);
      if (chat) {
        setMessages(chat.messages);
        setSources(chat.sources || []);
      }
    }
  }, [currentChatId, chatHistory]);

  // Save current messages to history
  useEffect(() => {
    if (currentChatId && messages.length > 0) {
      setChatHistory((prevHistory) =>
        prevHistory.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages, updatedAt: new Date().toISOString() }
            : chat,
        ),
      );
    }
  }, [messages, currentChatId]);

  const addMessage = useCallback((message) => {
    setMessages((prev) => {
      // Prevent duplicate messages with the same ID
      if (prev.some((m) => m.id === message.id)) {
        return prev;
      }
      return [...prev, message];
    });
  }, []);

  const startNewChat = useCallback(() => {
    const newChatId = `chat_${Date.now()}`;
    const newChat = {
      id: newChatId,
      title: "New Chat",
      messages: [],
      sources: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setChatHistory((prev) => [newChat, ...prev]);
    setCurrentChatId(newChatId);
    setMessages([]);
    setSources([]);
    setUnreadCount(0);
  }, []);

  const loadChat = useCallback((chatId) => {
    setCurrentChatId(chatId);
    setUnreadCount(0);
  }, []);

  const deleteChat = useCallback(
    (chatId) => {
      setChatHistory((prev) => prev.filter((c) => c.id !== chatId));
      if (currentChatId === chatId) {
        setCurrentChatId(null);
        setMessages([]);
        setSources([]);
      }
    },
    [currentChatId],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setSources([]);
    setUnreadCount(0);
  }, []);

  const toggleWidget = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      // Widget is being opened
      setUnreadCount(0);
      // Start new chat if no current chat
      if (!currentChatId) {
        startNewChat();
      }
    }
  }, [isOpen, currentChatId, startNewChat]);

  const closeWidget = useCallback(() => {
    setIsOpen(false);
  }, []);

  const incrementUnread = useCallback(() => {
    if (!isOpen) {
      setUnreadCount((prev) => prev + 1);
    }
  }, [isOpen]);

  const value = {
    // State
    messages,
    isTyping,
    isOpen,
    sources,
    chatHistory,
    currentChatId,
    unreadCount,

    // Actions
    addMessage,
    setIsTyping,
    setSources,
    toggleWidget,
    closeWidget,
    startNewChat,
    loadChat,
    deleteChat,
    clearMessages,
    incrementUnread,
    setMessages,
    setChatHistory,
    setCurrentChatId,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
}
