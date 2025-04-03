import { WobbleCard } from "./ui/wobble-card";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
  return (
    <WobbleCard
      containerClassName="h-full bg-secondary/30 border border-secondary/50"
      className="p-0"
    >
      <div className="h-full flex flex-col">
        {/* Project Image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
          <motion.img 
            src={project.image} 
            alt={project.title}
            className="object-cover w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-semibold text-primary">{project.title}</h3>
            <ArrowUpRight className="w-5 h-5 text-primary" />
          </div>

          <p className="text-foreground/70 mb-6 line-clamp-2 flex-grow">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-primary/10">
            {project.demo && (
              <motion.a 
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors group"
                whileHover={{ x: 5 }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </motion.a>
            )}
            {project.github && (
              <motion.a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Github className="w-4 h-4" />
                Source Code
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </WobbleCard>
  );
};

export default ProjectCard;