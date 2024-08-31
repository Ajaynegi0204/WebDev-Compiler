import CodeEditor from '@/components/ui/CodeEditor'
import HelperHeader from '@/components/HelperHeader'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import RenderCode from '@/components/RenderCode'
import {  useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { handleError } from '@/utils/handleError'
import { useDispatch } from 'react-redux'
import { updateFullCode, updateIsOwner } from '@/redux/slices/compilerSlice'
import { useLoadCodeMutation } from '@/redux/slices/api'

import Loading from '@/components/Loader/Loading'
 

function Compiler() {
  const navigate = useNavigate();
  const { urlId } = useParams();
  const [loadExistingCode, { isLoading }] = useLoadCodeMutation();
  const dispatch = useDispatch();

  const loadCode = async () => {
    
    try {
      if(urlId){
        const response = await loadExistingCode({urlId}).unwrap();
        dispatch(updateFullCode(response.fullCode));
        dispatch(updateIsOwner(response.isOwner));
      }

    } catch (error) {
      handleError(error);
      navigate("/compiler");
    }
  }

  useEffect (() => {
    if(urlId){
      loadCode(); 

    }
  },[urlId]);

  if(isLoading){
    return <div className='w-full h-[calc(100dvh-60px)] flex justify-center items-center bg-gray-800'><Loading /></div>
  }

  return (
    <ResizablePanelGroup direction="horizontal">
    <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={50}>
    <HelperHeader/>
    <CodeEditor />
    </ResizablePanel>
    
    <ResizableHandle />
    <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={50}>
      
      <RenderCode/>
  
    </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default Compiler