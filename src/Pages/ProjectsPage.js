import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";

const projectData = [
  {
    name: "Renewable Energy Projects",
    description:
      "Replacing fossil fuels with clean energy sources like wind and solar.",
    image:
      "https://www.blackridgeresearch.com/uploads/top-new-upcoming-europe-renewable-projects.webp",
  },
  {
    name: "Energy Efficiency Projects",
    description:
      "Improving energy usage in buildings, appliances, and industries.",
    image:
      "https://image.chitra.live/api/v1/wps/67f22df/8b30f043-f7a9-47e3-a2b7-9d37e7871e88/5/Solar-panels-1321142166-679x419.jpg",
  },
  {
    name: "Improved Cookstoves Projects",
    description:
      "Distributing efficient cookstoves to reduce fuel usage and emissions.",
    image:
      "https://a.storyblok.com/f/179543/1360x1020/ff76e89811/cooking-with-quality-improving-cookstoves.jpg",
  },
  {
    name: "Tree Planting and Reforestation",
    description: "Planting trees to absorb CO₂ and restore deforested land.",
    image:
      "https://dva1blx501zrw.cloudfront.net/uploaded_images/us/images/2443/original/shutterstock_604290230.jpg",
  },
  {
    name: "Composting and Organic Waste Management",
    description:
      "Converting organic waste into compost to reduce methane emissions.",
    image:
      "https://www.ecepl.com/wp-content/uploads/2024/03/Earthcare-Blog-Image-7-1024x683.png",
  },
  {
    name: "Waste-to-Energy Projects",
    description:
      "Converting waste into biogas or energy to reduce landfill emissions.",
    image:
      "https://www.astrastreetfurniture.com.au/images/thumbnails/cp_blog_post/33/Article_Images.webp",
  },
];

const ProjectsPage = () => {
  const navigate = useNavigate();

  const handleOrder = (projectName) => {
    navigate("/order-form", { state: { projectType: projectName } });
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Carbon Credit Projects</h1>
        <div style={styles.grid}>
          {projectData.map((project, index) => (
            <ProjectCard
              key={index}
              image={project.image}
              name={project.name}
              description={project.description}
              onOrder={() => handleOrder(project.name)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  page: {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  container: {
    padding: "16px",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    textAlign: "center",
    margin: "20px 0",
    fontSize: "22px",
    color: "#333",
    fontWeight: "600",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    marginTop: "16px",
  },
};

export default ProjectsPage;
