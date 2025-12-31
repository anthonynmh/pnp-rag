import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Eye, EyeOff, Target, Users, Lightbulb, FileText, AlertCircle, Zap, Wand2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  augmentedPrompt?: string;
}

interface ChatInterfaceProps {
  selectedRole: string;
  selectedTone: string;
  selectedFormat: string;
  advancedMode: boolean;
  onRoleChange: (role: string) => void;
  onToneChange: (tone: string) => void;
  onFormatChange: (format: string) => void;
  onAdvancedModeChange: (enabled: boolean) => void;
}

export function ChatInterface({ 
  selectedRole, 
  selectedTone, 
  selectedFormat,
  advancedMode,
  onRoleChange,
  onToneChange,
  onFormatChange,
  onAdvancedModeChange,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [showAugmentedPrompt, setShowAugmentedPrompt] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Advanced mode fields
  const [advTask, setAdvTask] = useState("");
  const [advContext, setAdvContext] = useState("");
  const [advAudience, setAdvAudience] = useState("");
  const [advExamples, setAdvExamples] = useState("");
  const [advFormat, setAdvFormat] = useState("");
  const [advConstraints, setAdvConstraints] = useState("");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const generateAugmentedPrompt = (userPrompt: string) => {
    const roleInstructions = {
      teacher: "You are a patient and knowledgeable teacher. Break down complex concepts into easy-to-understand explanations.",
      therapist: "You are an empathetic and supportive therapist. Listen carefully and provide thoughtful, compassionate guidance.",
      coworker: "You are an experienced and helpful co-worker. Provide professional advice and collaborative solutions.",
      coach: "You are a motivational life coach. Inspire action and help set achievable goals.",
      consultant: "You are a strategic business consultant. Provide analytical insights and actionable recommendations.",
    };

    const toneInstructions = {
      friendly: "Use a warm and approachable tone.",
      professional: "Maintain a professional and polished tone.",
      casual: "Keep the conversation relaxed and informal.",
      formal: "Use formal language and structured responses.",
      enthusiastic: "Be energetic and enthusiastic in your responses.",
    };

    const formatInstructions = {
      conversational: "Respond in a natural, conversational manner.",
      detailed: "Provide comprehensive, detailed explanations with examples.",
      concise: "Keep responses brief and to the point.",
      stepByStep: "Break down your response into clear, numbered steps.",
      bulletPoints: "Organize your response using bullet points for clarity.",
    };

    let prompt = `${roleInstructions[selectedRole as keyof typeof roleInstructions]}

${toneInstructions[selectedTone as keyof typeof toneInstructions]}
${formatInstructions[selectedFormat as keyof typeof formatInstructions]}`;

    // Add advanced prompt elements if provided (either from props or local state in advanced mode)
    const task = advancedMode ? advTask : "";
    const ctx = advancedMode ? advContext : "";
    const aud = advancedMode ? advAudience : "";
    const ex = advancedMode ? advExamples : "";
    const fmt = advancedMode ? advFormat : "";
    const cons = advancedMode ? advConstraints : "";
    
    if (task) {
      prompt += `\n\nTask: ${task}`;
    }
    
    if (ctx) {
      prompt += `\n\nContext: ${ctx}`;
    }
    
    if (aud) {
      prompt += `\n\nTarget Audience: ${aud}`;
    }
    
    if (ex) {
      prompt += `\n\nExample(s) of desired output:\n${ex}`;
    }
    
    if (fmt) {
      prompt += `\n\nOutput Format: ${fmt}`;
    }
    
    if (cons) {
      prompt += `\n\nConstraints/Rules: ${cons}`;
    }

    prompt += `\n\nUser's question: ${userPrompt}`;
    
    return prompt;
  };

  const generateMockResponse = (userPrompt: string, augmentedPrompt: string): string => {
    // Simulate different responses based on role and settings
    const prompt = userPrompt.toLowerCase();
    
    if (selectedRole === "teacher") {
      if (selectedFormat === "stepByStep") {
        return "Let me break this down for you step by step:\n\n1. First, understand the core concept\n2. Then, identify the key components\n3. Practice with simple examples\n4. Finally, apply it to more complex scenarios\n\nWould you like me to elaborate on any of these steps?";
      }
      return "That's a great question! Let me explain this in a way that's easy to understand. Think of it like learning to ride a bike - you start with the basics and build up from there. The key is to practice consistently and don't be afraid to make mistakes along the way.";
    }
    
    if (selectedRole === "therapist") {
      return "I hear what you're saying, and it's completely valid to feel that way. Many people experience similar challenges. Let's explore this together. What matters most is that you're taking the time to reflect on this. How does that sit with you?";
    }
    
    if (selectedRole === "coworker") {
      if (selectedFormat === "bulletPoints") {
        return "Here's how I'd approach this:\n\n• Start by gathering all relevant information\n• Consult with the team for their input\n• Create a timeline with clear milestones\n• Review and adjust as needed\n\nHappy to discuss any of these points further!";
      }
      return "Good thinking on bringing this up! From my experience, the best approach is to collaborate with the team early on. I've seen similar situations before, and what worked well was being proactive with communication. Let me know if you'd like to brainstorm some solutions together.";
    }
    
    if (selectedRole === "coach") {
      return "I love your energy around this! This is exactly the kind of mindset that leads to real growth. Let's set some concrete goals and create an action plan. Remember, every expert was once a beginner. What's the first small step you can take today to move forward?";
    }
    
    if (selectedRole === "consultant") {
      if (selectedFormat === "detailed") {
        return "Based on the information provided, here's a comprehensive analysis:\n\nThe current situation presents both challenges and opportunities. From a strategic perspective, we need to consider market dynamics, resource allocation, and long-term sustainability. The data suggests that implementing a phased approach would minimize risk while maximizing potential returns. I recommend conducting a thorough cost-benefit analysis before proceeding.";
      }
      return "From a strategic standpoint, this requires careful analysis. I'd recommend evaluating the ROI, considering market trends, and assessing potential risks. The key is to align this with your overall business objectives and ensure you have the resources to execute effectively.";
    }
    
    return "Thank you for your question. I'm here to help you with that. Based on what you've shared, I can provide guidance tailored to your needs.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const augmentedPrompt = generateAugmentedPrompt(input);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      augmentedPrompt,
    };

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: generateMockResponse(input, augmentedPrompt),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
    
    // Clear advanced fields after sending in advanced mode
    if (advancedMode) {
      setAdvTask("");
      setAdvContext("");
      setAdvAudience("");
      setAdvExamples("");
      setAdvFormat("");
      setAdvConstraints("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="p-6 h-full flex flex-col">
      {/* Mode Toggle */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b">
        <div className="flex items-center gap-3">
          <Button
            variant={!advancedMode ? "default" : "outline"}
            size="sm"
            onClick={() => onAdvancedModeChange(false)}
            className="gap-2"
          >
            <Zap className="w-4 h-4" />
            Quick Start
          </Button>
          <Button
            variant={advancedMode ? "default" : "outline"}
            size="sm"
            onClick={() => onAdvancedModeChange(true)}
            className="gap-2"
          >
            <Wand2 className="w-4 h-4" />
            Advanced Mode
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAugmentedPrompt(!showAugmentedPrompt)}
        >
          {showAugmentedPrompt ? (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Hide Prompts
            </>
          ) : (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Show Prompts
            </>
          )}
        </Button>
      </div>

      {/* Quick Start Settings - Only show when NOT in advanced mode */}
      {!advancedMode && (
        <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Label className="text-sm whitespace-nowrap">AI Role:</Label>
              <Select value={selectedRole} onValueChange={onRoleChange}>
                <SelectTrigger className="h-9 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="therapist">Therapist</SelectItem>
                  <SelectItem value="coworker">Experienced Co-worker</SelectItem>
                  <SelectItem value="coach">Life Coach</SelectItem>
                  <SelectItem value="consultant">Business Consultant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 flex-1 min-w-[180px]">
              <Label className="text-sm whitespace-nowrap">Tone:</Label>
              <Select value={selectedTone} onValueChange={onToneChange}>
                <SelectTrigger className="h-9 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Label className="text-sm whitespace-nowrap">Format:</Label>
              <Select value={selectedFormat} onValueChange={onFormatChange}>
                <SelectTrigger className="h-9 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conversational">Conversational</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="concise">Concise</SelectItem>
                  <SelectItem value="stepByStep">Step by Step</SelectItem>
                  <SelectItem value="bulletPoints">Bullet Points</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1 pr-4 mb-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Start a conversation with your AI assistant.</p>
              <p className="text-sm mt-2">
                {advancedMode 
                  ? "Fill out the guided fields below to craft a detailed prompt." 
                  : "Your selected settings will enhance the AI's responses."}
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  
                  {message.role === "user" && showAugmentedPrompt && message.augmentedPrompt && (
                    <div className="mt-3 pt-3 border-t border-blue-400">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs bg-blue-600 text-white">
                          Augmented Prompt
                        </Badge>
                      </div>
                      <div className="text-xs opacity-90 whitespace-pre-wrap font-mono bg-blue-600 p-2 rounded">
                        {message.augmentedPrompt}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {advancedMode ? (
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              💡 Fill out the guided questions below to build a comprehensive prompt
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                <Label htmlFor="adv-task" className="text-sm">
                  What do you want the AI to do?
                </Label>
              </div>
              <Textarea
                id="adv-task"
                value={advTask}
                onChange={(e) => setAdvTask(e.target.value)}
                placeholder="Describe the specific task... (e.g., 'Write a professional email to request a meeting')"
                className="min-h-[60px] text-sm"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <Label htmlFor="adv-context" className="text-sm">
                  Any background information?
                </Label>
              </div>
              <Textarea
                id="adv-context"
                value={advContext}
                onChange={(e) => setAdvContext(e.target.value)}
                placeholder="Provide relevant context... (e.g., 'Launching a new product next month')"
                className="min-h-[60px] text-sm"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                <Label htmlFor="adv-audience" className="text-sm">
                  Who is this for?
                </Label>
              </div>
              <Input
                id="adv-audience"
                value={advAudience}
                onChange={(e) => setAdvAudience(e.target.value)}
                placeholder="Target audience... (e.g., 'Business executives')"
                className="text-sm"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-green-500" />
                <Label htmlFor="adv-examples" className="text-sm">
                  Show an example of what you want
                </Label>
              </div>
              <Textarea
                id="adv-examples"
                value={advExamples}
                onChange={(e) => setAdvExamples(e.target.value)}
                placeholder="Provide example(s)... (e.g., 'Dear [Name], I hope this email finds you well...')"
                className="min-h-[60px] text-sm"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                <Label htmlFor="adv-format" className="text-sm">
                  How should the output look?
                </Label>
              </div>
              <Input
                id="adv-format"
                value={advFormat}
                onChange={(e) => setAdvFormat(e.target.value)}
                placeholder="Desired format... (e.g., '3 paragraphs', 'bullet points')"
                className="text-sm"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <Label htmlFor="adv-constraints" className="text-sm">
                  Any rules or things to avoid?
                </Label>
              </div>
              <Textarea
                id="adv-constraints"
                value={advConstraints}
                onChange={(e) => setAdvConstraints(e.target.value)}
                placeholder="Constraints... (e.g., 'Keep it under 200 words, avoid jargon')"
                className="min-h-[60px] text-sm"
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="adv-message" className="text-sm">
                Your message
              </Label>
              <Textarea
                id="adv-message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                className="min-h-[80px]"
              />
            </div>
          </div>

          <Button onClick={handleSend} disabled={!input.trim()} className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="min-h-[60px] resize-none"
          />
          <Button onClick={handleSend} disabled={!input.trim()} className="self-end">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      )}
    </Card>
  );
}