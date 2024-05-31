import { memo, useCallback, useState } from 'react'
import Button from '../../primitives/Button'
import { useAppDispatch } from '../../storage/hooks'
import useNotifications from '../../lib/useNotifications'
import { setJSCode } from '../../storage/editorJS'
import { setOCLCode } from '../../storage/editorOCL'
import API from '../../lib/api'
import { toTitle } from '../../lib/strings'
import {getMessage} from '../../lib/strings'

const RandomExample = () => {
  const dispatch = useAppDispatch()
  const { addNotification } = useNotifications()
  const [loading, setLoading] = useState(false)

  const fetchRandomExample = useCallback(async () => {
    try {
      if (loading) return
      setLoading(true)
      const { name, js, ocl } = await API.fetchRandomExample()
      dispatch(setJSCode(js))
      dispatch(setOCLCode(ocl))
      addNotification({
        variant: 'success',
        title: `Example "${toTitle(name)}"`,
      })
    } catch (error) {
      const message = getMessage(error)
      addNotification({
        variant: 'error',
        title: 'Failed to load code example',
        message
      })
    } finally {
      setLoading(false)
    }
  }, [loading, dispatch, addNotification])

  return (
    <Button $loading={loading} onClick={fetchRandomExample}>
      Random Example
    </Button>
  )
}

export default memo(RandomExample)
