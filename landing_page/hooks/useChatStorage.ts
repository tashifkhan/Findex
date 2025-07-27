import { useState, useEffect, useCallback } from 'react'

export interface Message {
  id: string
  sender: 'user' | 'ai'
  content: string
  timestamp: Date
  agent?: string
  url?: string
}

export interface ChatThread {
  id: string
  title: string
  messages: Message[]
  lastMessage: string
  timestamp: Date
  messageCount: number
}

export interface Settings {
  agent: string
  provider: string
  model: string
  url?: string
  apiKeys: {
    openai?: string
    gemini?: string
    claude?: string
    ollama?: string
    deepseek?: string
    openrouter?: string
  }
  endpoints: {
    ollama?: string
    openrouter?: string
  }
}

function generateThreadTitle(firstMessage: string): string {
  const words = firstMessage.trim().split(' ').slice(0, 4)
  return words.join(' ') + (words.length < firstMessage.trim().split(' ').length ? '...' : '')
}

export function useChatStorage() {
  const [threads, setThreads] = useState<ChatThread[]>([])
  const [activeThreadId, setActiveThreadId] = useState<string | undefined>()
  const [settings, setSettings] = useState<Settings>({
    agent: 'react',
    provider: 'openai',
    model: 'gpt-4.1',
    apiKeys: {},
    endpoints: {}
  })

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedThreads = localStorage.getItem('findex-chat-threads')
      const storedActiveId = localStorage.getItem('findex-active-thread')
      const storedSettings = localStorage.getItem('findex-settings')

      if (storedThreads) {
        const parsedThreads = JSON.parse(storedThreads).map((thread: any) => ({
          ...thread,
          timestamp: new Date(thread.timestamp),
          messages: thread.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }))
        setThreads(parsedThreads)
      }

      if (storedActiveId) {
        setActiveThreadId(storedActiveId)
      }

      if (storedSettings) {
        setSettings(JSON.parse(storedSettings))
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
    }
  }, [])

  // Save threads to localStorage whenever they change
  useEffect(() => {
    try {
      const serializedThreads = threads.map(thread => ({
        ...thread,
        timestamp: thread.timestamp.toISOString(),
        messages: thread.messages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp.toISOString()
        }))
      }))
      localStorage.setItem('findex-chat-threads', JSON.stringify(serializedThreads))
    } catch (error) {
      console.error('Error saving threads to localStorage:', error)
    }
  }, [threads])

  // Save activeThreadId to localStorage
  useEffect(() => {
    if (activeThreadId) {
      localStorage.setItem('findex-active-thread', activeThreadId)
    }
  }, [activeThreadId])

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('findex-settings', JSON.stringify(settings))
  }, [settings])

  const createNewThread = useCallback((): string => {
    const newThreadId = `thread-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newThread: ChatThread = {
      id: newThreadId,
      title: 'New Chat',
      messages: [],
      lastMessage: '',
      timestamp: new Date(),
      messageCount: 0
    }
    
    setThreads(prev => [newThread, ...prev])
    setActiveThreadId(newThreadId)
    return newThreadId
  }, [])

  const addMessage = useCallback((threadId: string, message: Message) => {
    setThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        const updatedMessages = [...thread.messages, message]
        const isFirstMessage = thread.messages.length === 0
        return {
          ...thread,
          messages: updatedMessages,
          lastMessage: message.content.slice(0, 100),
          timestamp: new Date(),
          messageCount: updatedMessages.length,
          title: isFirstMessage ? generateThreadTitle(message.content) : thread.title,
        }
      }
      return thread
    }))
  }, [])

  const deleteThread = useCallback((threadId: string) => {
    setThreads(prev => prev.filter(thread => thread.id !== threadId))
    if (activeThreadId === threadId) {
      setThreads(prev => {
        const remaining = prev.filter(thread => thread.id !== threadId)
        setActiveThreadId(remaining.length > 0 ? remaining[0].id : undefined)
        return remaining
      })
    }
  }, [activeThreadId])

  const clearCurrentThread = useCallback(() => {
    if (activeThreadId) {
      setThreads(prev => prev.map(thread => {
        if (thread.id === activeThreadId) {
          return {
            ...thread,
            messages: [],
            lastMessage: '',
            messageCount: 0,
            title: 'New Chat'
          }
        }
        return thread
      }))
    }
  }, [activeThreadId])

  const getActiveThread = useCallback(() => {
    return threads.find(thread => thread.id === activeThreadId)
  }, [threads, activeThreadId])

  return {
    threads,
    activeThreadId,
    settings,
    getActiveThread,
    createNewThread,
    addMessage,
    deleteThread,
    clearCurrentThread,
    setActiveThreadId,
    setSettings
  }
}
