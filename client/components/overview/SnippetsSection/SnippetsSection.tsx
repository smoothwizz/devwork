import ButtonSecondary from '@/components/forms/buttons/ButtonSecondary'
import { useAtom } from 'jotai'
import { Snippet, atom_snippets } from 'jotai/atoms'
import SnippetItem from './SnippetItem'
import { FaPlusCircle } from 'react-icons/fa'

import React, { Dispatch, SetStateAction } from 'react'
import { nanoid } from 'nanoid'
import SectionHeading from '../common/SectionHeading.component'

interface Props {
  toggle: Dispatch<SetStateAction<boolean>>
}

export default function SnippetsSection({toggle}: Props) {
  const [list, setList] = useAtom(atom_snippets)
  const hasSnippets = list.length > 0

  return (
    <section className="mt-8">
      <SectionHeading
        title="Snippets"
        description={'A list of reusable blocks of content'}
        subHeading={
          '* Think of a snippet as a paragraph in a textbook: you sometimes want to save it for later'
        }
        handleToggle={toggle}
      />
      {renderList()}
    </section>
  )

  function renderList() {
    return (
      <div className="py-4">
        {!hasSnippets && 'No snippets added yet.'}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {list.map((el) => (
            <SnippetItem
              key={el.id}
              item={el}
              actions={{
                update: handleSnippetChange,
                delete: handleSnippetDelete,
              }}
            />
          ))}
        </div>
        <div className="mt-4">
          <ButtonSecondary action={() => handleAddSnippet()}>
            <>
              <FaPlusCircle /> {hasSnippets ? 'Add' : 'Add your first snippet'}
            </>
          </ButtonSecondary>
        </div>
      </div>
    )
  }

  function handleSnippetChange(newData: Snippet) {
    setList((prevData) =>
      prevData.map((el) => (el.id === newData.id ? newData : el)),
    )
  }

  function handleSnippetDelete(id: string) {
    setList((prev) => {
      return prev.filter((el) => el?.id !== id)
    })
  }

  function handleAddSnippet() {
    setList([...list, { id: nanoid(), value: '' }])
  }
}
