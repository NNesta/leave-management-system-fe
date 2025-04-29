import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

type DocumentUploadProps = {
  form: UseFormReturn<
    {
      leaveTypeId?: string;
      isHalfDay?: boolean;
      startDate?: Date;
      endDate?: Date;
      leaveReason?: string;
      supportingDocuments?: File[];
    },
    unknown,
    undefined
  >;
  maxFiles: number;
};

export const DocumentUpload = ({ form, maxFiles }: DocumentUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    onChange: (files: File[]) => void
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const currentFiles = form.getValues("supportingDocuments") || [];

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);

      if (currentFiles.length + newFiles.length > maxFiles) {
        toast.error(`You can only upload up to ${maxFiles} files.`);
        return;
      }

      onChange([...currentFiles, ...newFiles]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (files: File[]) => void
  ) => {
    e.preventDefault();

    const currentFiles = form.getValues("supportingDocuments") || [];

    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      if (currentFiles.length + newFiles.length > maxFiles) {
        toast.error(`You can only upload up to ${maxFiles} files.`);
        return;
      }

      onChange([...currentFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number, onChange: (files: File[]) => void) => {
    const files = form.getValues("supportingDocuments") || [];
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  return (
    <FormField
      control={form.control}
      name="supportingDocuments"
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem>
          <FormLabel>Supporting Documents (optional)</FormLabel>
          <FormControl>
            <div
              className={cn(
                "border-2 border-dashed rounded-md p-6 transition-colors",
                dragActive ? "border-primary bg-primary/5" : "border-input"
              )}
              onDragEnter={(e) => handleDrag(e)}
              onDragOver={(e) => handleDrag(e)}
              onDragLeave={(e) => handleDrag(e)}
              onDrop={(e) => handleDrop(e, onChange)}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop files here, or click to select files
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  (Maximum {maxFiles} files)
                </p>
                <input
                  id="fileInput"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleChange(e, onChange)}
                  {...rest}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  Select Files
                </Button>
              </div>
            </div>
          </FormControl>

          {value && value.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">Uploaded Files:</p>
              <ul className="space-y-2">
                {value.map((file: File, index: number) => (
                  <li
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between p-2 bg-muted rounded-md text-sm"
                  >
                    <span className="truncate max-w-[80%]">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => removeFile(index, onChange)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
