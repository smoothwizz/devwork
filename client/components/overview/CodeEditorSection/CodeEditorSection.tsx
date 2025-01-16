import { useAtom } from 'jotai'
import { atom_code } from 'jotai/atoms'

import React, { Dispatch, SetStateAction } from 'react'
import SectionHeading from '../common/SectionHeading.component'
import dynamic from 'next/dynamic'
import '@uiw/react-textarea-code-editor/dist.css'

const CodeEditor = dynamic(
  () => import('@uiw/react-textarea-code-editor').then((mod) => mod.default),
  { ssr: false },
)

interface Props {
  toggle: Dispatch<SetStateAction<boolean>>
}

export default function CodeEditorSection({ toggle }: Props) {
  const [code, setCode] = useAtom(atom_code)

  return (
    <section className="mt-8">
      <SectionHeading
        title="Code Editor"
        description={'Use this space for writing down code snippets.'}
        subHeading={'* with Syntax Highlighting (for typescript/javascript).'}
        handleToggle={toggle}
      />
      {renderTextarea()}
    </section>
  )

  function renderTextarea() {
    return (
      <CodeEditor
        value={code}
        language="js"
        placeholder="Please enter code..."
        onChange={(evn: any) => setCode(evn.target.value)}
        padding={16}
        style={{
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    )
  }
}
