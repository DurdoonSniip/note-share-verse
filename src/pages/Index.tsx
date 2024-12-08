import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NoteCard } from "@/components/NoteCard";
import { NoteEditor } from "@/components/NoteEditor";
import { toast } from "sonner";

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleSaveNote = ({ title, content }: { title: string; content: string }) => {
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toLocaleDateString(),
    };
    setNotes([newNote, ...notes]);
    setIsEditorOpen(false);
    toast.success("Note created successfully");
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    toast.success("Note deleted successfully");
  };

  const handleShareNote = (note: Note) => {
    // In a real app, this would open a sharing dialog
    toast.success(`Sharing "${note.title}"`);
  };

  return (
    <div className="min-h-screen bg-note-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-note-900">My Notes</h1>
            <p className="text-note-500">Capture your thoughts and ideas</p>
          </div>
          <Button onClick={() => setIsEditorOpen(true)} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            New Note
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence>
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                content={note.content}
                date={note.date}
                onDelete={() => handleDeleteNote(note.id)}
                onShare={() => handleShareNote(note)}
              />
            ))}
          </AnimatePresence>
        </div>

        {notes.length === 0 && (
          <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-note-200 bg-white">
            <div className="text-center">
              <h3 className="mb-1 font-semibold text-note-900">No notes yet</h3>
              <p className="text-sm text-note-500">
                Click the button above to create your first note
              </p>
            </div>
          </div>
        )}

        <AnimatePresence>
          {isEditorOpen && (
            <NoteEditor
              onSave={handleSaveNote}
              onClose={() => setIsEditorOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;