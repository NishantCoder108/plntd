import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

const CopyToClipboard = ({ message }: { message: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={handleCopy}
      className="flex items-center  justify-center cursor-pointer hover:scale-110 transition w-5"
    >
      {copied ? (
        <Check className="w-5 h-5 text-green-500" />
      ) : (
        <Copy className="w-5 h-5" />
      )}
    </Button>
  );
};

export default CopyToClipboard;
