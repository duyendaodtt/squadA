import queryPageContent from "../../PageObjects/query_pages";
import ApiShareObjects from "../../PageObjects/apiSharedObjects";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe(`Query Modular Blocks`, () => {
  beforeEach(() => {});

  const queryGraphql = new queryPageContent();
  const apiExpected = new ApiShareObjects();
  const testData = require("../../fixtures/queryModulaBlocks.json");

  describe("Query Modular Blocks", () => {
    testData.forEach((testDataRow: any) => {
      const testData = {
        contentType: testDataRow.contentType,
        queryBody: testDataRow.queryBody,
        pageContent: testDataRow.pageContent,
      };
      context(`Query Modular Blocks: ${testData.contentType}`, () => {
        it(`Given I send the graphql query for ${testData.contentType} `, () => {
          queryGraphql.queryPageContentApi("masterAPI", testData.queryBody);
          cy.get("@resBody").then((resBody) => {
            cy.task("setStatus", resBody.status);
            cy.task("setBody", resBody.body);
          });
        });

        it("Then I expected status code as 200", () => {
          //apiExpected.verifyStatus(200);
          cy.verifyStatus(200);
        });
        if (
          testData.pageContent !== "modular_content_spotlight" &&
          testData.pageContent !== "modular_content_cards" &&
          testData.pageContent !== "modular_external_link" &&
          testData.pageContent !== "module_latest_content" &&
          testData.pageContent !== "module_link_list" &&
          testData.pageContent !== "modular_event_promo" &&
          testData.pageContent !== "module_section_promo" &&
          testData.pageContent !== "module_section_promo_v2" &&
          testData.pageContent !== "module_three_column_highlight" &&
          testData.pageContent !== "modular_newsletter_promo" &&
          testData.pageContent == "module_featured"
        ) {
          it("And the items list should be not null", () => {
            //apiExpected.verifyBodyNotNull(testData.pageContent);
            cy.verifyBodyNotNull(testData.pageContent);
          });

          it("And Required Field should not be empty", () => {
            //apiExpected.verifyRequiredFieldNotNull(testData.pageContent,"title");
            cy.verifyRequiredFieldNotNull(testData.pageContent, "title");
          });
        } else if (testData.pageContent == "module_featured") {
          it("And the items list should be not null", () => {
            //apiExpected.verifyBodyNotNull(testData.pageContent);
            cy.verifyBodyNotNull(testData.pageContent);
          });
        }

        it("And query not return error", () => {
          //apiExpected.verifyNoError(testData.pageContent);
          cy.verifyNoError(testData.pageContent);
        });
      });
    });
  });
});
