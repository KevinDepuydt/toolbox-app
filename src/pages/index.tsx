import FeatureList from '@components/pages/home/feature-list/feature-list'


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
        {
          name: 'Image Compress',
          description: 'Reduce the size of JPEG, PNG and WEBP images',
          path: '/image-compress'
        },
        {
          name: 'Image Convert',
          description: 'Convert images format',
          path: '/image-convert'
        }
      ]
    }
  }
}
