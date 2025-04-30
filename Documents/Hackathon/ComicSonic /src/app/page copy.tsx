// -----------------------------------------Design 1-----------------------------------------
// // "use client";

// import React, { useState, useRef } from "react";
// import { motion } from "framer-motion";

// const ComicSonic: React.FC = () => {
//     const [file, setFile] = useState<File | null>(null);
//     const [isUploading, setIsUploading] = useState<boolean>(false);
//     const [showEffect, setShowEffect] = useState(false);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//         event.preventDefault();
//         const uploadedFile = event.dataTransfer.files[0];
//         processFile(uploadedFile);
//     };

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             processFile(event.target.files[0]);
//         }
//     };

//     const processFile = (uploadedFile: File) => {
//         if (uploadedFile && uploadedFile.type === "application/pdf") {
//             setFile(uploadedFile);
//             triggerEffect();
//         } else {
//             triggerEffect();
//             alert("Please upload a PDF comic file!");
//         }
//     };

//     const triggerEffect = () => {
//         setShowEffect(true);
//         setTimeout(() => setShowEffect(false), 800);
//     };

//     const handleUpload = () => {
//         if (!file) return;
//         setIsUploading(true);
//         setTimeout(() => {
//             setIsUploading(false);
//             triggerEffect();
//             alert("Comic uploaded successfully! Preparing your audio experience...");
//             setFile(null);
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = "";
//             }
//         }, 3000);
//     };

//     return (
//         <div className="bg-gradient-to-b from-blue-900 to-purple-800 min-h-screen text-white flex flex-col items-center relative overflow-hidden">
//             {/* Comic dots background */}
//             <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')]"></div>
            
//             {/* Comic effect */}
//             {showEffect && (
//                 <motion.div 
//                     className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
//                     initial={{ opacity: 1, scale: 0 }}
//                     animate={{ opacity: 0, scale: 3 }}
//                     transition={{ duration: 0.8 }}
//                 >
//                     <span className="text-9xl font-extrabold text-yellow-400 stroke-black stroke-2">POW!</span>
//                 </motion.div>
//             )}

//             <nav className="flex justify-between items-center p-6 px-12 w-full z-10">
//                 <motion.div 
//                     className="text-4xl font-extrabold font-comic tracking-wide"
//                     initial={{ y: -100 }}
//                     animate={{ y: 0 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                 >
//                     <span className="text-yellow-400">COMIC</span>
//                     <span className="text-white">SONIC</span>
 
//                 </motion.div>
                
//             </nav>

//             <main className="flex flex-col items-center justify-center flex-grow w-full px-4 z-10">
//                 <motion.div
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="text-center mb-12"
//                 >
//                     <h1 className="text-5xl font-comic font-bold mb-4 text-yellow-400">COMIC-TO-AUDIO PROTOTYPE</h1>
//                     <p className="text-xl max-w-2xl">Experience comics like never before - with immersive soundscapes!</p>
//                 </motion.div>

//                 <input 
//                     type="file" 
//                     ref={fileInputRef}
//                     onChange={handleFileChange}
//                     accept="application/pdf"
//                     className="hidden"
//                     id="fileInput"
//                 />

//                 <motion.div
//                     className="border-8 border-dashed border-yellow-400 p-12 rounded-3xl bg-white bg-opacity-10 shadow-comic-xl w-full max-w-2xl text-center cursor-pointer relative overflow-hidden"
//                     onDragOver={(e) => e.preventDefault()}
//                     onDrop={handleDrop}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => fileInputRef.current?.click()}
//                     transition={{ duration: 0.3 }}
//                 >
                  
//                     {file ? (
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 0.5 }}
//                             className="flex flex-col items-center"
//                         >
//                             <div className="text-6xl mb-4">📚</div>
//                             <h3 className="text-3xl font-comic font-bold text-yellow-400 mb-2">{file.name}</h3>
//                             <p className="text-lg">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
//                             <p className="text-sm mt-4 text-gray-300">Click to select a different comic</p>
//                         </motion.div>
//                     ) : (
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5 }}
//                             className="flex flex-col items-center"
//                         >
//                             <div className="text-8xl mb-6">🗣️</div>
//                             <h3 className="text-3xl font-comic font-bold text-yellow-400 mb-4">DROP YOUR COMIC HERE</h3>
//                             <p className="text-xl mb-2">or click to browse files</p>
//                             <p className="text-sm text-gray-300">Supports PDF comics only</p>
//                         </motion.div>
//                     )}
//                 </motion.div>

