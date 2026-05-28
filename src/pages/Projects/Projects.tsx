import { useState } from "react";

import { SiGithub } from "react-icons/si";
import { ScaleLoader } from "react-spinners";
import { AiOutlineEye } from "react-icons/ai";
import { IoMdRefresh } from "react-icons/io";
import { Space, Typography } from "antd";
import { useAnimation, motion } from "framer-motion";

import useProjects from "../../hooks/useProjects";

import styles from "./Projects.module.css";

const { Text, Title } = Typography;

const Projects = () => {
  const controls = useAnimation();
  const [selected] = useState("All");
  const { isLoading, projects, getProjects } = useProjects();

  let filteredProjects = projects;
  if (selected !== "All") {
    filteredProjects = projects.filter(
      (project) => project.madeWith === selected,
    );
  }

  const Loader = (
    <div className={styles.loading}>
      <ScaleLoader color="#701bf8" height={50} width={10} />
    </div>
  );

  const refresher = (
    <div className={styles.refresh} onClick={getProjects}>
      <IoMdRefresh size={40} />
    </div>
  );

  return (
    <div className={styles.projects} id="Projects">
      <Title level={3} className={styles.title}>
        Projects
      </Title>
      <Title className={styles.subtitle}>My Creative Project Section</Title>

      {isLoading ? (
        Loader
      ) : projects.length === 0 ? (
        refresher
      ) : (
        <motion.div animate={controls} className={styles.container}>
          {filteredProjects.map((project, index) => {
            return <Project key={index} {...project} />;
          })}
        </motion.div>
      )}
    </div>
  );
};

export default Projects;

interface projectProps {
  image: string;
  title: string;
  madeWith: string;
  git: string;
  link: string;
}

const Project: React.FC<projectProps> = ({
  image,
  title,
  madeWith,
  git,
  link,
}) => {
  const [overlay, setOverlay] = useState(false);
  return (
    <Space
      orientation="vertical"
      className={styles.project}
      onMouseEnter={() => setOverlay(true)}
      onMouseLeave={() => setOverlay(false)}
    >
      <div className={styles.imageContainer}>
        <img src={image} className={styles.image} />
        {overlay && (
          <div className={styles.overlay}>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className={styles.button}
              >
                <AiOutlineEye />
              </a>
            )}
            <a
              href={git}
              target="_blank"
              rel="noreferrer"
              className={styles.button}
            >
              <SiGithub />
            </a>
            <Text strong className={styles.madeWith}>
              {madeWith}
            </Text>
          </div>
        )}
      </div>
      <Title level={4} className={styles.projectName}>
        {title}
      </Title>
    </Space>
  );
};
