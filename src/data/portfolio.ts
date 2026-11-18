export const skills = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'Rust',
  'Node.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'React Native',
  'Appwrite',
  'Firebase',
  'Docker',
  'WebSocket',
  'Linux',
];

export interface Project {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  image: string;
  href?: string;
}

export interface Education {
  school: string;
  course: string;
  date: string;
}

export const GITHUB_USERNAME = "jeganxthan";

export const projects: Project[] = [
  {
    num: '01',
    title: 'Ridemap',
    desc: 'Built a real-time bus tracking system with geofence alerts for 20,000+ users using Node.js, WebSockets, and Appwrite, improving backend scalability and security.',
    tags: ['TS', 'WebSocket', 'React'],
    image: '/projects/ridemap365.jpeg',
    href: 'https://ridemap.in',
    
  },
  {
    num: '02',
    title: 'JSIP Patent Upload',
    desc: 'Built a patent management system with Tauri and Appwrite, enabling offline-first patent tracking, secure synchronization, and cross-platform access.',
    tags: ['React', 'Appwrite', 'Rust'],
    image: '/projects/jsip.png',
    href: 'https://jsipdash.jmkinnovation.in/',
  },
  {
    num: '03',
    title: 'Print A4',
    desc: 'Built a backend for a print management platform enabling order processing, Razorpay payments, and automated workflows, with secure APIs, authentication, and job queue management.',
    tags: ['Next.js', 'Appwrite'],
    image: '/projects/printa4.png',
    href: 'https://printa4.in',
  },
  {
    num: '04',
    title: 'Anvil',
    desc: 'Anvil is a desktop AI assistant built with Rust and GPUI, designed to bring multiple AI providers into one clean, minimal application.',
    tags: ['Rust', 'GPUI', 'AI'],
    image: '/projects/anvil.png',
    href: 'https://github.com/jeganxthan/Anvil.git',
  },
];

export const education: Education = {
  school: 'Manakula Vinayagar Institute of Technology, Puducherry',
  course: 'B.Tech in AI & ML',
  date: 'July 2026',
};
