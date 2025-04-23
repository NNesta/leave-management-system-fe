import { useState } from "react";
import { FileText, FileImage, FileVideo, Paperclip, Files } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export interface Document {
  id: string;
  fileName: string;
  fileType: "image" | "pdf" | "doc" | "video" | "other";
  url: string;
}

interface SupportingDocumentProps {
  documents: Document[];
}

export const SupportingDocument = ({ documents }: SupportingDocumentProps) => {
  const [expandedDoc, setExpandedDoc] = useState<Document | null>(null);

  const getIcon = (type: string) => {
    if (type.includes("image")) {
      return <FileImage className="h-5 w-5 text-blue-500" />;
    } else if (type.includes("pdf")) {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else if (type.includes("doc") || type.includes("word")) {
      return <FileText className="h-5 w-5 text-blue-600" />;
    } else if (type.includes("video")) {
      return <FileVideo className="h-5 w-5 text-purple-500" />;
    } else {
      return <Files className="h-5 w-5 text-gray-500" />;
    }
  };

  const renderDocumentContent = (doc: Document) => {
    if (doc.fileType.includes("image")) {
      return (
        <img
          src={doc.url}
          alt={doc.fileName}
          className="max-h-[80vh] max-w-full object-contain"
        />
      );
    } else if (doc.fileType.includes("pdf")) {
      return (
        <iframe
          src={doc.url}
          className="w-full h-[80vh]"
          title={doc.fileName}
        />
      );
    } else if (doc.fileType.includes("video")) {
      return (
        <video src={doc.url} controls className="max-h-[80vh] max-w-full" />
      );
    } else {
      // For other document types, provide a download link
      return (
        <div className="flex flex-col items-center justify-center p-10">
          {getIcon(doc.fileType)}
          <p className="mt-4 mb-6 text-lg font-medium">{doc.fileName}</p>
          <a
            href={doc.url}
            download
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Download Document
          </a>
        </div>
      );
    }
  };

  return (
    <div>
      {documents.length === 0 ? (
        <p className="p-3 bg-gray-50 rounded-md text-gray-500 italic">
          No supporting documents provided
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {documents.map((doc) => (
            <Dialog key={doc.id}>
              <DialogTrigger asChild>
                <div
                  className="p-3 bg-gray-50 hover:bg-gray-100 rounded-md flex flex-col items-center justify-center cursor-pointer transition-colors border border-gray-200"
                  onClick={() => setExpandedDoc(doc)}
                >
                  {getIcon(doc.fileType)}
                  <p className="text-sm mt-2 text-center truncate w-full">
                    {doc.fileName}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-4">{doc.fileName}</h3>
                  <div className="flex justify-center">
                    {renderDocumentContent(doc)}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
};
