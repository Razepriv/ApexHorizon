import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, Send, Sparkles } from "lucide-react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "I'm APEX AI. Ask me how we can automate your business." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "ai", 
        content: "I can deploy AI agents to handle that in minutes. Let's automate it together." 
      }]);
    }, 1000);
  };

  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">See It In Action</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Talk to Our AI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">Experience the power of autonomous intelligence</p>
        </div>

        <Card className="max-w-3xl mx-auto border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-chart-2/10 p-4 border-b border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold">APEX AI Assistant</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-chart-4 animate-glow-pulse" />
                  Online & Learning
                </div>
              </div>
            </div>
          </div>

          <div className="h-80 overflow-y-auto p-6 space-y-4" data-testid="chat-messages">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] rounded-md p-4 ${
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted/50 border border-primary/20"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-primary/20">
            <div className="flex gap-2">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about AI automation..."
                className="bg-background/50 border-primary/20"
                data-testid="input-chat"
              />
              <Button 
                onClick={handleSend}
                size="icon"
                className="bg-gradient-to-r from-primary to-chart-2"
                data-testid="button-send-chat"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
