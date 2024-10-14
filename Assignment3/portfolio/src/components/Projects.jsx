import React, { useState, useEffect } from 'react';
import '../styles/Projects.css';

function Projects() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [projects, setProjects] = useState([]);   // State for projects
  const [loading, setLoading] = useState(true);   // Loading state
  const [error, setError] = useState(null);       // Error state
  const [newProject, setNewProject] = useState({  // State for new project
    title: '',
    description: '',
    technologies: '',
    imageUrl: ''
  });
  const [editProject, setEditProject] = useState(null);  // State for project being edited
  const [showAddProjectModal, setShowAddProjectModal] = useState(false); // Modal visibility state
  const [showEditProjectModal, setShowEditProjectModal] = useState(false); // Edit modal visibility state

  // Fetch projects from backend on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5225/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);   // Store fetched projects in state
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Slide navigation
  const moveSlide = (n) => {
    let newIndex = slideIndex + n;
    if (newIndex >= projects.length) {
      newIndex = 0; // Go back to the first slide
    } else if (newIndex < 0) {
      newIndex = projects.length - 1; // Go to the last slide
    }
    setSlideIndex(newIndex);
  };

  // POST - Add a new project
  const addProject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5225/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
      if (!response.ok) {
        throw new Error('Failed to add project');
      }
      const addedProject = await response.json();
      setProjects([...projects, addedProject]);  // Add the new project to state
      setNewProject({ title: '', description: '', technologies: '', imageUrl: '' }); // Reset form
      setShowAddProjectModal(false); // Close modal
    } catch (err) {
      setError(err.message);
    }
  };

  // PUT - Update an existing project
  const updateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5225/api/projects/${editProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editProject),
      });
      if (!response.ok) {
        throw new Error('Failed to update project');
      }
      const updated = await response.json();
      setProjects(projects.map(project => (project.id === updated.id ? updated : project)));  // Update state
      setEditProject(null);  // Reset edit state
      setShowEditProjectModal(false); // Close modal
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE - Remove a project
  const deleteProject = async (id) => {
    try {
      const response = await fetch(`http://localhost:5225/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete project');
      }
      setProjects(projects.filter(project => project.id !== id));  // Remove from state
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section id="projects">
      <p className="section__text__p1">What I Built</p>
      <h1 className="title">Projects</h1>

      {/* Project Slider */}
      <div className="slider-container">
        <div className="slider-wrapper" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
          {projects.map((project, index) => (
            <div className="slide" key={index}>
              <img src={project.imageUrl} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>Technologies: {project.technologies}</p>
              <div className="button-container">
                <button className="edit-button" onClick={() => { setEditProject(project); setShowEditProjectModal(true); }}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => deleteProject(project.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="prev" onClick={() => moveSlide(-1)}>❮</button>
      <button className="next" onClick={() => moveSlide(1)}>❯</button>

      {/* Modal trigger button for adding new project */}
      <button className="add-project-button" onClick={() => setShowAddProjectModal(true)}>
        Add New Project
      </button>

      {/* Modal for adding new project */}
      {showAddProjectModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={addProject}>
              <h2>Add a New Project</h2>
              <input
                type="text"
                placeholder="Title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Technologies"
                value={newProject.technologies}
                onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
              />
              <input 
                type="text"
                placeholder="Image URL"
                value={newProject.imageUrl}
                onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
              />
              <div className='add-form-button'>
              <button type="submit">Add Project</button>
              <button id='back-button' type="button" onClick={() => setShowAddProjectModal(false)}>Back</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for editing project */}
      {showEditProjectModal && editProject && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={updateProject}>
              <h2>Edit Project</h2>
              <input
                type="text"
                placeholder="Title"
                value={editProject.title}
                onChange={(e) => setEditProject({ ...editProject, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Description"
                value={editProject.description}
                onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Technologies"
                value={editProject.technologies}
                onChange={(e) => setEditProject({ ...editProject, technologies: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={editProject.imageUrl}
                onChange={(e) => setEditProject({ ...editProject, imageUrl: e.target.value })}
              />
              <button type="submit">Update Project</button>
              <button type="button" onClick={() => setShowEditProjectModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
