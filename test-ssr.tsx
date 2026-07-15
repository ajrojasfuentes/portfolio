import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import ExperienceTimeline from './src/components/ExperienceTimeline.tsx';

try {
  const entries = [
    {
      id: '1',
      role: 'Test',
      company: 'Test Co',
      period: '2020 - 2021',
      category: 'job',
      shortDesc: 'A job',
      bodyHtml: '<p>Test</p>'
    }
  ];
  const html = renderToString(createElement(ExperienceTimeline, { entries }));
  console.log("Render successful! Length:", html.length);
} catch (e) {
  console.error("Render failed:", e);
}
