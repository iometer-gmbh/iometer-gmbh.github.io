import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Erste Schritte',
    Svg: require('@site/static/img/img_quick_start_popup.svg').default,
    description: (
      <>
        Erfahre wie du dein IOmeter einrichtest und die ersten Daten erhältst.
      </>
    ),
  },
  {
    title: 'Tipps und Fehlerbehebung',
    Svg: require('@site/static/img/img_meter_reading.svg').default,
    description: (
      <>
        Hier bekommst du zusätzliche Informationen und Hilfe bei deinen Problemen.
      </>
    ),
  },
  {
    title: 'Whitelist',
    Svg: require('@site/static/img/img_meter_reading.svg').default,
    description: (
      <>
        Unsere Kompatibilität mit verschiedenen Zählerherstellern und Modellen findest du hier.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
