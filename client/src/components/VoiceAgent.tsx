import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Volume2, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function VoiceAgent() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("Hi! I'm your AI voice assistant. Click the microphone to start talking.");
  const [audioLevel, setAudioLevel] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);

        if (event.results[current].isFinal) {
          handleSpeechEnd(transcriptText);
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setTranscript("Sorry, I couldn't hear that. Please try again.");
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

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

  const handleSpeechEnd = async (text: string) => {
    setIsProcessing(true);
    setIsListening(false);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      setAiResponse(data.response || "I can help you automate your business with AI agents. Would you like to learn more?");
    } catch (error) {
      setAiResponse("I can deploy autonomous AI agents that handle your workflows 24/7. Would you like to see a demo?");
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      setAudioLevel(0);
    } else {
      setIsListening(true);
      setTranscript("Listening...");
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
      startAudioLevel();
    }
  };

  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
    }
  }, [isListening]);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Voice Technology</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Talk to Our AI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">Experience the future of business automation through voice</p>
        </div>

        <Card className="max-w-4xl mx-auto border-primary/20 bg-card/50 backdrop-blur-sm p-8">
          <div className="flex flex-col items-center gap-8">
            <div className="relative">
              <Button
                size="icon"
                onClick={toggleListening}
                className={`w-32 h-32 rounded-full transition-all duration-300 ${
                  isListening 
                    ? "bg-primary animate-glow-pulse shadow-[0_0_60px_rgba(239,68,68,0.6)]" 
                    : "bg-gradient-to-r from-primary to-chart-2 hover:shadow-[0_0_40px_rgba(239,68,68,0.4)]"
                }`}
                data-testid="button-voice-toggle"
              >
                {isListening ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
              </Button>
              
              {isListening && (
                <div className="absolute inset-0 -z-10">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 border-primary animate-glow-pulse"
                      style={{
                        animation: `ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {isListening && (
              <div className="flex items-center gap-1">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full transition-all duration-100"
                    style={{
                      height: `${Math.max(4, audioLevel * Math.sin((i + audioLevel) / 5) / 3)}px`,
                    }}
                  />
                ))}
              </div>
            )}

            <div className="w-full space-y-4">
              {transcript && (
                <div className="flex justify-end">
                  <div className="max-w-[70%] bg-primary text-primary-foreground rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Mic className="w-4 h-4" />
                      <span className="text-xs opacity-80">You said:</span>
                    </div>
                    <p>{transcript}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-start">
                <div className="max-w-[70%] bg-muted/50 border border-primary/20 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Volume2 className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">AI Response:</span>
                  </div>
                  <p className="text-sm">{aiResponse}</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Click the microphone and speak naturally. Our AI understands context and can qualify leads instantly.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
