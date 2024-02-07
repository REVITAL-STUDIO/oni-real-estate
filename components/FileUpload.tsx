import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface fileUploadProps {
    onFilesSelected: (files: File[])=>void,
    initialFiles?: File[];

}

const FileUpload: React.FC<fileUploadProps> = ({onFilesSelected, initialFiles}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>(initialFiles || []);
  console.log("In File Upload Selected Files ############## ", selectedFiles)
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const removeFile = (fileName: string) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  // Notify the parent component about the selected files
  React.useEffect(() => {
    onFilesSelected(selectedFiles);
  }, [onFilesSelected, selectedFiles]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
        'image/jpeg': [],
        'image/png': [],
        'image/jpg': []
      }
    
  });

  return (
    <div>
      <div {...getRootProps()} className="border-2 border-dashed rounded px-4 py-[6rem] cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div>
        <h4>Listing Photos: </h4>
        <ul>
          {selectedFiles.map((file) => (
            <li>
              <img
                src={URL.createObjectURL(file)} // Use createObjectURL to generate a preview URL
                alt={file.name}
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />
              <button onClick={() => removeFile(file.name)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default FileUpload;
