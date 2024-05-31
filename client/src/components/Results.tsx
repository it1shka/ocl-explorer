import { memo, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Controls from './controls'
import { useAppSelector } from '../storage/hooks'

const Results = () => {
  const { entries, loading } = useAppSelector(({ results }) => results)

  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [entries])

  return (
    <Container>
      <Controls />
      <Console ref={listRef}>
        <Mock $size={20} />
        { entries.map((entry, index) => (
          <Log key={index}>{'> '}{entry}</Log>
        )) }
        {loading && <Loading />}
        <Mock $size={50} />
      </Console>
    </Container>
  )
}

export default memo(Results)

const Loading = memo(() => {
  const [dots, setDots] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev + 1) % 3)
    }, 100)
    return () => clearInterval(interval)
  }, [])
  return <Log>Executing{'.'.repeat(dots)}</Log>
})

const Mock = styled.div<{ $size: number }>`
  height: ${({ $size }) => $size}px;
  background-color: transparent;
`

const Log = styled.p`
  color: grey;
  font-size: 1.2em;
  padding: 0.2em 0.5em;
`

const Console = styled.div`
  flex: 1;
  overflow: scroll;
`

const Container = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  border-top: 1px solid #ccc;
  display: flex;
`
