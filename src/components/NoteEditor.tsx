import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface NoteEditorProps {
  onSave: (note: { title: string; content: string }) => void;
  onClose: () => void;
  initialNote?: { title: string; content: string };
}

export const NoteEditor = ({ onSave, onClose, initialNote }: NoteEditorProps) => {
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-note-400 transition-colors hover:bg-note-100 hover:text-note-600"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="text-lg font-semibold"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
            className="min-h-[200px] resize-none"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => onSave({ title, content })}>Save Note</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};