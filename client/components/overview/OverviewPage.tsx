import dynamic from 'next/dynamic'
import React from 'react'
import Container from '../container/Container.component'

import {
  atom_code,
  atom_description,
  atom_notes,
  atom_snippets,
  atom_subTasks,
} from 'jotai/atoms'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import Loading from '../loading/Loading'
import StorageService from 'services/storageService'
import { useRouter } from 'next/router'

const OverviewSection = dynamic(() => import('./OverviewSection'), {
  loading: () => <Loading />,
})

const OverviewPage = () => {
  const [, setTasks] = useAtom(atom_subTasks)
  const [, setDescription] = useAtom(atom_description)
  const [, setSnippets] = useAtom(atom_snippets)
  const [, setNotes] = useAtom(atom_notes)
  const [, setCode] = useAtom(atom_code)

  const router = useRouter()
  const sectionProps = {
    handleReset,
  }

  return (
    <Container>
      <OverviewSection {...sectionProps} />
    </Container>
  )

  function handleReset() {
    StorageService.removeTime('start')
    setTasks(RESET)
    setDescription(RESET)
    setSnippets(RESET)
    setNotes(RESET)
    setCode(RESET)
    router.push('/overview#greeting')
  }
}

export default OverviewPage
