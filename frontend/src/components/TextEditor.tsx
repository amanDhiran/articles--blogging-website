import {
    BubbleMenu, Editor, EditorContent, useEditor,
  } from '@tiptap/react'
  import { FaBold } from "react-icons/fa";
  import { FaItalic } from "react-icons/fa";
  import { FaStrikethrough } from "react-icons/fa";
  import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
  import { RiDoubleQuotesL } from "react-icons/ri";
  import { FaCode } from "react-icons/fa";

  function TextEditor({editor} : {editor:Editor | null}) {
  
    return (
      <>
        {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className='border items-center justify-center border-slate-800/60 bg-primary p-1 rounded-md  flex gap-2'>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={` ${editor.isActive('bold') ? 'text-green-500' : ' bg-primary'}`}
          >
            <FaBold />
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-green-500' : ' bg-primary'}
          >
            <FaItalic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'text-green-500' : ' bg-primary'}
          >
            <FaStrikethrough />
          </button>
          <div className='w-[1px] h-6 bg-slate-500/30 rounded-md'></div>
          <button
            onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
            className={editor.isActive('heading', {level: 1}) ? 'text-green-500' : ' bg-primary'}
          >
            <LuHeading1 className='text-xl'/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
            className={editor.isActive('heading', {level: 2}) ? 'text-green-500' : ' bg-primary'}
          >
            <LuHeading2 className='text-xl'/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
            className={editor.isActive('heading', {level: 3}) ? 'text-green-500' : ' bg-primary'}
          >
            <LuHeading3 className='text-xl'/>
          </button>
          <div className='w-[1px] h-6 bg-slate-500/30 rounded-md'></div>
          <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? 'text-green-500' : ' bg-primary'
          }
        >
          <RiDoubleQuotesL className='text-xl' />
        </button>

        <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'text-green-500' : ' bg-primary'}
      >
        <FaCode className='text-xl'/>

      </button>
        </BubbleMenu>}
        <div className='prose text-secondary'>
        <EditorContent editor={editor} />
        </div>
      </>
    )
  }
  
  export default TextEditor
  