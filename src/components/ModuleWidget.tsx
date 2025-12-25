import React from 'react';
import Link from '@docusaurus/Link';
import './ModuleWidget.css';

interface Module {
  id: string;
  title: string;
  description: string;
  position: number;
  path: string; // Add path for navigation
  subChapters?: Array<{
    id: string;
    title: string;
    position: number;
  }>;
}

interface ModuleWidgetProps {
  module: Module;
}

const ModuleWidget: React.FC<ModuleWidgetProps> = ({ module }) => {
  return (
    <Link to={module.path} className="module-widget-link">
      <div className="module-widget-card">
        <h3 className="module-widget-title">{module.title}</h3>
        <p className="module-widget-description">{module.description}</p>
        {module.subChapters && module.subChapters.length > 0 && (
          <div className="module-subchapters">
            <h4 className="subchapters-title">Sub-Chapters:</h4>
            <ul className="subchapters-list">
              {module.subChapters.map((subChapter) => (
                <li key={subChapter.id} className="subchapter-item">
                  {subChapter.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ModuleWidget;