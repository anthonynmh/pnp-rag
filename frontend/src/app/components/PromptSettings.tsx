import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Sparkles, Wand2 } from "lucide-react";

interface PromptSettingsProps {
  selectedRole: string;
  selectedTone: string;
  selectedFormat: string;
  advancedMode: boolean;
  onRoleChange: (role: string) => void;
  onToneChange: (tone: string) => void;
  onFormatChange: (format: string) => void;
  onAdvancedModeChange: (enabled: boolean) => void;
}

const roles = [
  { value: "teacher", label: "Teacher", description: "Patient and educational" },
  { value: "therapist", label: "Therapist", description: "Empathetic and supportive" },
  { value: "coworker", label: "Experienced Co-worker", description: "Professional and collaborative" },
  { value: "coach", label: "Life Coach", description: "Motivational and goal-oriented" },
  { value: "consultant", label: "Business Consultant", description: "Strategic and analytical" },
];

const tones = [
  { value: "friendly", label: "Friendly" },
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
  { value: "enthusiastic", label: "Enthusiastic" },
];

const formats = [
  { value: "conversational", label: "Conversational" },
  { value: "detailed", label: "Detailed Explanation" },
  { value: "concise", label: "Concise" },
  { value: "stepByStep", label: "Step-by-Step" },
  { value: "bulletPoints", label: "Bullet Points" },
];

export function PromptSettings({
  selectedRole,
  selectedTone,
  selectedFormat,
  advancedMode,
  onRoleChange,
  onToneChange,
  onFormatChange,
  onAdvancedModeChange,
}: PromptSettingsProps) {
  return (
    <Card className="p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-purple-500" />
        <h2>Prompt Engineering</h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
          <div className="flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-amber-600" />
            <div>
              <Label htmlFor="advanced-mode" className="cursor-pointer">
                Advanced Mode
              </Label>
              <p className="text-xs text-gray-600">Guided prompt building</p>
            </div>
          </div>
          <Switch
            id="advanced-mode"
            checked={advancedMode}
            onCheckedChange={onAdvancedModeChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">AI Role</Label>
          <Select value={selectedRole} onValueChange={onRoleChange}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  <div className="flex flex-col items-start">
                    <span>{role.label}</span>
                    <span className="text-xs text-gray-500">{role.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tone">Tone</Label>
          <Select value={selectedTone} onValueChange={onToneChange}>
            <SelectTrigger id="tone">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {tones.map((tone) => (
                <SelectItem key={tone.value} value={tone.value}>
                  {tone.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="format">Response Format</Label>
          <Select value={selectedFormat} onValueChange={onFormatChange}>
            <SelectTrigger id="format">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              {formats.map((format) => (
                <SelectItem key={format.value} value={format.value}>
                  {format.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4 border-t">
          <div className="space-y-2">
            <Label className="text-xs">Active Settings</Label>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {roles.find((r) => r.value === selectedRole)?.label}
              </Badge>
              <Badge variant="secondary">
                {tones.find((t) => t.value === selectedTone)?.label}
              </Badge>
              <Badge variant="secondary">
                {formats.find((f) => f.value === selectedFormat)?.label}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}