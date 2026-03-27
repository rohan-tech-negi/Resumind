import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'
import { CloudUpload, FileText, X } from 'lucide-react'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full">
            <div 
                {...getRootProps()} 
                className={`relative overflow-hidden glass-panel border-2 border-dashed transition-all duration-300 group cursor-pointer
                    ${isDragActive ? 'border-[#8e98ff] bg-white/80 scale-[1.02]' : 'border-gray-300 hover:border-[#8e98ff]/50'}`}
            >
                <input {...getInputProps()} />

                <div className="p-10 flex flex-col items-center justify-center space-y-4">
                    {file ? (
                        <div className="w-full flex items-center justify-between p-4 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm inset-shadow" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-[#8e98ff]/10 rounded-xl text-[#8e98ff]">
                                    <FileText size={28} />
                                </div>
                                <div className="flex flex-col text-left">
                                    <p className="font-semibold text-gray-800 truncate max-w-[200px] md:max-w-xs text-lg tracking-tight">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-500 font-medium">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button className="p-2.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" onClick={(e) => {
                                e.stopPropagation();
                                onFileSelect?.(null);
                            }}>
                                <X size={20} />
                            </button>
                        </div>
                    ): (
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-20 h-20 flex items-center justify-center rounded-full mb-4 transition-transform duration-500 
                                ${isDragActive ? 'bg-[#8e98ff]/20 scale-110' : 'bg-gray-100 group-hover:scale-110 group-hover:bg-[#8e98ff]/10'}`}>
                                <CloudUpload size={36} className={`transition-colors duration-300 ${isDragActive ? 'text-[#8e98ff]' : 'text-gray-400 group-hover:text-[#8e98ff]'}`} />
                            </div>
                            <p className="text-xl text-gray-700 tracking-tight font-medium mb-1">
                                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8e98ff] to-[#606beb]">
                                    Click to upload
                                </span> or drag and drop
                            </p>
                            <p className="text-sm text-gray-500/80 font-medium mt-2">PDF (max {formatSize(maxFileSize)})</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FileUploader
