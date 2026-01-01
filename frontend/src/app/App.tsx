import { useState } from "react";
import { ChatInterface } from "./components/ChatInterface";
import { Sparkles } from "lucide-react";

export default function App() {
  const [selectedRole, setSelectedRole] = useState("teacher");
  const [selectedTone, setSelectedTone] = useState("friendly");
  const [selectedFormat, setSelectedFormat] = useState("conversational");
  const [advancedMode, setAdvancedMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl">PromptCraft</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Build better AI prompts with ease. Choose Quick Start for simple settings or Advanced Mode for guided prompt engineering.
          </p>
        </div>

        {/* Chat Interface - Full Width */}
        <div className="flex-1 min-h-0">
          <ChatInterface
            selectedRole={selectedRole}
            selectedTone={selectedTone}
            selectedFormat={selectedFormat}
            advancedMode={advancedMode}
            onRoleChange={setSelectedRole}
            onToneChange={setSelectedTone}
            onFormatChange={setSelectedFormat}
            onAdvancedModeChange={setAdvancedMode}
          />
        </div>
      </div>
    </div>
  );
}