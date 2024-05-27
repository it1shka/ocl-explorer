import { FC, memo, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type Size = {
  width: number
  height: number
}

type ResizerType = FC<{
  children: FC<Size>
}>

const Resizer: ResizerType = ({ children }) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })
  useEffect(() => {
    if (!rootRef.current) return
    const observer = new ResizeObserver((entries) => {
      for (const { contentRect } of entries) {
        const { width, height } = contentRect
        setSize({ width, height })
      }
    })
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Container ref={rootRef}>
      {children(size)}
    </Container>
  )
}

export default memo(Resizer)

const Container = styled.div`
  width: 100%;
  height: 100%;
`
