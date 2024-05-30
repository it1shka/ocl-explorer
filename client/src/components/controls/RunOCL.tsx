import { memo } from 'react'
import Button from '../../primitives/Button'

const RunOCL = () => {
  return (
    <Button $active >
      Run OCL
    </Button>
  )
}

export default memo(RunOCL)
