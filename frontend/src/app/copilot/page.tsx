"use client";

import AppShell from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchCopilotResponse, CopilotMessage } from "@/lib/api";
import { Send, Bot, User, Sparkles, Shield, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const suggestedPrompts = [
  "Show failed logins in last 24 hours",
  "Analyze suspicious IP 185.220.101.34",
  "Explain the latest malware detection",
  "Generate executive incident report",
  "Check compliance status for SOC2",
  "Show MITRE ATT&CK coverage gaps",
];

export default function CopilotPage() {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      role: 'assistant',
      content: `## 🛡️ Welcome to SentinelAI Security Copilot\n\nI'm your AI-powered security analyst. I can help you with:\n\n- **Threat Hunting** — Search and analyze indicators of compromise\n- **Log Analysis** — Investigate authentication logs, network traffic\n- **Vulnerability Assessment** — Explain CVEs and recommend patches\n- **Incident Reports** — Generate executive and technical reports\n- **MITRE ATT&CK** — Map threats to the framework\n\nWhat would you like to investigate?`,
      timestamp: new Date(),
      suggestedActions: suggestedPrompts,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(text?: string) {
    const msg = text || input.trim();
    if (!msg || isLoading) return;
    setInput("");

    const userMessage: CopilotMessage = { role: 'user', content: msg, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const result = await fetchCopilotResponse(msg);
      const aiMessage: CopilotMessage = {
        role: 'assistant',
        content: result.response,
        timestamp: new Date(),
        suggestedActions: result.suggestedActions,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'An error occurred. Please try again.', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <AppShell>
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 md:px-6 py-3 border-b border-border bg-background/60 backdrop-blur-sm shrink-0">
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gradient-cyan">Security Copilot</h1>
            <p className="text-[10px] text-muted-foreground">AI-Powered Security Analyst • Gemini 2.5</p>
          </div>
          <Badge variant="outline" className="ml-auto text-xs text-emerald-400 border-emerald-500/30">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />Online
          </Badge>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 md:px-6">
          <div className="max-w-4xl mx-auto py-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className={`max-w-[85%] rounded-xl px-4 py-3 text-sm ${
                  msg.role === 'user' ? 'chat-message-user' : 'chat-message-ai'
                }`}>
                  <div className="markdown-content whitespace-pre-wrap" dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/`([^`]+)`/g, '<code>$1</code>')
                      .replace(/^- (.*$)/gm, '<li>$1</li>')
                      .replace(/^(\d+)\. (.*$)/gm, '<li>$1. $2</li>')
                      .replace(/\n\n/g, '<br/><br/>')
                      .replace(/\|(.+)\|/g, (match) => {
                        const cells = match.split('|').filter(Boolean).map(c => c.trim());
                        if (cells.every(c => c.match(/^[-|]+$/))) return '';
                        return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
                      })
                  }} />
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/30">
                      {msg.suggestedActions.map((action, j) => (
                        <Button key={j} variant="outline" size="sm" className="text-xs h-7" onClick={() => handleSend(action)}>
                          {action}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="chat-message-ai rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Suggested prompts */}
        {messages.length <= 1 && (
          <div className="px-4 md:px-6 pb-2 shrink-0">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs text-muted-foreground mb-2">Suggested queries:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt, i) => (
                  <Button key={i} variant="outline" size="sm" className="text-xs h-8" onClick={() => handleSend(prompt)}>
                    <Shield className="w-3 h-3 mr-1.5" />{prompt}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-4 md:px-6 py-3 border-t border-border bg-background/80 backdrop-blur-sm shrink-0">
          <div className="max-w-4xl mx-auto flex gap-2">
            <Textarea
              placeholder="Ask about threats, investigate IOCs, generate reports..."
              className="min-h-[44px] max-h-[120px] resize-none bg-card border-border"
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="h-[44px] w-[44px] shrink-0 bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
