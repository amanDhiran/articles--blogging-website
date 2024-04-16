import {
    BubbleMenu, Editor, EditorContent, useEditor,
  } from '@tiptap/react'
  import { FaBold } from "react-icons/fa";
  import { FaItalic } from "react-icons/fa";
  import { FaStrikethrough } from "react-icons/fa";
  
  function TextEditor({editor} : {editor:Editor | null}) {

    
  
    // const html = editor?.getHTML()
  
    // console.log(html);
    
    
  
    return (
      <>
        {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className='border border-slate-500/60 bg-primary p-1 rounded-lg flex gap-2'>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`text-white rounded-md p-1 ${editor.isActive('bold') ? 'text-green-500' : ' bg-black'}`}
          >
            <FaBold />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-green-500' : ' bg-black'}
          >
            <FaItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'text-green-500' : ' bg-black'}
          >
            <FaStrikethrough />
          </button>
        </BubbleMenu>}
        <EditorContent editor={editor} />
      </>
    )
  }
  
  export default TextEditor
  