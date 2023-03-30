import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function NotFound() {
  const router = useRouter()
  const [seconds, setSeconds] = useState<number>(5)

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(prev => prev - 1), 1000)
    } else {
      router.replace('/')
    }
  }, [seconds])

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="font-black text-9xl text-gray-100">404</h3>
      <p className="text-xl text-gray-100">Getting back home in {seconds}</p>
    </div>
  )
}