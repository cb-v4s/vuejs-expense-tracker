import { onBeforeUnmount, watch } from 'vue'
import type { Ref } from 'vue'

export function useClickOutside(
  elementsToWatch: Ref<any>[],
  callback: () => void,
  isActive: Ref<boolean>,
) {
  const handleClick = (event: MouseEvent) => {
    if (!isActive.value) {
      return
    }

    const target = event.target as HTMLElement

    const clickedInsideAnyElement = elementsToWatch.some((elRef) => {
      const domElement = elRef.value instanceof HTMLElement ? elRef.value : elRef.value?.$el

      return domElement && domElement.contains(target)
    })

    if (!clickedInsideAnyElement) {
      callback()
    }
  }

  watch(
    isActive,
    (active) => {
      if (active) {
        setTimeout(() => {
          document.addEventListener('click', handleClick)
        }, 0)
      } else {
        document.removeEventListener('click', handleClick)
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClick)
  })
}