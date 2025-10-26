import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FloatingMetrics from "@/components/FloatingMetrics";
import AIChat from "@/components/AIChat";
import PowerStatement from "@/components/PowerStatement";
import ServicesArsenal from "@/components/ServicesArsenal";
import SocialProof from "@/components/SocialProof";
import Comparison from "@/components/Comparison";
import FinalCTA from "@/components/FinalCTA";
import NeuralBackground from "@/components/NeuralBackground";
import CustomCursor from "@/components/CustomCursor";
import VoiceAgent from "@/components/VoiceAgent";
import ROICalculator from "@/components/ROICalculator";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Send, MicOff } from "lucide-react";
import { sendToWebhook } from "@/services/webhookService";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function Home() {
  const { toast } = useToast();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; content: string }>>([]);
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const recognition = useRef<any>(null);

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new (window as any).webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setInput(transcript);
      };
    }
  }, []);

  const showError = (message: string) => {
    toast({
      variant: "destructive",
      title: "Error",
      description: message,
    });
  };

  const toggleVoice = () => {
    if (!recognition.current) {
      showError("Speech recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (input) {
      setInput(input);
    }
  }, [input]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendToWebhook(userMessage, false);
      setMessages(prev => [...prev, { type: 'ai', content: response.response }]);
      
      // Handle additional actions from n8n if needed
      if (response.action) {
        handleWebhookAction(response.action, response.metadata);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWebhookAction = (action: string, metadata: any) => {
    // Handle different actions from n8n
    switch (action) {
      case 'play_audio':
        // Handle audio playback
        break;
      case 'show_image':
        // Handle image display
        break;
      // Add more action handlers as needed
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background cursor-none">
        <NeuralBackground />
        <CustomCursor />
        <Navigation />
        <Hero />
        <FloatingMetrics />
        <VoiceAgent />
        <AIChat />
        <PowerStatement />
        <ServicesArsenal />
        <SocialProof />
        <ROICalculator />
        <Comparison />
        <FinalCTA />
        <div className="container mx-auto max-w-4xl p-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-red-500">
                Talk to Our AI
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Experience the future of business automation through chat and voice
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] mb-4 overflow-y-auto p-4 rounded-lg bg-muted">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      msg.type === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-red-500 text-white'
                          : 'bg-secondary'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={toggleVoice}
                  className={isListening ? 'bg-red-500 text-white' : ''}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  disabled={isLoading}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </>
  );
}
