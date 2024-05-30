import { memo } from 'react'
import Button from '../../primitives/Button'

const ClearConsole = () => {
  return (
    <Button>
      Clear Console
    </Button>
  )
}

export default memo(ClearConsole)
