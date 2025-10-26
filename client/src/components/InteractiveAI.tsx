import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Mic, MicOff, Send, Sparkles } from "lucide-react";
import HolographicCard from "@/components/ui/holographic-card";
import { Input } from "@/components/ui/input";
import ParticleButton from "./ParticleButton";
import GlowText from "./ui/glow-text";
import { getResponse } from "@/data/ai-responses";

interface Message {
  role: "ai" | "user";
  content: string;
  isTyping?: boolean;
}

export default function InteractiveAI() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Experience the future of business automation through AI" }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Speech recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;

        if (event.results[current].isFinal) {
          handleUserInput(transcriptText);
          setIsListening(false);
          if (audioContextRef.current) {
            audioContextRef.current.close();
          }
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Audio visualization setup
  const startAudioLevel = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateLevel = () => {
        if (analyserRef.current && isListening) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average);
          requestAnimationFrame(updateLevel);
        }
      };
      updateLevel();
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  // Auto-scroll messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserInput = async (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    // Get AI response
    const response = getResponse(text);
    await simulateTyping(response);
    setIsProcessing(false);
  };

  const toggleListening = async () => {
    if (isListening) {
      setIsListening(false);
      recognitionRef.current?.stop();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    } else {
      setIsListening(true);
      await startAudioLevel();
      recognitionRef.current?.start();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserInput(input);
  };

  // Simulate AI response with typing effect
  const simulateTyping = async (response: string) => {
    const words = response.split(" ");
    let currentText = "";
    
    setMessages(prev => [...prev, { role: "ai", content: "", isTyping: true }]);
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? " " : "") + words[i];
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: "ai", content: currentText, isTyping: true }
      ]);
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 50));
    }
    
    setMessages(prev => [
      ...prev.slice(0, -1),
      { role: "ai", content: response, isTyping: false }
    ]);
    
    setMessages(prev => [...prev, { role: "ai", content: "", isTyping: true }]);

    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? "" : " ") + words[i];
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: "ai", content: currentText, isTyping: true }
      ]);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setMessages(prev => [
      ...prev.slice(0, -1),
      { role: "ai", content: currentText, isTyping: false }
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    handleUserInput(input);
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background-secondary opacity-90" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism mb-6"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-primary">Neural Processing Active</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
            <GlowText highlight>Talk to Our AI</GlowText>
          </h2>
          <p className="text-xl text-text-muted">
            Experience the future of business automation through voice or chat
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <HolographicCard className="overflow-hidden">
            {/* AI Assistant Header */}
            <div className="bg-gradient-primary p-6 border-b border-primary/20">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  {isProcessing && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-white">APEX AI Assistant</div>
                  <div className="text-xs text-white/70 flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    Neural Network Active
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-4 glassmorphism">
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        msg.role === "user"
                          ? "bg-gradient-primary text-white"
                          : "glassmorphism border border-primary/20"
                      }`}
                    >
                      {msg.content}
                      {msg.isTyping && (
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                        >
                          ▋
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-primary/20 glassmorphism">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <ParticleButton
                  icon={isListening ? MicOff : Mic}
                  onClick={toggleListening}
                  variant={isListening ? "primary" : "outline"}
                  type="button"
                >
                  {isListening ? "Stop" : "Speak"}
                </ParticleButton>
                
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isListening || isProcessing}
                    className="w-full pr-12"
                  />
                  {isListening && (
                    <motion.div
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      animate={{
                        height: [4, Math.max(4, audioLevel / 2), 4],
                      }}
                      transition={{
                        duration: 0.1,
                        ease: "linear",
                      }}
                    >
                      <div className="w-1 bg-primary rounded" style={{ height: '100%' }} />
                    </motion.div>
                  )}
                </div>

                <ParticleButton
                  icon={Send}
                  onClick={handleSend}
                  disabled={!input.trim() || isProcessing || isListening}
                  type="submit"
                >
                  Send
                </ParticleButton>
              </form>
            </div>
          </HolographicCard>
        </div>
      </div>
    </section>
                  {isListening ? "Stop" : "Voice"}
                </ParticleButton>

                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/5 border-primary/20 focus:border-primary/50"
                  disabled={isListening}
                />

                <ParticleButton
                  icon={Send}
                  onClick={handleSend}
                  disabled={!input.trim() || isListening}
                >
                  Send
                </ParticleButton>
              </div>

              {/* Voice Visualization */}
              {isListening && (
                <motion.div 
                  className="mt-4 h-8 flex items-center justify-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-primary"
                      animate={{
                        height: [4, Math.max(4, (audioLevel / 255) * 32), 4],
                      }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.05,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </HolographicCard>
        </div>
      </div>
    </section>
  );
}