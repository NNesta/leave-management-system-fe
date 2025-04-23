import { useState } from "react";
import { Upload, FileText, FileImage, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DocumentUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
}

export const DocumentUpload = ({
  onFilesChange,
  maxFiles = 5,
}: DocumentUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) {
      return <FileImage className="h-5 w-5 text-blue-500" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="file"
          id="documents"
          className="hidden"
          multiple
          onChange={handleFileChange}
          accept="image/*,application/pdf,.doc,.docx"
        />
        <Label
          htmlFor="documents"
          className="cursor-pointer flex items-center justify-center border border-dashed rounded-md p-4 w-full hover:bg-gray-50"
        >
          <Upload className="h-5 w-5 mr-2 text-gray-500" />
          <span className="text-gray-600">
            Upload documents (max {maxFiles} files)
          </span>
        </Label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
            >
              <div className="flex items-center space-x-2">
                {getFileIcon(file.type)}
                <span className="text-sm truncate max-w-[200px]">
                  {file.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
