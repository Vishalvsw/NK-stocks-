// import React, { useState } from 'react';
// import { Layout } from '../components/Layout';
// import { useApp } from '../context/AppContext';
// import { generateBlogContent } from '../services/geminiService';
// import { Calendar, User, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

// const Blog = () => {
//   const { blogs, addBlog } = useApp();
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [topic, setTopic] = useState('');

//   const handleGeneratePost = async () => {
//     if (!topic) return;
//     setIsGenerating(true);
//     try {
//         const result = await generateBlogContent(topic);
//         addBlog({
//             id: Math.random().toString(36).substr(2, 9),
//             title: result.title,
//             content: result.content,
//             excerpt: result.content.substring(0, 100) + '...',
//             author: 'AI Market Analyst',
//             date: new Date().toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'}),
//             image: `https://picsum.photos/800/600?random=${Math.random()}`,
//             category: 'AI Analysis'
//         });
//         setTopic('');
//     } finally {
//         setIsGenerating(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="bg-slate-50 py-12 min-h-screen">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-between items-center mb-12">
//              <div className="mb-6 md:mb-0">
//                <h1 className="text-3xl font-bold text-slate-900 mb-2">Market Insights</h1>
//                <p className="text-gray-500">Stay updated with the latest trends and analysis.</p>
//              </div>
             
//              {/* AI Generator for Admin/Demo purposes */}
//              <div className="bg-white p-2 rounded-lg shadow-sm border border-purple-100 flex items-center">
//                 <input 
//                   type="text" 
//                   placeholder="Topic (e.g. Gold Prices)" 
//                   className="bg-transparent border-none outline-none px-3 text-sm w-48"
//                   value={topic}
//                   onChange={(e) => setTopic(e.target.value)}
//                 />
//                 <button 
//                   onClick={handleGeneratePost}
//                   disabled={isGenerating || !topic}
//                   className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 flex items-center"
//                 >
//                   {isGenerating ? <Loader2 className="h-4 w-4 animate-spin"/> : <Sparkles className="h-4 w-4 mr-1"/>}
//                   Generate AI Post
//                 </button>
//              </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {blogs.map(blog => (
//               <div key={blog.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
//                 <div className="h-64 overflow-hidden">
//                     <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
//                 </div>
//                 <div className="p-6 flex-grow flex flex-col">
//                   <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
//                     <span className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> {blog.date}</span>
//                     <span className="flex items-center"><User className="h-3 w-3 mr-1" /> {blog.author}</span>
//                     <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{blog.category}</span>
//                   </div>
//                   <h2 className="text-xl font-bold text-slate-900 mb-3">{blog.title}</h2>
//                   <p className="text-gray-600 mb-4 flex-grow text-sm leading-relaxed">{blog.excerpt}</p>
//                   <button className="text-secondary font-semibold inline-flex items-center hover:text-green-700 self-start">
//                     Read Article <ArrowRight className="ml-1 h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Blog;
