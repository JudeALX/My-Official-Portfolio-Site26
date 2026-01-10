"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Settings,
  Trash2,
  Plus,
  Check,
  Upload,
  FileText,
  ImageIcon,
  Download,
  Palette,
  Type,
  ToggleLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface Attachment {
  id: string
  name: string
  url: string
  type: "image" | "document" | "other"
}

interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: Date
  attachments?: Attachment[]
}

interface CustomResponse {
  id: string
  trigger: string
  response: string
  attachments?: Attachment[]
}

interface ChatbotSettings {
  botName: string
  welcomeMessage: string
  primaryColor: string
  showTimestamps: boolean
}

// Default responses that can be customized
const defaultResponses: CustomResponse[] = [
  {
    id: "1",
    trigger: "hello|hi|hey|greetings",
    response:
      "Hello! Welcome to Emeka's portfolio. I'm here to help you learn more about his expertise in e-commerce and digital marketing. How can I assist you today?",
  },
  {
    id: "2",
    trigger: "services|what do you do|what does emeka do|expertise",
    response:
      "Emeka specializes in:\n\n• E-commerce Management (Shopify, WooCommerce)\n• Digital Marketing Strategy\n• SEO & SEM Optimization\n• Conversion Rate Optimization\n• UX/UI Optimization\n• Data Analytics & Reporting\n• AI Agents & Automation\n\nWould you like to know more about any specific service?",
  },
  {
    id: "3",
    trigger: "experience|background|work history",
    response:
      "Emeka has 7+ years of experience in digital growth, currently serving as an E-commerce Website Manager at a multinational FMCG conglomerate in Nigeria. He has boosted online revenue by 100% and improved conversion rates by 20%. Would you like to see his full journey?",
  },
  {
    id: "4",
    trigger: "contact|hire|work together|consultation",
    response:
      "Great! Emeka would love to discuss your project. You can:\n\n1. Fill out the contact form on this page\n2. Connect on LinkedIn\n3. Send an email directly\n\nShall I scroll you to the contact section?",
  },
  {
    id: "5",
    trigger: "certifications|qualifications|education",
    response:
      "Emeka holds:\n\n- Google Digital Marketing & E-commerce Certification\n- SEMrush SEO Certification\n- MSc Finance (Distinction)\n- BSc Banking & Finance (First Class Honours)\n\nHe's also a certified web developer and continuously updates his skills.",
  },
  {
    id: "6",
    trigger: "resume|cv|download",
    response: "Here's Emeka's resume for your review. Feel free to download it!",
    attachments: [
      {
        id: "resume-1",
        name: "Emeka_Okonkwo_Resume.pdf",
        url: "/placeholder-resume.pdf",
        type: "document",
      },
    ],
  },
  {
    id: "7",
    trigger: "default",
    response:
      "Thanks for your message! I'd be happy to help you learn more about Emeka's work. You can ask me about:\n\n• His services and expertise\n• Work experience\n• Certifications & education\n• How to get in touch\n\nOr feel free to use the contact form to reach out directly!",
  },
]

