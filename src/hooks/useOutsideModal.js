import { useEffect } from 'react'


export const useOutsideModal = (ref, callback) => {
  const handleClick = e => {

    if (ref.current && !ref.current.contains(e.target)) {
      if (e.target.getAttribute('viewBox') || e.target.getAttribute('d')) {
        return
      }
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  })
}
