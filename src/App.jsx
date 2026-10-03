import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import LogoLoop from './components/LogoLoop';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiMui,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPhp,
  SiNestjs,
  SiC,
  SiPython,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiPrisma,
  SiN8N,
  SiVercel,
  SiNetlify,
  SiRender,
  SiGithubpages,
} from 'react-icons/si';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

const techLogos = [
  { node: <SiReact style={{ color: '#61dafb' }} />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs style={{ color: '#000000' }} />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTailwindcss style={{ color: '#38bdf8' }} />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiJavascript style={{ color: '#eab308' }} />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { node: <SiTypescript style={{ color: '#3178c6' }} />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiHtml5 style={{ color: '#e34f26' }} />, title: 'HTML5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { node: <SiCss style={{ color: '#1572b6' }} />, title: 'CSS3', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { node: <SiBootstrap style={{ color: '#7952b3' }} />, title: 'Bootstrap', href: 'https://getbootstrap.com' },
  { node: <SiMui style={{ color: '#007fff' }} />, title: 'Material UI', href: 'https://mui.com' },
  { node: <SiNodedotjs style={{ color: '#339933' }} />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiExpress style={{ color: '#555555' }} />, title: 'Express', href: 'https://expressjs.com' },
  { node: <SiMongodb style={{ color: '#47a248' }} />, title: 'MongoDB', href: 'https://www.mongodb.com' },
  { node: <SiMysql style={{ color: '#4479a1' }} />, title: 'MySQL', href: 'https://www.mysql.com' },
  { node: <SiPhp style={{ color: '#777bb4' }} />, title: 'PHP', href: 'https://www.php.net' },
  { node: <SiNestjs style={{ color: '#e0234e' }} />, title: 'NestJS', href: 'https://nestjs.com' },
  { node: <SiC style={{ color: '#a8b9cc' }} />, title: 'C', href: 'https://en.cppreference.com/w/c' },
  { node: <SiPython style={{ color: '#3776ab' }} />, title: 'Python', href: 'https://www.python.org' },
  { node: <SiGit style={{ color: '#f05032' }} />, title: 'Git', href: 'https://git-scm.com' },
  { node: <SiGithub style={{ color: '#333333' }} />, title: 'GitHub', href: 'https://github.com' },
  { node: <SiDocker style={{ color: '#2496ed' }} />, title: 'Docker', href: 'https://www.docker.com' },
  { node: <SiPostman style={{ color: '#ff6c37' }} />, title: 'Postman', href: 'https://www.postman.com' },
  { node: <SiPrisma style={{ color: '#5a67d8' }} />, title: 'Prisma', href: 'https://www.prisma.io' },
  { node: <SiN8N style={{ color: '#ea4b71' }} />, title: 'n8n', href: 'https://n8n.io' },
  { node: <SiVercel style={{ color: '#000000' }} />, title: 'Vercel', href: 'https://vercel.com' },
  { node: <SiNetlify style={{ color: '#00c7b7' }} />, title: 'Netlify', href: 'https://www.netlify.com' },
  { node: <SiRender style={{ color: '#46e3b7' }} />, title: 'Render', href: 'https://render.com' },
  { node: <SiGithubpages style={{ color: '#333333' }} />, title: 'GitHub Pages', href: 'https://pages.github.com' },
];

function App() {
  return (
    <div style={{ fontFamily: 'Poppins, sans-serif' }} className="bg-white text-black">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <div style={{ height: '200px', position: 'relative', overflow: 'hidden', background: '#fff', borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center' }}>
          {/* Basic horizontal loop */}
          <LogoLoop
            logos={techLogos}
            speed={80}
            direction="left"
            logoHeight={48}
            gap={20}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Technology partners"
          />
        </div>
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
