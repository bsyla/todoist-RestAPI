import { generateCreateProjectRequestBody } from "../utils/generateRequestBody/generateCredentials.js";
import { request } from "../utils/requests.js";

export async function createProject() {
  it("Create Project", async function () {
    const requestBody = await generateCreateProjectRequestBody();

    await request(this, "POST", "/projects", requestBody, true, {
      statusCode: 200,
      expectedValues: [{ path: "name", value: requestBody.name }],
      executionVariables: [
        { path: "id", name: "projectID" },
        { path: "name", name: "projectName" },
        { path: "color", name: "projectColor" },
      ],
      expectedTypes: [
        { path: "id", type: "string" },
        { path: "name", type: "string" },
        { path: "color", type: "string" },
      ],
    });
  });
}

export async function updateCreatedProject() {
  it("Update created Project", async function () {
    const requestBody = await generateCreateProjectRequestBody();

    await request(
      this,
      "POST",
      `/projects/${global.executionVariables["projectID"]}`,
      requestBody,
      true,
      {
        statusCode: 200,
        expectedValues: [
          {
            path: "name",
            value: requestBody.name,
            path: "color",
            value: requestBody.color,
          },
        ],
        expectedTypes: [
          { path: "id", type: "string" },
          { path: "name", type: "string" },
          { path: "color", type: "string" },
        ],
        executionVariables: [
          { path: "id", name: "projectID" },
          { path: "name", name: "projectName" },
          { path: "color", name: "projectColor" },
        ],
      }
    );
  });
}

export async function getProject() {
  it.only("Get project", async function () {
    await request(
      this,
      "GET",
      `/projects/${global.executionVariables["projectID"]}`,
      undefined,
      true,
      {
        statusCode: 200,
        expectedValues: [
          {
            path: "id",
            value: `${global.executionVariables["projectID"]}`,
            path: "name",
            value: `${global.executionVariables["projectName"]}`,
            path: "color",
            value: `${global.executionVariables["projectColor"]}`,
          },
        ],
        expectedTypes: [
          { path: "id", type: "string" },
          { path: "name", type: "string" },
          { path: "color", type: "string" },
        ],
      }
    );
  });
}

export async function deleteCreatedProject() {
  it("Delete created Project", async function () {
    await request(
      this,
      "DELETE",
      `/projects/${global.executionVariables["projectID"]}`,
      undefined,
      true,
      {
        statusCode: 204,
      }
    );
  });
}

export async function createProjectWithoutName() {
  it("[NEGATIVE] - Create Project Without Name", async function () {
    const requestBody = await generateCreateProjectRequestBody();
    requestBody.name = "";

    await request(this, "POST", "/projects", requestBody, true, {
      statusCode: 400,
      notExpectedFields: [], //our response is a blank {} so the validation i made was reversed that 'fields' were undefined
    });
  });
}

export async function updateProjectWithIncorrectColour() {
  it("[NEGATIVE] - Update Project With Incorrect Color", async function () {
    const requestBody = await generateCreateProjectRequestBody();
    requestBody.color = "tangerine";

    await request(
      this,
      "POST",
      `/projects/${global.executionVariables["projectID"]}`,
      requestBody,
      true,
      {
        statusCode: 400,
        notExpectedFields: [],
      }
    );
  });
}
