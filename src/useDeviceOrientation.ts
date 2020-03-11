import { useCallback, useEffect, useState } from 'react'
import { Dimensions, ScaledSize } from 'react-native'

const isOrientationLandscape = ({ width, height }: { width: number; height: number }) => width >= height
const isOrientationPortrait = ({ width, height }: { width: number; height: number }) => height >= width

export default function() {
  const [orientation, setOrientation] = useState(() => {
    const screen = Dimensions.get('screen')
    return {
      portrait: isOrientationPortrait(screen),
      landscape: isOrientationLandscape(screen),
    }
  })

  useEffect(() => {
    const onChange = useCallback(({ screen }: { screen: ScaledSize }) => {
      setOrientation({
        portrait: isOrientationPortrait(screen),
        landscape: isOrientationLandscape(screen),
      })
    }, [])

    Dimensions.addEventListener('change', onChange)

    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  }, [])

  return orientation
}
