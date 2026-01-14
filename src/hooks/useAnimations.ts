'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

// Scroll animation hook
export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// Counter animation hook
export function useCountUp(
  end: number,
  duration: number = 2000,
  startOnVisible: boolean = true
) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const startAnimation = useCallback(() => {
    if (hasStarted) return
    setHasStarted(true)

    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOut * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration, hasStarted])

  useEffect(() => {
    if (!startOnVisible) {
      startAnimation()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation()
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [startAnimation, startOnVisible])

  return { ref, count }
}

// Stagger animation for lists
export function useStaggerAnimation(itemCount: number, delay: number = 100) {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the items
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, i])
            }, i * delay)
          }
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [itemCount, delay])

  return { ref, visibleItems, isItemVisible: (index: number) => visibleItems.includes(index) }
}
