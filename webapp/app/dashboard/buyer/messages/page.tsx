"use client";

import { useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Search,
  ArrowLeft,
  Send,
  ChevronDown,
  Phone,
  MoreVertical,
  MessageSquare,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export default function BuyerMessagesPage() {
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
          name: "Green Harvest Farms",
          role: "Farmer",
          lastMessage:
            "I can offer you 20 crates of tomatoes at ₦7,500 per crate",
          lastMessageTime: "10:30 AM",
          unread: 2,
          avatar: "GHF",
          online: true,
        },
        {
          id: "2",
          name: "Swift Logistics",
          role: "Logistics",
          lastMessage: "Your delivery is scheduled for tomorrow at 9 AM",
          lastMessageTime: "Yesterday",
          unread: 0,
          avatar: "SL",
          online: false,
        },
        {
          id: "3",
          name: "Sunshine Farms",
          role: "Farmer",
          lastMessage: "The yams will be ready for harvest next week",
          lastMessageTime: "2 days ago",
          unread: 0,
          avatar: "SF",
          online: true,
        },
        {
          id: "4",
          name: "Cassava Cooperative",
          role: "Farmer",
          lastMessage: "We can supply 500kg of cassava monthly",
          lastMessageTime: "3 days ago",
          unread: 0,
          avatar: "CC",
          online: false,
        },
        {
          id: "5",
          name: "Express Delivery",
          role: "Logistics",
          lastMessage: "Your invoice has been processed",
          lastMessageTime: "1 week ago",
          unread: 0,
          avatar: "ED",
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
        content: `Hello, I have some fresh produce available.`,
        timestamp: "10:00 AM",
        senderId: conversation.id,
        senderName: conversation.name,
        isOutgoing: false,
      },
      {
        id: "2",
        content:
          "Hi there! What types of produce do you currently have available?",
        timestamp: "10:05 AM",
        senderId: "me",
        senderName: user?.name || "Me",
        isOutgoing: true,
      },
      {
        id: "3",
        content:
          "We have fresh tomatoes, peppers, and cassava ready for immediate delivery.",
        timestamp: "10:10 AM",
        senderId: conversation.id,
        senderName: conversation.name,
        isOutgoing: false,
      },
      {
        id: "4",
        content:
          "Great! I'm particularly interested in the tomatoes. What varieties do you have and what's your current price per crate?",
        timestamp: "10:15 AM",
        senderId: "me",
        senderName: user?.name || "Me",
        isOutgoing: true,
      },
      {
        id: "5",
        content:
          "We have Roma and cherry tomatoes. Roma is ₦8,000 per crate and cherry is ₦9,500 per crate.",
        timestamp: "10:20 AM",
        senderId: conversation.id,
        senderName: conversation.name,
        isOutgoing: false,
      },
      {
        id: "6",
        content:
          "Those prices are a bit high compared to market rates. Could you do ₦7,000 for Roma if I order 10 crates?",
        timestamp: "10:25 AM",
        senderId: "me",
        senderName: user?.name || "Me",
        isOutgoing: true,
      },
      {
        id: "7",
        content: "I can offer you 20 crates of tomatoes at ₦7,500 per crate",
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
        content:
          "That works for me. When would you like to receive the delivery?",
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

  if (!user || user.role !== "buyer") {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
        <div className="flex-1 flex overflow-hidden">
          {/* Conversations List - Hidden on mobile when viewing a conversation */}
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
                <TabsTrigger value="logistics" className="flex-1">
                  Logistics
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex-1 overflow-y-auto p-2">
              {isLoading
                ? // Loading skeletons
                  Array(5)
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

          {/* Chat Area - Full width on mobile when viewing a conversation */}
          <div
            className={cn(
              "flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden",
              isMobileView && showConversations && "hidden"
            )}
          >
            {activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-4">
                  {isMobileView && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={handleBackToList}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  )}
                  <Avatar>
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {activeConversation.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">
                      {activeConversation.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      {activeConversation.role}
                      <ChevronDown className="h-3 w-3" />
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Block Contact
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3 max-w-[85%]",
                        message.isOutgoing ? "ml-auto" : "mr-auto"
                      )}
                    >
                      {!message.isOutgoing && (
                        <Avatar>
                          <AvatarFallback className="bg-green-100 text-green-700">
                            {activeConversation.avatar}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          "rounded-lg px-4 py-2 space-y-1",
                          message.isOutgoing
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-100 dark:bg-gray-800"
                        )}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs opacity-70">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 inline-block mb-4">
                    <MessageSquare className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </div>
                  <h3 className="font-medium mb-2">Select a Conversation</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
