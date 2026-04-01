import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface TermsPopupProps {
  markdown?: string;
  markdownPath?: string;
  title?: string;
  triggerLabel?: string;
  triggerClassName?: string;
}

const TermsPopup: React.FC<TermsPopupProps> = ({
  markdown,
  markdownPath,
  title = "Terms & Conditions",
  triggerLabel = "View Terms & Conditions",
  triggerClassName,
}) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(markdown ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setContent(markdown ?? "");
  }, [markdown]);

  useEffect(() => {
    if (!open || !markdownPath || content) {
      return;
    }

    let isActive = true;
    setIsLoading(true);
    setLoadError(null);

    fetch(markdownPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load terms (${response.status})`);
        }

        return response.text();
      })
      .then((text) => {
        if (isActive) {
          setContent(text);
        }
      })
      .catch((error: unknown) => {
        if (isActive) {
          setLoadError(error instanceof Error ? error.message : "Failed to load terms.");
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [content, markdownPath, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={triggerClassName ?? "underline text-blue-600 hover:text-blue-800 cursor-pointer"}
        >
          {triggerLabel}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading terms...</p>
        ) : loadError ? (
          <p className="text-sm text-red-600">{loadError}</p>
        ) : content ? (
          <div className="prose max-w-none prose-headings:scroll-mt-24">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No terms content is available yet.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TermsPopup;
