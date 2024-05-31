import { memo, useCallback, useEffect } from 'react'
import Button from '../../primitives/Button'
import {useAppDispatch, useAppSelector} from '../../storage/hooks'
import {verifyCode} from '../../storage/results'
import useNotifications from '../../lib/useNotifications'
import {getMessage} from '../../lib/strings'

const RunOCL = () => {
  const dispatch = useAppDispatch()
  const js = useAppSelector(({ editorJS }) => editorJS.code)
  const ocl = useAppSelector(({ editorOCL }) => editorOCL.code)
  const handleRun = useCallback(() => {
    dispatch(verifyCode({ js, ocl }))
  }, [dispatch, js, ocl])

  const { loading, error } = useAppSelector(({ results }) => results)
  const { addNotification } = useNotifications()
  useEffect(() => {
    if (!error) return
    const message = getMessage(error)
    addNotification({
      variant: 'warning',
      title: 'Error running code',
      message
    })
  }, [addNotification, error])


  return (
    <Button $active 
      onClick={handleRun} 
      $loading={loading}
    >Run OCL</Button>
  )
}

export default memo(RunOCL)
