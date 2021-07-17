import { useState, useEffect } from 'react'


export const useOutsideNav = (ref, initialState) => {
  const [isActive, setIsActive] = useState(initialState)

  useEffect(() => {
    const onClick = e => {
      // If the active element exists and is clicked outside of
      if (ref.current !== null && !ref.current.contains(e.target)) {
        setIsActive(!isActive)
      }
    }

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener("click", onClick)
    }

    return () => {
      window.removeEventListener("click", onClick)
    }
  }, [isActive, ref])

  return [isActive, setIsActive]
}
