import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  path: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Notion Systems',
    path: "./img/notion_systems.png",
    description: (
      <>
         Links of Notion Pages which can be duplicated with different Systems to gamify all aspect of your life.
      </>
    ),
  },
  {
    title: 'Automations',
    path: "./img/automations.png",
    description: (
      <>
        Create Automations by creating series of trigger and actions of multiple code blocks.
      </>
    ),
  },
  {
    title: 'Third Party Connections',
    path: "./img/third_party_connections.png",
    description: (
      <>
        OAuth and API key connections with lot of third party apps.
      </>
    ),
  },
  {
    title: 'Sample Code Generation',
    path: "./img/sample_code_generation.png",
    description: (
      <>
        Generate Code Blocks related to third party api calls to Notion, OpenAI, Youtube, Google Drive, etc.
      </>
    ),
  },
];

function Feature({title, path, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={path} alt={title} width="100" height="100"/>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