//                 {file && (
//                     <motion.button
//                         onClick={handleUpload}
//                         className="mt-12 px-12 py-4 bg-yellow-500 text-black rounded-full shadow-comic-xl hover:bg-yellow-400 text-2xl font-comic font-bold relative overflow-hidden"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                         disabled={isUploading}
//                     >
//                         {isUploading ? (
//                             <motion.span
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 className="flex items-center justify-center"
//                             >
//                                 <motion.svg 
//                                     className="animate-spin -ml-1 mr-3 h-6 w-6 text-black"
//                                     xmlns="http://www.w3.org/2000/svg" 
//                                     fill="none" 
//                                     viewBox="0 0 24 24"
//                                     animate={{ rotate: 360 }}
//                                     transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//                                 >
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </motion.svg>
//                                 CONVERTING...
//                             </motion.span>
//                         ) : (
//                             <motion.span
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                             >
//                                 CREATE AUDIO EXPERIENCE! 🚀
//                             </motion.span>
//                         )}
//                     </motion.button>
//                 )}

//                 {isUploading && (
//                     <motion.div 
//                         className="mt-10 text-center"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ 
//                             opacity: [0, 1, 0.8],
//                             y: 0
//                         }} 
//                         transition={{ 
//                             repeat: Infinity,
//                             duration: 2,
//                             ease: "easeInOut"
//                         }}
//                     >
//                         <div className="text-4xl mb-4">✨</div>
//                         <div className="text-2xl font-comic text-yellow-300">Crafting your sonic comic experience!</div>
//                         <p className="text-lg">Adding voices, sound effects, and music...</p>
//                     </motion.div>
//                 )}

                
//             </main>

//             <footer className="w-full bg-black bg-opacity-80 py-6 text-center text-yellow-400 font-comic text-lg mt-12">
//                 <p>© {new Date().getFullYear()} <span className="text-yellow-400">COMICSONIC</span> - Where ink meets audio</p>
//                 <p className="text-sm mt-2 font-sans">Experience comics like never before!</p>
//             </footer>

//             <style jsx global>{`
//                 @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap');
                
//                 .font-comic {
//                     font-family: 'Bangers', cursive;
//                     letter-spacing: 1px;
//                     text-shadow: 2px 2px 0px rgba(0,0,0,0.3);
//                 }
                
//                 .shadow-comic-xl {
//                     box-shadow: 12px 12px 0px rgba(0,0,0,0.3);
//                 }
                
//                 body {
//                     overflow-x: hidden;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default ComicSonic;

// -----------------------------------------Design 2-----------------------------------------


// "use client";

// import React, { useState, useRef } from "react";
// import { motion } from "framer-motion";

// const ComicSonic: React.FC = () => {
//     const [file, setFile] = useState<File | null>(null);
//     const [isUploading, setIsUploading] = useState<boolean>(false);
//     const [showEffect, setShowEffect] = useState(false);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//         event.preventDefault();
//         const uploadedFile = event.dataTransfer.files[0];
//         processFile(uploadedFile);
//     };

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             processFile(event.target.files[0]);
//         }
//     };

//     const processFile = (uploadedFile: File) => {
//         if (uploadedFile && uploadedFile.type === "application/pdf") {
//             setFile(uploadedFile);
//             triggerEffect();
//         } else {
//             triggerEffect();
//             alert("Please upload a PDF comic file!");
//         }
//     };

//     const triggerEffect = () => {
//         setShowEffect(true);
//         setTimeout(() => setShowEffect(false), 800);
//     };

//     const handleUpload = () => {
//         if (!file) return;
//         setIsUploading(true);
//         setTimeout(() => {
//             setIsUploading(false);
//             triggerEffect();
//             alert("Comic uploaded successfully! Preparing your audio experience...");
//             setFile(null);
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = "";
//             }
//         }, 3000);
//     };

//     return (
//         <div className="min-h-screen text-white flex flex-col items-center relative overflow-hidden">
//             {/* Background Image */}
//             <div 
//                 className="absolute inset-0 bg-[url('/BG.jpeg')] bg-cover bg-center opacity-20 z-0"
//                 style={{
//                     backgroundImage: "url('/BG.jpeg')",
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     opacity: 0.2
//                 }}
//             ></div>
            
