import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PhotoDrop from '../public/photo-drop.svg'
import Delete from '../public/delete.svg'
import Image from 'next/image';

interface fileUploadProps {
  onFilesSelected: (files: File[]) => void,
  initialFiles?: File[];

}

const FileUpload: React.FC<fileUploadProps> = ({ onFilesSelected, initialFiles }) => {
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
      <div {...getRootProps()} className="border-2 border-dashed rounded px-4 py-[4rem] cursor-pointer flex flex-col items-center justify-center gap-2">
        <input {...getInputProps()} />
        <Image src={PhotoDrop} alt='photo-drop'  />
        <p>Drag and drop your images here</p>
        <p>or</p>
        <button className='bg-[#B3B3B3] p-1 hover:opacity-50 active:opacity-100'>Browse Files</button>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-6 mt-4"> {/* Grid container with 3 columns and gap */}
          {selectedFiles.map((file) => (
            <div key={file.name} className="relative group transition-transform duration-300 hover:scale-110"> {/* Use key for optimization */}
              <img
                src={URL.createObjectURL(file)} // Use createObjectURL to generate a preview URL
                alt={file.name}
                className="w-full h-auto hover:shadow-2xl " // Set image width to full and auto height
              />
              <button
                onClick={() => removeFile(file.name)}
                className="absolute -top-[12%] -right-[12%]  hover:cursor-pointer opacity-0 transition-opacity duration-800 group-hover:opacity-100 "
              >
                <Image src={Delete} alt='delete' className='hover:brightness-75 active:brightness-100'/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default FileUpload;
