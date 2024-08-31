import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
 
import { tags as t } from '@lezer/highlight';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { loadLanguage  } from '@uiw/codemirror-extensions-langs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateCodeValue } from '@/redux/slices/compilerSlice';


function CodeEditor() {

  const dispatch = useDispatch();
  
  const currentLanguage = useSelector((state : RootState)=> state.compilerSlice.currentLanguage);

  const fullCode = useSelector((state : RootState)=> state.compilerSlice.fullCode);
   
   
    const onChange = React.useCallback((value:string ) => {
            
       dispatch(updateCodeValue(value));
    }, []);
    

    return (
        
        <CodeMirror value={fullCode[currentLanguage]} 
        className='code-editor'
        height="calc(100vh - 60px - 50px)" 
        extensions={[loadLanguage(currentLanguage)!]}
        onChange={onChange} 
        theme={draculaInit({
            settings: {
              caret: '#c6c6c6',
              fontFamily: 'monospace',
            },
            styles: [
              { tag: t.comment, color: '#6272a4' },
            ]
          })}/>
  )
}

export default CodeEditor