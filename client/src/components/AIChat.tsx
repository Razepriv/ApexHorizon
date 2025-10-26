import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, Send, Sparkles } from "lucide-react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Experience the future of business automation through voice" }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsProcessing(true);
    
    // Simulated AI response with typing effect
    setTimeout(() => {
      setIsProcessing(false);
      const responses = [
        "Let me analyze that for you... \nI can automate this workflow using our advanced neural networks. Would you like to see a demo?",
        "Interesting challenge! Our AI can reduce this process from 40 hours to just 2 hours per week. \nShall I explain how?",
        "I see multiple optimization opportunities here. \nOur neural networks can automate 90% of these tasks, saving you $50,000 annually.",
        "Based on my analysis, we can implement predictive AI to prevent these issues entirely. \nWould you like to see the implementation plan?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: "ai", content: randomResponse }]);
    }, 1500);

  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/5 backdrop-blur-xl mb-6">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-500">AI Active</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Talk to Our AI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">Experience the future of business automation through voice</p>
        </div>

        <Card className="max-w-3xl mx-auto border-red-500/20 bg-black/90 backdrop-blur-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-950/50 to-red-900/30 p-4 border-b border-red-500/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center relative">
                <Bot className="w-6 h-6 text-white" />
                {isProcessing && (
                  <div className="absolute inset-0 rounded-full border-2 border-red-500 border-t-transparent animate-spin"></div>
                )}
              </div>
              <div>
                <div className="font-semibold text-red-500">APEX AI Assistant</div>
                <div className="text-xs text-red-400/70 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-glow-pulse" />
                  Neural Processing Active
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-red-500/20 scrollbar-track-transparent" data-testid="chat-messages">
            {messages.map((msg, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-4 backdrop-blur-xl ${
                    msg.role === "user" 
                      ? "bg-gradient-to-r from-red-500 to-red-700 text-white shadow-glow-red" 
                      : "bg-red-950/30 border border-red-500/20 text-red-100 shadow-glow-red/20"
                  }`}
                >
                  <div className="relative">
                    {msg.role === "ai" && (
                      <div className="absolute -left-6 -top-6">
                        <div className="w-4 h-4 rounded-full bg-red-500/20 animate-glow-pulse"></div>
                      </div>
                    )}
                    {msg.content.split('\n').map((line, i) => (
                      <p key={i} className="leading-relaxed">{line}</p>
                    ))}
                    {msg.role === "ai" && (
                      <div className="absolute -right-2 -bottom-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {isProcessing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex gap-2 px-4 py-2 rounded-lg bg-red-950/30 border border-red-500/20">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-4 border-t border-red-500/20 bg-red-950/30">
            <div className="flex gap-2">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask anything about business automation..."
                className="bg-black/50 border-red-500/20 text-red-100 placeholder:text-red-300/50 focus:border-red-500 transition-colors"
                data-testid="input-chat"
              />
              <Button 
                onClick={handleSend}
                size="icon"
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-all duration-300"
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
}
