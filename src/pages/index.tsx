import FeatureList from '@components/home/feature-list/feature-list'


type HomeProps = {
  features: Feature[]
}

export default function Home({ features }: HomeProps) {
  return (
    <FeatureList features={features} />
  )
}

export async function getStaticProps() {
  return {
    props: {
      features: [
        { name: 'Image Compress', description: 'Compress images to reduce their size', path: '/image-compress' },
      ]
    }
  }
}
