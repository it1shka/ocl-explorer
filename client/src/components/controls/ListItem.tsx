import { memo, useCallback, useState } from 'react'
import Button from '../../primitives/Button'
import useNotifications from '../../lib/useNotifications'
import {useAppDispatch} from '../../storage/hooks'
import {toTitle} from '../../lib/strings'
import API from '../../lib/api'
import {setJSCode} from '../../storage/editorJS'
import {setOCLCode} from '../../storage/editorOCL'
import {getMessage} from '../../lib/strings'

type ListItemProps = {
  example: string
}

const ListItem = ({ example }: ListItemProps) => {
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()
  const { addNotification } = useNotifications()
  const handleClick = useCallback(async () => {
    try {
      if (loading) return
      setLoading(true)
      const { name, js, ocl } = await API.fetchParticularExample(example)
      dispatch(setJSCode(js))
      dispatch(setOCLCode(ocl))
      addNotification({
        variant: 'success',
        title: `Loaded example "${toTitle(name)}"`,
      })
    } catch (error) {
      const message = getMessage(error)
      addNotification({
        variant: 'error',
        title: `Error loading example "${toTitle(example)}"`,
        message
      })
    } finally {
      setLoading(false)
    }
  }, [dispatch, addNotification, loading, example])

  return <Button 
    $loading={loading}
    onClick={handleClick}
  >{example}</Button>
}

export default memo(ListItem)
