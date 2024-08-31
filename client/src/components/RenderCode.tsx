import { RootState } from '@/redux/store'

import { useSelector } from 'react-redux'

function RenderCode() {
    const fullCode = useSelector((state: RootState)=> state.compilerSlice.fullCode);

    const  combinedCode = `<html><style>${fullCode.css}</style><body>${fullCode.html}<script>${fullCode.javascript}</script></body></html>`;

    const iframeCode = `data:text/html; charset=utf-8, ${encodeURIComponent(combinedCode)}`;

  return (
    <div className='bg-white border-2 border-red-500 h-[calc(100dvh-60px)]'>
        <iframe className="w-full h-full" src={iframeCode}/>
    </div>
  )
}

export default RenderCode