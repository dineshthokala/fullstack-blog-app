
import { useRef, useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3, Quote } from 'lucide-react';
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [previewMode, setPreviewMode] = useState(false);
  
  const insertMarkdown = (markdownSyntax: string, selection?: boolean, placeholder?: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let insertion;
    if (selection && selectedText) {
      insertion = markdownSyntax.replace('$1', selectedText);
    } else {
      insertion = placeholder ? markdownSyntax.replace('$1', placeholder) : markdownSyntax;
    }
    
    const newValue = 
      textarea.value.substring(0, start) + 
      insertion + 
      textarea.value.substring(end);
    
    onChange(newValue);
    
    // Focus back to textarea after insertion
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + insertion.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleBold = () => insertMarkdown('**$1**', true, 'bold text');
  const handleItalic = () => insertMarkdown('*$1*', true, 'italic text');
  const handleH1 = () => insertMarkdown('\n# $1\n', true, 'Heading 1');
  const handleH2 = () => insertMarkdown('\n## $1\n', true, 'Heading 2');
  const handleH3 = () => insertMarkdown('\n### $1\n', true, 'Heading 3');
  const handleBulletList = () => insertMarkdown('\n- $1\n- Item 2\n- Item 3\n', true, 'List item');
  const handleNumberList = () => insertMarkdown('\n1. $1\n2. Item 2\n3. Item 3\n', true, 'List item');
  const handleQuote = () => insertMarkdown('\n> $1\n', true, 'Blockquote');
  
  const convertToHTML = (markdown: string): string => {
    return markdown
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^\- (.+)$/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-center gap-2 p-2 border rounded-md bg-muted/40">
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleBold} 
          disabled={previewMode}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleItalic} 
          disabled={previewMode}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleH1} 
          disabled={previewMode}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleH2} 
          disabled={previewMode}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleH3} 
          disabled={previewMode}
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleBulletList} 
          disabled={previewMode}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleNumberList} 
          disabled={previewMode}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={handleQuote} 
          disabled={previewMode}
        >
          <Quote className="h-4 w-4" />
        </Button>
        
        <div className="ml-auto">
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </div>
      
      {previewMode ? (
        <div 
          className="p-4 min-h-[300px] border rounded-md blog-content"
          dangerouslySetInnerHTML={{ __html: convertToHTML(value) }}
        />
      ) : (
        <Textarea
          ref={textareaRef}
          className="min-h-[300px] font-mono"
          placeholder={placeholder || "Write your content using Markdown..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
