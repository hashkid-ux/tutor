import ChatInterface from '../ChatInterface'

export default function ChatInterfaceExample() {
  const messages = [
    {
      id: '1',
      role: 'assistant' as const,
      content: 'Hello! I\'m your AI tutor. What would you like to learn today?',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      role: 'user' as const,
      content: 'Can you explain Newton\'s laws of motion?',
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: '3',
      role: 'assistant' as const,
      content: 'Great question! Let me break down Newton\'s three laws with interactive visualizations...',
      timestamp: new Date(Date.now() - 180000),
      type: 'visualization' as const,
    },
  ]

  return <ChatInterface messages={messages} />
}
