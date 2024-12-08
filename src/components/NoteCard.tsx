import { motion } from "framer-motion";
import { Share2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface NoteCardProps {
  title: string;
  content: string;
  date: string;
  onShare?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

export const NoteCard = ({
  title,
  content,
  date,
  onShare,
  onDelete,
  onClick,
}: NoteCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-note-200",
        "bg-white p-6 shadow-sm transition-all duration-200",
        "hover:border-note-300 hover:shadow-md",
        "cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-note-900 line-clamp-1">{title}</h3>
          <div className="flex items-center space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare?.();
              }}
              className="rounded-full p-2 text-note-500 transition-colors hover:bg-note-100 hover:text-note-700"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="rounded-full p-2 text-note-500 transition-colors hover:bg-note-100 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-note-600 line-clamp-2">{content}</p>
        <p className="text-xs text-note-400">{date}</p>
      </div>
    </motion.div>
  );
};