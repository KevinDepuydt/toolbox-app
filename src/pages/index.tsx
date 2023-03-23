import styles from '@styles/home.module.css';

type FeatureCard = {
  name: string
  description: string
  path: string
}

type HomeProps = {
  features: FeatureCard[]
}

export default function Home({ features }: HomeProps) {
  return (
    <>
      <div className={styles.cards}>
        {features.map((feature) => (
          <FeatureCard key={feature.path} {...feature} />
        ))}
      </div>
    </>
  );
}

function FeatureCard(feature: FeatureCard) {
  return (
    <a href={feature.path} className={styles.card}>
      <h3 className={styles.cardTitle}>{feature.name}</h3>
      <p className={styles.cardDescription}>{feature.description}</p>
    </a>
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