const defaultSettings: ChatbotSettings = {
  botName: "Emeka's Assistant",
  welcomeMessage:
    "Hi there! I'm Emeka's virtual assistant. How can I help you learn more about his e-commerce and digital marketing expertise today?",
  primaryColor: "purple",
  showTimestamps: true,
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [settingsTab, setSettingsTab] = useState<"responses" | "appearance">("responses")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [customResponses, setCustomResponses] = useState<CustomResponse[]>(defaultResponses)
  const [editingResponse, setEditingResponse] = useState<CustomResponse | null>(null)
  const [newTrigger, setNewTrigger] = useState("")
  const [newResponse, setNewResponse] = useState("")
  const [newAttachments, setNewAttachments] = useState<Attachment[]>([])
  const [editingAttachments, setEditingAttachments] = useState<Attachment[]>([])
  const [chatSettings, setChatSettings] = useState<ChatbotSettings>(defaultSettings)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            id: "welcome",
            content: chatSettings.welcomeMessage,
            isBot: true,
            timestamp: new Date(),
          },
        ])
      }, 500)
    }
  }, [isOpen, messages.length, chatSettings.welcomeMessage])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const files = e.target.files
    if (!files) return

    const newFiles: Attachment[] = Array.from(files).map((file) => {
      const fileType = file.type.startsWith("image/")
        ? "image"
        : file.type === "application/pdf" || file.type.includes("document")
          ? "document"
          : "other"
      return {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: URL.createObjectURL(file),
        type: fileType,
      }
    })

    if (isEditing) {
      setEditingAttachments((prev) => [...prev, ...newFiles])
    } else {
      setNewAttachments((prev) => [...prev, ...newFiles])
    }

    e.target.value = ""
  }

  const removeAttachment = (id: string, isEditing = false) => {
    if (isEditing) {
      setEditingAttachments((prev) => prev.filter((a) => a.id !== id))
    } else {
      setNewAttachments((prev) => prev.filter((a) => a.id !== id))
    }
  }

  const findResponse = (input: string): { response: string; attachments?: Attachment[] } => {
    const lowerInput = input.toLowerCase()

    for (const item of customResponses) {
      if (item.trigger === "default") continue
      const triggers = item.trigger.split("|")
      if (triggers.some((trigger) => lowerInput.includes(trigger.toLowerCase()))) {
        return { response: item.response, attachments: item.attachments }
      }
    }

    const defaultItem = customResponses.find((r) => r.trigger === "default")
    return {
      response:
        defaultItem?.response ||
        "I'm not sure how to help with that. Please try asking about services, experience, or contact information.",
      attachments: defaultItem?.attachments,
    }
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    setTimeout(() => {
      const { response, attachments } = findResponse(input)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: new Date(),
        attachments: attachments,
      }
      setMessages((prev) => [...prev, botMessage])
    }, 800)
  }

  const handleAddResponse = () => {
    if (!newTrigger.trim() || !newResponse.trim()) return

    const newItem: CustomResponse = {
      id: Date.now().toString(),
      trigger: newTrigger.toLowerCase(),
      response: newResponse,
      attachments: newAttachments.length > 0 ? newAttachments : undefined,
    }

    setCustomResponses((prev) => [...prev, newItem])
    setNewTrigger("")
    setNewResponse("")
    setNewAttachments([])
  }

  const handleUpdateResponse = (id: string, trigger: string, response: string) => {
    setCustomResponses((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              trigger,
              response,
              attachments: editingAttachments.length > 0 ? editingAttachments : undefined,
            }
          : item,
      ),
    )
    setEditingResponse(null)
    setEditingAttachments([])
  }

  const handleDeleteResponse = (id: string) => {
    setCustomResponses((prev) => prev.filter((item) => item.id !== id))
  }

  const startEditing = (item: CustomResponse) => {
    setEditingResponse(item)
    setEditingAttachments(item.attachments || [])
  }

  const clearChat = () => {
    setMessages([])
  }

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />
      case "document":
        return <FileText className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center",
          isOpen && "hidden",
        )}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[500px] bg-card rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-primary-foreground">{chatSettings.botName}</h3>
                  <p className="text-xs text-primary-foreground/70">Online • Ready to help</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSettingsOpen(true)}
                  className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearChat}
                  className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex gap-2", message.isBot ? "justify-start" : "justify-end")}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className="max-w-[80%] space-y-2">
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2 text-sm whitespace-pre-line",
                        message.isBot
                          ? "bg-muted text-foreground rounded-tl-none"
                          : "bg-primary text-primary-foreground rounded-tr-none",
                      )}
                    >
                      {message.content}
                    </div>
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="space-y-2">
                        {message.attachments.map((attachment) => (
                          <div key={attachment.id} className="bg-muted/50 rounded-xl p-3 flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              {attachment.type === "image" ? (
                                <ImageIcon className="w-5 h-5 text-primary" />
                              ) : (
                                <FileText className="w-5 h-5 text-primary" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{attachment.type}</p>
                            </div>
                            <a
                              href={attachment.url}
                              download={attachment.name}
                              className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                            >
                              <Download className="w-4 h-4 text-primary" />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                    {chatSettings.showTimestamps && (
                      <p
                        className={cn("text-[10px] text-muted-foreground", message.isBot ? "text-left" : "text-right")}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    )}
                  </div>
                  {!message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-secondary" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-muted/50"
                />
                <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsSettingsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-3xl shadow-2xl border border-border w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Settings Header */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Chatbot Settings</h2>
                  <p className="text-sm text-muted-foreground">Customize responses, files, and appearance</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex border-b border-border">
                <button
                  onClick={() => setSettingsTab("responses")}
                  className={cn(
                    "flex-1 px-4 py-3 text-sm font-medium transition-colors",
                    settingsTab === "responses"
                      ? "text-primary border-b-2 border-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Responses & Files
                </button>
                <button
                  onClick={() => setSettingsTab("appearance")}
                  className={cn(
                    "flex-1 px-4 py-3 text-sm font-medium transition-colors",
                    settingsTab === "appearance"
                      ? "text-primary border-b-2 border-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Palette className="w-4 h-4 inline mr-2" />
                  Appearance
                </button>
              </div>

              {/* Settings Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
                {settingsTab === "responses" ? (
                  <>
                    {/* Add New Response */}
                    <div className="bg-muted/50 rounded-2xl p-4 space-y-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add New Response
                      </h3>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">
                          Trigger Keywords (separated by |)
                        </label>
                        <Input
                          value={newTrigger}
                          onChange={(e) => setNewTrigger(e.target.value)}
                          placeholder="e.g., price|cost|pricing"
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Response</label>
                        <Textarea
                          value={newResponse}
                          onChange={(e) => setNewResponse(e.target.value)}
                          placeholder="Enter the response message..."
                          className="bg-background min-h-[80px]"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Attachments (optional)</label>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
                          onChange={(e) => handleFileUpload(e, false)}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full border-dashed"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Files
                        </Button>
                        {newAttachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {newAttachments.map((attachment) => (
                              <div key={attachment.id} className="flex items-center gap-2 bg-background rounded-lg p-2">
                                {getAttachmentIcon(attachment.type)}
                                <span className="flex-1 text-sm truncate">{attachment.name}</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                  onClick={() => removeAttachment(attachment.id, false)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <Button onClick={handleAddResponse} className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Response
                      </Button>
                    </div>

                    {/* Existing Responses */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Existing Responses</h3>
                      {customResponses.map((item) => (
                        <div key={item.id} className="bg-muted/30 rounded-xl p-4 space-y-3">
                          {editingResponse?.id === item.id ? (
                            <>
                              <Input
                                value={editingResponse.trigger}
                                onChange={(e) => setEditingResponse({ ...editingResponse, trigger: e.target.value })}
                                className="bg-background text-sm"
                              />
                              <Textarea
                                value={editingResponse.response}
                                onChange={(e) => setEditingResponse({ ...editingResponse, response: e.target.value })}
                                className="bg-background text-sm min-h-[80px]"
                              />

                              <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">Attachments</label>
                                <input
                                  ref={editFileInputRef}
                                  type="file"
                                  multiple
                                  accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
                                  onChange={(e) => handleFileUpload(e, true)}
                                  className="hidden"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => editFileInputRef.current?.click()}
                                  className="border-dashed mb-2"
                                >
                                  <Upload className="w-3 h-3 mr-1" />
                                  Add Files
                                </Button>
                                {editingAttachments.length > 0 && (
                                  <div className="space-y-2">
                                    {editingAttachments.map((attachment) => (
                                      <div
                                        key={attachment.id}
                                        className="flex items-center gap-2 bg-background rounded-lg p-2"
                                      >
                                        {getAttachmentIcon(attachment.type)}
                                        <span className="flex-1 text-sm truncate">{attachment.name}</span>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                          onClick={() => removeAttachment(attachment.id, true)}
                                        >
                                          <X className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleUpdateResponse(
                                      editingResponse.id,
                                      editingResponse.trigger,
                                      editingResponse.response,
                                    )
                                  }
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingResponse(null)
                                    setEditingAttachments([])
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-primary mb-1">Triggers: {item.trigger}</p>
                                  <p className="text-sm text-foreground whitespace-pre-line line-clamp-3">
                                    {item.response}
                                  </p>
                                  {item.attachments && item.attachments.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                      {item.attachments.map((att) => (
                                        <span
                                          key={att.id}
                                          className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                        >
                                          {getAttachmentIcon(att.type)}
                                          {att.name}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="ghost" onClick={() => startEditing(item)}>
                                    Edit
                                  </Button>
                                  {item.trigger !== "default" && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="text-destructive hover:text-destructive"
                                      onClick={() => handleDeleteResponse(item.id)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Appearance settings tab */
                  <div className="space-y-6">
                    <div className="bg-muted/50 rounded-2xl p-4 space-y-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        Bot Identity
                      </h3>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Bot Name</label>
                        <Input
                          value={chatSettings.botName}
                          onChange={(e) => setChatSettings((prev) => ({ ...prev, botName: e.target.value }))}
                          placeholder="e.g., Emeka's Assistant"
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Welcome Message</label>
                        <Textarea
                          value={chatSettings.welcomeMessage}
                          onChange={(e) => setChatSettings((prev) => ({ ...prev, welcomeMessage: e.target.value }))}
                          placeholder="Enter the initial greeting message..."
                          className="bg-background min-h-[80px]"
                        />
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-2xl p-4 space-y-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <ToggleLeft className="w-4 h-4" />
                        Display Options
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">Show Timestamps</p>
                          <p className="text-xs text-muted-foreground">Display time below each message</p>
                        </div>
                        <button
                          onClick={() => setChatSettings((prev) => ({ ...prev, showTimestamps: !prev.showTimestamps }))}
                          className={cn(
                            "relative w-12 h-6 rounded-full transition-colors",
                            chatSettings.showTimestamps ? "bg-primary" : "bg-muted",
                          )}
                        >
                          <span
                            className={cn(
                              "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                              chatSettings.showTimestamps && "translate-x-6",
                            )}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-2xl p-4">
                      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                        <Palette className="w-4 h-4" />
                        Quick Tips
                      </h3>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• Use | to separate multiple trigger keywords</li>
                        <li>• Upload PDFs, images, or documents to share with visitors</li>
                        <li>• The "default" trigger catches unmatched queries</li>
                        <li>• Keep responses concise and helpful</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
