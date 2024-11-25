import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Coffee, Check, Sparkles, PenTool, Brain, Book } from 'lucide-react';
import { genAI } from '@/lib/gemini';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SupportBox = () => (
  <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 mb-8">
    <div className="text-center space-y-4">
      <Coffee className="h-12 w-12 mx-auto text-blue-500" />
      <h2 className="text-2xl font-bold">Support Our Work ❤️</h2>
      <p className="text-gray-600 max-w-xl mx-auto">
        Help us maintain and improve our AI tools by supporting our API & hosting costs. 
        Your contribution helps keep this tool free for everyone! 🙏
      </p>
      <a
        href="https://roihacks.gumroad.com/coffee"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Button 
          size="lg" 
          className="text-lg px-8 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        >
          <Coffee className="mr-2 h-5 w-5" />
          Buy Us a Coffee ☕
        </Button>
      </a>
    </div>
  </Card>
);

export default function Home() {
  const [content, setContent] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateIntroduction = async () => {
    if (!content.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      if (!genAI) {
        throw new Error("API key not configured. Please add your Gemini API key to continue.");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Generate a compelling introduction for the following content: ${content}. 
      The introduction should be engaging, well-structured, and appropriate for the content type.
      Consider the context and purpose of the content to create a hook that draws readers in.
      Make it between 100-500 words and ensure it flows naturally into the main content.`;
      
      const result = await model.generateContent(prompt);
      setIntroduction(result.response.text().trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the introduction');
      setIntroduction('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(introduction);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 py-4">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text leading-tight">
            AI Introduction Generator ✨
          </h1>
          <p className="text-xl text-gray-600">
            Generate engaging introductions for any type of content in seconds! 🚀
          </p>
        </div>
        
        <div className="gradient-border mb-8">
          <div className="p-8">
            <div className="space-y-6">
              <Textarea
                placeholder="✍️ Describe your content or paste the text you need an introduction for..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] text-lg border-2 focus:border-blue-400"
              />
              
              <Button 
                onClick={generateIntroduction}
                disabled={loading || !content.trim()}
                className="w-full text-lg py-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Creating Your Introduction...
                  </>
                ) : (
                  <>
                    <PenTool className="mr-2 h-5 w-5" />
                    Generate Introduction ✨
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {introduction && (
          <div className="space-y-6 mb-12">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Your Introduction</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 hover:bg-blue-50"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>
                <div className="prose prose-blue max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {introduction}
                  </ReactMarkdown>
                </div>
              </div>
            </Card>
          </div>
        )}

        <SupportBox />

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 mb-16">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
              Free AI Introduction Generator: Create Perfect Introductions in Seconds ⚡
            </h2>
            
            <div className="space-y-8">
              <p className="text-gray-600 leading-relaxed">
                Need help writing the perfect introduction? Our free AI-powered introduction generator
                combines advanced artificial intelligence with writing expertise to help you create
                engaging, compelling introductions for any type of content.
              </p>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Brain className="h-6 w-6 text-blue-500" />
                  Why Choose Our AI Introduction Generator? 🎯
                </h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">🚀</span>
                    <span>Instant generation of engaging introductions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🤖</span>
                    <span>AI-powered technology that understands context</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">📚</span>
                    <span>Follows writing best practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💡</span>
                    <span>Perfect for any type of content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    <span>Free to use with professional-quality results</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Book className="h-6 w-6 text-blue-500" />
                  Perfect for All Content Types 📝
                </h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• Blog Posts and Articles</li>
                  <li>• Academic Papers</li>
                  <li>• Business Reports</li>
                  <li>• Presentations</li>
                  <li>• Newsletters</li>
                  <li>• Website Content</li>
                  <li>• Marketing Materials</li>
                  <li>• Creative Writing</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Key Features of Our Introduction Generator 🌟
                </h2>
                <ul className="space-y-2 text-gray-600">
                  <li>• Context-aware content generation</li>
                  <li>• Engaging hooks and opening lines</li>
                  <li>• Natural language flow</li>
                  <li>• Proper tone and style matching</li>
                  <li>• Clear and concise writing</li>
                  <li>• SEO-friendly content</li>
                  <li>• Customizable output</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Tips for Better Introductions 💡
                </h2>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Start with a hook that grabs attention</li>
                  <li>Provide relevant context</li>
                  <li>State your main point clearly</li>
                  <li>Keep it concise and focused</li>
                  <li>End with a smooth transition</li>
                </ol>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Why Great Introductions Matter 🎯
                </h2>
                <p className="text-gray-600">
                  A well-written introduction is crucial for:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>• Capturing reader attention</li>
                  <li>• Setting the right tone</li>
                  <li>• Establishing credibility</li>
                  <li>• Improving engagement</li>
                  <li>• Boosting content effectiveness</li>
                </ul>
              </div>
            </div>
          </article>
        </div>

        <SupportBox />
      </div>
    </div>
  );
}