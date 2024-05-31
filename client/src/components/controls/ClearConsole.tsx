import { memo, useCallback } from 'react'
import Button from '../../primitives/Button'
import {useAppDispatch} from '../../storage/hooks'
import {clearConsole} from '../../storage/results'

const ClearConsole = () => {
  const dispatch = useAppDispatch()
  const handleClear = useCallback(() => {
    dispatch(clearConsole())
  }, [dispatch])

  return (
    <Button onClick={handleClear}>
      Clear Console
    </Button>
  )
}

export default memo(ClearConsole)
