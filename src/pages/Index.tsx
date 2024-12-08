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
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleSaveNote = ({ title, content }: { title: string; content: string }) => {
    if (editingNote) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...note, title, content, date: new Date().toLocaleDateString() }
          : note
      ));
      setEditingNote(null);
      toast.success("Note updated successfully");
    } else {
      // Create new note
      const newNote = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toLocaleDateString(),
      };
      setNotes([newNote, ...notes]);
      toast.success("Note created successfully");
    }
    setIsEditorOpen(false);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    toast.success("Note deleted successfully");
  };

  const handleShareNote = (note: Note) => {
    // Generate a shareable URL for the note
    const shareableUrl = `${window.location.origin}/notes/${note.id}`;
    
    // Copy the URL to clipboard
    navigator.clipboard.writeText(shareableUrl)
      .then(() => {
        toast.success("Link copied to clipboard!", {
          description: "Share this link with others to let them view your note.",
        });
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  return (
    <div className="min-h-screen bg-note-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-note-900">My Notes</h1>
            <p className="text-note-500">Capture your thoughts and ideas</p>
          </div>
          <Button onClick={() => {
            setEditingNote(null);
            setIsEditorOpen(true);
          }} size="lg">
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
                onClick={() => handleEditNote(note)}
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
              onClose={() => {
                setIsEditorOpen(false);
                setEditingNote(null);
              }}
              initialNote={editingNote || undefined}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;