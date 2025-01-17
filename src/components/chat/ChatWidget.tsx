import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Send, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { handleChatMessage } from "@/api/chat";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      setIsLoading(true);
      const userMessage: Message = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      const response = await handleChatMessage(input);
      const assistantMessage: Message = { role: "assistant", content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-96 h-[600px] glass-panel rounded-lg flex flex-col overflow-hidden animate-fade-up">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-purple-500/50 to-blue-900/50">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-300" />
              <span className="font-semibold text-white">Future Pulse AI</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.role === "user"
                    ? "bg-purple-500/20 ml-auto"
                    : "bg-blue-900/20 mr-auto"
                )}
              >
                {message.content}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10 bg-gradient-to-r from-purple-500/10 to-blue-900/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border-white/10 focus:border-purple-500/50"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-500 to-blue-900 hover:from-purple-600 hover:to-blue-800"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setIsOpen(true)}
                className="rounded-full w-14 h-14 animate-fade-up bg-gradient-to-r from-purple-500 to-blue-900 hover:from-purple-600 hover:to-blue-800"
              >
                <Brain className="w-6 h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-gradient-to-r from-purple-500 to-blue-900 text-white border-none">
              <p>Do You Have Any Doubt?</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}