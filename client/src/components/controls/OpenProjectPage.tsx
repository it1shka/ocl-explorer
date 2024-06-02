import { memo, useCallback } from 'react'
import Button from '../../primitives/Button'

const OpenProjectPage = () => {
  const handleProjectPage = useCallback(() => {
    const link = 'https://github.com/it1shka/ocl-explorer'
    window.open(link, '_blank')
  }, [])

  return (
    <>
      <div style={{ flex: 1 }}></div>
      <Button 
        onClick={handleProjectPage}
      >Project Page</Button>
    </>
  )
}

export default memo(OpenProjectPage)
