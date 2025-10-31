'use client';

import { useState, ChangeEvent } from 'react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Typography } from '@/components/atoms/typography/typography';
import { XCircleIcon, UploadCloudIcon } from 'lucide-react';

interface FileUploadProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  label?: string;
  className?: string;
  controlId?: string;
  accept?: string;
}

export const FileUpload = <T extends FieldValues>({
  field,
  label = 'Upload a client thumbnail (600px x 600px)',
  className,
  controlId = 'clientThumbnail',
  accept = 'image/png, image/jpeg, image/webp'
}: FileUploadProps<T>) => {
  const [fileName, setFileName] = useState<string | null>(
    field.value?.name || null
  );
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      field.onChange(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      field.onChange(null);
      setFileName(null);
      setPreview(null);
    }
  };

  const handleRemoveFile = () => {
    field.onChange(null);
    setFileName(null);
    setPreview(null);

    const inputElement = document.getElementById(controlId) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={controlId} className="block w-full cursor-pointer">
        <div className="border-unnamed-2 hover:border-primary/70 flex min-h-[130px] w-full flex-col items-center justify-center rounded-md border-2 border-dashed p-4 text-center transition-colors">
          {preview ? (
            <div className="relative flex max-h-[100px] w-full justify-center">
              <img
                src={preview}
                alt="Preview"
                className="h-full max-h-[100px] rounded-md object-contain"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-[-5px] right-[-5px] z-10 h-6 w-6 rounded-full bg-red-500/70 text-white hover:bg-red-600"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveFile();
                }}
              >
                <XCircleIcon className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="text-unnamed-2 flex flex-col items-center">
              <UploadCloudIcon className="h-10 w-10" />
              <Typography variant="p" className="mt-1 text-sm">
                {label}
              </Typography>
              <Typography
                variant="p"
                className="text-unnamed-2/80 mt-0.5 text-xs"
              >
                Recomendado 600x600px. Max 5MB.
              </Typography>
            </div>
          )}
          <Input
            id={controlId}
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            accept={accept}
            name={field.name}
            ref={field.ref}
          />
        </div>
      </label>
      {fileName && !preview && (
        <Typography variant="p" className="text-unnamed-2 mt-1 text-xs">
          Selected file: {fileName}
        </Typography>
      )}
    </div>
  );
};
