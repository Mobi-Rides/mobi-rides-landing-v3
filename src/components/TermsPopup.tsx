import React from "react";
import ReactMarkdown from "react-markdown";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface TermsPopupProps {
  markdown: string;
  triggerLabel?: string;
}

const TermsPopup: React.FC<TermsPopupProps> = ({ markdown, triggerLabel = "View Terms & Conditions" }) => (
  <Dialog>
    <DialogTrigger asChild>
      <button className="underline text-blue-600 hover:text-blue-800 cursor-pointer">
        {triggerLabel}
      </button>
    </DialogTrigger>
    <DialogContent className="max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Terms & Conditions</DialogTitle>
      </DialogHeader>
      <div className="prose max-w-none">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </DialogContent>
  </Dialog>
);

export default TermsPopup;
