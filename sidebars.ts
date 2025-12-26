import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Manual sidebar configuration for the book
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: ['intro'],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System (ROS 2 Conceptual)',
      items: [
        'module1/index',
        'module1/1.1-intro',
        'module1/1.2-nodes-topics-services',
        'module1/1.3-rclpy',
        'module1/1.4-urdf'
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Module 2: Digital Twin - Virtual Replicas of Physical Systems',
      items: [
        'module2/index',
        'module2/2.1-gazebo-intro',
        'module2/2.2-physics-collisions',
        'module2/2.3-unity-visualization',
        'module2/2.4-sensor-simulation'
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Module 3: AI-Robot Brain - Vision-Language-Action (VLA) Models',
      items: [
        'module3/index',
        'module3/3.1-isaac-sim',
        'module3/3.2-isaac-ros',
        'module3/3.3-nav2'
      ],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Module 4: Humanoid Robot Development',
      items: ['module4/index'],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Module 5: Conversational Robotics',
      items: ['conversational_robotics/index'],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Module 6: Safety and Best Practices',
      items: ['safety_best_practices/index'],
      collapsed: false
    },
    {
      type: 'category',
      label: 'Module 7: Capstone Project',
      items: ['capstone/index'],
      collapsed: false
    }
  ]
};

export default sidebars;