//             {/* Comic dots overlay */}
//             <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] z-0"></div>
            
//             {/* Comic effect */}
//             {showEffect && (
//                 <motion.div 
//                     className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
//                     initial={{ opacity: 1, scale: 0 }}
//                     animate={{ opacity: 0, scale: 3 }}
//                     transition={{ duration: 0.8 }}
//                 >
//                     <span className="text-9xl font-extrabold comic-burst stroke-black stroke-2">POW!</span>
//                 </motion.div>
//             )}

//             <nav className="flex justify-between items-center p-6 px-12 w-full z-10">
//                 <motion.div 
//                     className="text-4xl font-extrabold font-comic tracking-wide"
//                     initial={{ y: -100 }}
//                     animate={{ y: 0 }}
//                     transition={{ type: "spring", stiffness: 300 }}
//                 >
//                     <span className="comic-gradient">COMIC</span>
//                     <span className="comic-gradient-reverse">SONIC</span>
//                 </motion.div>
//             </nav>

//             <main className="flex flex-col items-center justify-center flex-grow w-full px-4 z-10">
//                 <motion.div
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="text-center mb-12"
//                 >
//                     <h1 className="text-5xl font-comic font-bold mb-4 comic-title">
//                         COMIC-TO-AUDIO PROTOTYPE
//                     </h1>
//                     <p className="text-xl max-w-2xl comic-subtitle">
//                         Experience comics like never before - with immersive soundscapes!
//                     </p>
//                 </motion.div>

//                 <input 
//                     type="file" 
//                     ref={fileInputRef}
//                     onChange={handleFileChange}
//                     accept="application/pdf"
//                     className="hidden"
//                     id="fileInput"
//                 />

//                 <motion.div
//                     className="border-8 border-dashed border-gray-400/50 p-12 rounded-3xl bg-white/10 shadow-comic-xl w-full max-w-2xl text-center cursor-pointer relative overflow-hidden backdrop-blur-sm"
//                     onDragOver={(e) => e.preventDefault()}
//                     onDrop={handleDrop}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={() => fileInputRef.current?.click()}
//                     transition={{ duration: 0.3 }}
//                 >
//                     {file ? (
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 0.5 }}
//                             className="flex flex-col items-center"
//                         >
//                             <div className="text-6xl mb-4">📚</div>
//                             <h3 className="text-3xl font-comic font-bold comic-filename mb-2">{file.name}</h3>
//                             <p className="text-lg comic-meta">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
//                             <p className="text-sm mt-4 text-gray-300 comic-meta">Click to select a different comic</p>
//                         </motion.div>
//                     ) : (
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5 }}
//                             className="flex flex-col items-center"
//                         >
//                             <div className="text-8xl mb-6">🦹</div>
//                             <h3 className="text-3xl font-comic font-bold comic-upload-title mb-4">DROP YOUR COMIC HERE</h3>
//                             <p className="text-xl mb-2 comic-upload-sub">or click to browse files</p>
//                             <p className="text-sm comic-meta">Supports PDF comics only</p>
//                         </motion.div>
//                     )}
//                 </motion.div>

//                 {file && (
//                     <motion.button
//                         onClick={handleUpload}
//                         className="mt-12 px-12 py-4 comic-button rounded-full shadow-comic-xl hover:scale-105 text-2xl font-comic font-bold relative overflow-hidden"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                         disabled={isUploading}
//                     >
//                         {isUploading ? (
//                             <motion.span
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 className="flex items-center justify-center"
//                             >
//                                 <motion.svg 
//                                     className="animate-spin -ml-1 mr-3 h-6 w-6 text-black"
//                                     xmlns="http://www.w3.org/2000/svg" 
//                                     fill="none" 
//                                     viewBox="0 0 24 24"
//                                     animate={{ rotate: 360 }}
//                                     transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//                                 >
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </motion.svg>
//                                 <span className="comic-button-text">CONVERTING...</span>
//                             </motion.span>
//                         ) : (
//                             <motion.span
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 className="comic-button-text"
//                             >
//                                 CREATE AUDIO EXPERIENCE! 🚀
//                             </motion.span>
//                         )}
//                     </motion.button>
//                 )}

