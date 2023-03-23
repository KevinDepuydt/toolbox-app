import { useState, useEffect } from 'react'
import '@styles/home.module.css'

// type ImageCompressPageProps = {};

export default function ImageCompressPage() {
  useEffect(() => {
    fetch('/api/image-compress')
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
      })
  }, [])

  return (
    <div>
      Image compress page
    </div>
  );
}
