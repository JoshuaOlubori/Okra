"use client";

import { useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  ChevronLeft,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  isOutgoing: boolean;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  avatar: string;
  online: boolean;
}

export default function LogisticsMessagesPage() {
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showConversations, setShowConversations] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if mobile view
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    // Simulate loading conversations
    const loadConversations = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockConversations: Conversation[] = [
        {
          id: "1",
          name: "John Farmer",
          role: "Farmer",
          lastMessage: "When will you arrive at the pickup location?",
          lastMessageTime: "10:30 AM",
          unread: 2,
          avatar: "JF",
          online: true,
        },
        {
          id: "2",
          name: "Sarah Buyer",
          role: "Buyer",
          lastMessage: "Please confirm the delivery time for tomorrow",
          lastMessageTime: "Yesterday",
          unread: 0,
          avatar: "SB",
          online: false,
        },
        {
          id: "3",
          name: "Michael Farmer",
          role: "Farmer",
          lastMessage: "The tomatoes are ready for pickup",
          lastMessageTime: "Yesterday",
          unread: 1,
          avatar: "MF",
          online: true,
        },
        {
          id: "4",
          name: "Emma Buyer",
          role: "Buyer",
          lastMessage: "Can you deliver to a different address?",
          lastMessageTime: "Monday",
          unread: 0,
          avatar: "EB",
          online: false,
        },
        {
          id: "5",
          name: "David Farmer",
          role: "Farmer",
          lastMessage: "I've added extra crates of potatoes",
          lastMessageTime: "Sunday",
          unread: 0,
          avatar: "DF",
          online: false,
        },
      ];

      setConversations(mockConversations);
      setIsLoading(false);
    };

    loadConversations();
  }, []);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);

    if (isMobileView) {
      setShowConversations(false);
    }

    // Mark as read
    setConversations(
      conversations.map((c) =>
        c.id === conversation.id ? { ...c, unread: 0 } : c
      )
    );

    // Load mock messages
    const mockMessages: Message[] = [
      {
        id: "1",
        content:
          "Hello, I have 20 crates of tomatoes ready for pickup tomorrow.",
        timestamp: "10:15 AM",
        senderId: conversation.id,
        senderName: conversation.name,
        isOutgoing: false,
      },
      {
        id: "2",
        content: "Great! What time would be convenient for you?",
        timestamp: "10:20 AM",
        senderId: "me",
        senderName: user?.name || "Me",
        isOutgoing: true,
      },
      {
        id: "3",
        content: "Anytime between 8 AM and 12 PM works for me.",
        timestamp: "10:22 AM",
        senderId: conversation.id,
        senderName: conversation.name,
        isOutgoing: false,
      },
      {
        id: "4",
        content:
          "Perfect, I'll be there at 9 AM. Is the address still the same as last time?",
        timestamp: "10:25 AM",
        senderId: "me",
        senderName: user?.name || "Me",
        isOutgoing: true,
      },
      {
        id: "5",
        content:
          "Yes, same address. When will you arrive at the pickup location?",
        timestamp: "10:30 AM",
        senderId: conversation.id,
        senderName: conversation.name,
        isOutgoing: false,
      },
    ];

    setMessages(mockMessages);
  };

  const handleSendMessage = () => {
    if (!message.trim() || !activeConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      senderId: "me",
      senderName: user?.name || "Me",
      isOutgoing: true,
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate reply after 1-2 seconds
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'll have everything ready for you at the pickup point.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        senderId: activeConversation.id,
        senderName: activeConversation.name,
        isOutgoing: false,
      };

      setMessages((prev) => [...prev, replyMessage]);
    }, 1000 + Math.random() * 1000);
  };

  const handleBackToList = () => {
    setShowConversations(true);
  };

  if (!user || user.role !== "logistics") {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
        <div className="flex-1 flex overflow-hidden">
          {/* Conversations List */}
          <div
            className={cn(
              "w-full md:w-80 lg:w-96 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-hidden flex flex-col",
              isMobileView && !showConversations && "hidden"
            )}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-9" />
              </div>
            </div>

            <Tabs defaultValue="all" className="px-2 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">
                  All
                </TabsTrigger>
                <TabsTrigger value="farmers" className="flex-1">
                  Farmers
                </TabsTrigger>
                <TabsTrigger value="buyers" className="flex-1">
                  Buyers
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex-1 overflow-y-auto p-2">
              {isLoading
                ? Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 mb-2 rounded-lg"
                      >
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-24 mb-2" />
                          <Skeleton className="h-3 w-40" />
                        </div>
                      </div>
                    ))
                : conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                        activeConversation?.id === conversation.id
                          ? "bg-green-50 dark:bg-green-900/20"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                      onClick={() => handleSelectConversation(conversation)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback className="bg-green-100 text-green-700">
                            {conversation.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-sm truncate">
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {conversation.lastMessageTime}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unread > 0 && (
                            <Badge
                              variant="default"
                              className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                            >
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          {/* Chat Area */}
          <div
            className={cn(
              "flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden",
              isMobileView && showConversations && "hidden"
            )}
          >
            {activeConversation ? (
              <>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  {isMobileView && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleBackToList}
                      className="mr-2"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                  )}
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {activeConversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{activeConversation.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activeConversation.online ? "Online" : "Offline"} •{" "}
                        {activeConversation.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex",
                          msg.isOutgoing ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg px-4 py-2",
                            msg.isOutgoing
                              ? "bg-green-500 text-white rounded-br-none"
                              : "bg-white dark:bg-gray-800 rounded-bl-none border border-gray-200 dark:border-gray-700"
                          )}
                        >
                          <p>{msg.content}</p>
                          <p
                            className={cn(
                              "text-xs mt-1",
                              msg.isOutgoing
                                ? "text-green-100"
                                : "text-gray-500 dark:text-gray-400"
                            )}
                          >
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="bg-white dark:bg-gray-800"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  Select a conversation to start messaging with farmers and
                  buyers
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
