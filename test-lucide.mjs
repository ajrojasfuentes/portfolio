import * as lucide from 'lucide-react';
const icons = ['Briefcase', 'FlaskConical', 'Rocket', 'CalendarDays', 'ArrowRight', 'MousePointerClick', 'Flag'];
icons.forEach(i => {
  if (!lucide[i]) console.error("Missing icon:", i);
  else console.log("Found:", i);
});