//                 {isUploading && (
//                     <motion.div 
//                         className="mt-10 text-center comic-processing"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ 
//                             opacity: [0, 1, 0.8],
//                             y: 0
//                         }} 
//                         transition={{ 
//                             repeat: Infinity,
//                             duration: 2,
//                             ease: "easeInOut"
//                         }}
//                     >
//                         <div className="text-4xl mb-4">✨</div>
//                         <div className="text-2xl font-comic comic-processing-title">Crafting your sonic comic experience!</div>
//                         <p className="text-lg comic-processing-sub">Adding voices, sound effects, and music...</p>
//                     </motion.div>
//                 )}
//             </main>

//             <footer className="w-full bg-black bg-opacity-80 py-6 text-center font-comic text-lg mt-auto z-10">
//                 <p className="comic-footer-main">© {new Date().getFullYear()} <span className="comic-footer-brand">COMICSONIC</span> - Where ink meets audio</p>
//                 <p className="text-sm mt-2 comic-footer-sub">Experience comics like never before!</p>
//             </footer>

//             <style jsx global>{`
//                 @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap');
                
//                 .font-comic {
//                     font-family: 'Bangers', cursive;
//                     letter-spacing: 1px;
//                     text-shadow: 2px 2px 0px rgba(0,0,0,0.3);
//                 }
                
//                 .shadow-comic-xl {
//                     box-shadow: 12px 12px 0px rgba(0,0,0,0.3);
//                 }
                
//                 /* Multi-color comic text styles */
//                 .comic-gradient {
//                     background: linear-gradient(45deg, #FF0F7B, #F89B29);
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                     text-shadow: 3px 3px 0px rgba(0,0,0,0.2);
//                 }
                
//                 .comic-gradient-reverse {
//                     background: linear-gradient(45deg, #F89B29, #FF0F7B);
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                     text-shadow: 3px 3px 0px rgba(0,0,0,0.2);
//                 }
                
//                 .comic-title {
//                     background: linear-gradient(45deg, #FF0F7B, #F89B29, #4CC9F0, #7209B7);
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                     text-shadow: 4px 4px 0px rgba(0,0,0,0.2);
//                     letter-spacing: 2px;
//                 }
                
//                 .comic-subtitle {
//                     background: linear-gradient(45deg, #4CC9F0,rgb(107, 206, 77));
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                     text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
//                 }
                
//                 .comic-upload-title {
//                     background: linear-gradient(45deg, #FF0F7B, #F89B29);
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                     text-shadow: 3px 3px 0px rgba(0,0,0,0.2);
//                 }
                
//                 .comic-upload-sub {
//                     background: linear-gradient(45deg, #4CC9F0, #4361EE);
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                 }
                
//                 .comic-filename {
//                     background: linear-gradient(45deg, #7209B7, #3A0CA3);
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                 }
                
//                 .comic-meta {
//                     background: linear-gradient(45deg, #F72585,rgb(44, 201, 164));
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                 }
                
//                 .comic-button {
//                     background: linear-gradient(45deg, #FF0F7B, #F89B29);
//                     box-shadow: 0 4px 15px rgba(248, 155, 41, 0.4);
//                 }
                
//                 .comic-button-text {
//                     background: linear-gradient(45deg, #000000, #3A0CA3);
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                 }
                
//                 .comic-processing-title {
//                     background: linear-gradient(45deg, #F89B29, #4CC9F0);
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                 }
                
//                 .comic-processing-sub {
//                     background: linear-gradient(45deg, #4CC9F0, #4361EE);
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                 }
                
//                 .comic-footer-main {
//                     background: linear-gradient(45deg, #F72585, #7209B7);
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                 }
                
//                 .comic-footer-brand {
//                     background: linear-gradient(45deg, #F89B29, #FF0F7B);
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                 }
                
//                 .comic-footer-sub {
//                     background: linear-gradient(45deg, #4CC9F0, #4361EE);
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                 }
                
//                 .comic-burst {
//                     background: linear-gradient(45deg, #FF0F7B, #F89B29, #4CC9F0, #7209B7);
//                     -webkit-background-clip: text;
//                     background-clip: text;
//                     color: transparent;
//                     text-shadow: 5px 5px 0px rgba(0,0,0,0.3);
//                 }
                
//                 body {
//                     overflow-x: hidden;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default ComicSonic;
