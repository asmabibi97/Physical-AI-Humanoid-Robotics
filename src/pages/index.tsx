import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ChatbotWidget from '@theme/ChatbotWidget';
import ModuleWidget from '@site/src/components/ModuleWidget';

import styles from './index.module.css';

// Sample module data
const modules = [
  {
    id: 'module-1',
    title: 'Introduction',
    description: 'Overview of Physical AI and Humanoid Robotics fundamentals',
    position: 1,
    path: '/docs/intro',
    subChapters: [
      { id: 'sub-1', title: 'What is Physical AI?', position: 1 },
      { id: 'sub-2', title: 'Humanoid Robotics Overview', position: 2 },
      { id: 'sub-3', title: 'Course Objectives', position: 3 }
    ]
  },
  {
    id: 'module-2',
    title: 'Module 1: ROS 2',
    description: 'Robot Operating System 2 fundamentals and architecture',
    position: 2,
    path: '/docs/module1/',
    subChapters: [
      { id: 'sub-4', title: 'ROS 2 Architecture', position: 1 },
      { id: 'sub-5', title: 'Nodes and Topics', position: 2 },
      { id: 'sub-6', title: 'Services and Actions', position: 3 }
    ]
  },
  {
    id: 'module-3',
    title: 'Module 2: Digital Twin',
    description: 'Creating and managing digital representations of physical systems',
    position: 3,
    path: '/docs/module2/',
    subChapters: [
      { id: 'sub-7', title: 'Digital Twin Concepts', position: 1 },
      { id: 'sub-8', title: 'Simulation Environments', position: 2 },
      { id: 'sub-9', title: 'Real-time Synchronization', position: 3 }
    ]
  },
  {
    id: 'module-4',
    title: 'Module 3: AI-Robot Brain',
    description: 'Integrating AI capabilities into robotic systems',
    position: 4,
    path: '/docs/module3/',
    subChapters: [
      { id: 'sub-10', title: 'Perception Systems', position: 1 },
      { id: 'sub-11', title: 'Decision Making', position: 2 },
      { id: 'sub-12', title: 'Action Execution', position: 3 }
    ]
  }
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

function ModuleSection() {
  return (
    <section className={styles.modulesSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Course Modules
        </Heading>
        <p className={styles.sectionDescription}>
          Explore the modules below to begin your journey into Physical AI and Humanoid Robotics.
          Each module contains comprehensive content and interactive elements to enhance your learning.
        </p>
        <div className={styles.modulesGrid}>
          {modules.map((module) => (
            <ModuleWidget
              key={module.id}
              module={module}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChatbotSection() {
  return (
    <section className={styles.chatbotSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Interactive Chatbot Assistant
        </Heading>
        <p className={styles.sectionDescription}>
          Need help understanding the content? Ask our AI assistant about any topic in the book.
        </p>
        <div className={styles.chatbotContainer}>
          <ChatbotWidget />
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Interactive Book - ${siteConfig.title}`}
      description="Interactive book platform for Physical AI and Humanoid Robotics with embedded chatbot assistance">
      <HomepageHeader />
      <main>
        <ModuleSection />
        <ChatbotSection />
      </main>
    </Layout>
  );
}
