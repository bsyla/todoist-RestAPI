import {
  createProject,
  getProject,
  updateCreatedProject,
  deleteCreatedProject,
  createProjectWithoutName,
  updateProjectWithIncorrectColour,
} from "../steps/project.js";

before(async () => {
  createProjectWithoutName();
  createProject();
  updateProjectWithIncorrectColour();
  getProject();
});

it("Project Crud Test Set(Positive And Negative)", () => {
  describe("[POSITIVE]", () => {
    updateCreatedProject();
    getProject();
    deleteCreatedProject();
  });
});
