import { type FormEvent, useState, useEffect, useRef } from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";
import gsap from "gsap";
import { Bot, Loader2 } from "lucide-react";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(formRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
            );
        }
    }, []);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        setIsProcessing(true);

        setStatusText('Uploading your resume...');
        const uploadedFile = await fs.upload([file]);
        if (!uploadedFile) {
            setStatusText('Error: Failed to upload file');
            setIsProcessing(false);
            return;
        }

        setStatusText('Extracting contents...');
        const imageFile = await convertPdfToImage(file);
        if (!imageFile.file) {
            setStatusText('Error: Failed to convert PDF to image');
            setIsProcessing(false);
            return;
        }

        setStatusText('Preparing analysis...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) {
            setStatusText('Error: Failed to upload image');
            setIsProcessing(false);
            return;
        }

        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('AI is reviewing your resume...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) {
            setStatusText('Error: Failed to analyze resume');
            setIsProcessing(false);
            return;
        }

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        
        setStatusText('Analysis complete. Redirecting...');
        
        // Brief delay before navigation for better UX flow
        setTimeout(() => {
            navigate(`/resume/${uuid}`);
        }, 1000);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-[#FAFAFC] min-h-screen relative flex flex-col pt-28 pb-20">
            <Navbar />

            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8e98ff]/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-[#606beb]/10 rounded-full blur-[100px] pointer-events-none" />

            <section className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 w-full max-w-4xl mx-auto">
                <div ref={formRef} className="w-full">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                            Optimize your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8e98ff] to-[#606beb]">resume</span>
                        </h1>
                        <p className="text-lg text-gray-500 font-medium">
                            Drop your resume below for an instant ATS score and tailored improvements.
                        </p>
                    </div>

                    <div className="glass-panel p-8 md:p-12 w-full shadow-[0_20px_60px_-15px_rgba(142,152,255,0.15)] relative overflow-hidden">
                        {isProcessing ? (
                            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
                                <div className="relative mb-8">
                                    <div className="absolute inset-0 bg-[#8e98ff] rounded-full blur-xl opacity-40 animate-pulse" />
                                    <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center relative z-10 border border-[#8e98ff]/20">
                                        <Bot size={40} className="text-[#8e98ff] animate-bounce" />
                                    </div>
                                    <div className="absolute top-0 right-0 -mr-2 -mt-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                                        <Loader2 size={16} className="text-[#606beb] animate-spin" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{statusText}</h2>
                                <p className="text-gray-500">This usually takes about 10-15 seconds</p>
                                
                                <div className="w-64 h-2 bg-gray-100 rounded-full mt-8 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-[#8e98ff] to-[#606beb] w-1/2 animate-[progress_1.5s_ease-in-out_infinite]" style={{ backgroundSize: '200% 100%' }} />
                                </div>
                            </div>
                        ) : (
                            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-div">
                                        <label htmlFor="company-name" className="text-sm font-semibold text-gray-700 ml-1">Target Company <span className="text-gray-400 font-normal">(Optional)</span></label>
                                        <input type="text" name="company-name" placeholder="e.g. Google, Stripe" id="company-name" className="inset-shadow mt-1 transition-all focus:-translate-y-0.5" />
                                    </div>
                                    <div className="form-div">
                                        <label htmlFor="job-title" className="text-sm font-semibold text-gray-700 ml-1">Target Role <span className="text-red-400">*</span></label>
                                        <input type="text" name="job-title" placeholder="e.g. Senior Frontend Engineer" id="job-title" required className="inset-shadow mt-1 transition-all focus:-translate-y-0.5" />
                                    </div>
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job-description" className="text-sm font-semibold text-gray-700 ml-1">Job Description <span className="text-red-400">*</span></label>
                                    <textarea rows={4} name="job-description" placeholder="Paste the job description here to tailor your feedback..." id="job-description" required className="inset-shadow mt-1 transition-all focus:-translate-y-0.5 resize-none" />
                                </div>

                                <div className="form-div mt-2">
                                    <label htmlFor="uploader" className="text-sm font-semibold text-gray-700 ml-1 mb-1">Your Resume (PDF) <span className="text-red-400">*</span></label>
                                    <FileUploader onFileSelect={handleFileSelect} />
                                </div>

                                <button 
                                    className={`primary-gradient text-white text-lg font-bold py-4 rounded-2xl mt-4 transition-all duration-300 shadow-lg ${file ? 'hover:scale-[1.02] hover:shadow-xl' : 'opacity-70 cursor-not-allowed'}`} 
                                    type="submit"
                                    disabled={!file}
                                >
                                    Analyze My Resume
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}
export default Upload
