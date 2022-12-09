import queryPageContent from "../../PageObjects/query_pages";
import ApiShareObjects from "../../PageObjects/apiSharedObjects";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe(`Query page only`, () => {
  beforeEach(() => {});
  const queryGraphql = new queryPageContent();
  const apiExpected = new ApiShareObjects();

  const testData = require("../../fixtures/queryPage.json");
  describe("Check Query all page only", () => {
    testData.forEach((testDataRow: any) => {
      const testData = {
        contentType: testDataRow.contentType,
        queryBody: testDataRow.queryBody,
        pageContent: testDataRow.pageContent,
      };
      context(`Query page content: ${testData.contentType}`, () => {
        it(`Given I send the graphql query for ${testData.contentType} `, () => {
          queryGraphql.queryPageContentApi("masterAPI", testData.queryBody);
          cy.get("@resBody").then((resBody) => {
            cy.task("setStatus", resBody.status);
            cy.task("setBody", resBody.body);
          });
        });

        it("Then I expected status code as 200", () => {
          //apiExpected.verifyStatus(200 )
          cy.verifyStatus(200);
        });

        it("And the items list should be not null", () => {
          //apiExpected.verifyBodyNotNull(testData.pageContent)
          cy.verifyBodyNotNull(testData.pageContent);
        });
        describe("And Required Field should not be empty", () => {
          it("Title should not be empty", () => {
            //apiExpected.verifyRequiredFieldNotNull(testData.pageContent, 'title');
            cy.verifyRequiredFieldNotNull(testData.pageContent, "title");
            
          });
        });
        it("And query not return error", () => {
          //apiExpected.verifyNoError(testData.pageContent);
          cy.verifyNoError();
        });
      });
    });
  });
});
