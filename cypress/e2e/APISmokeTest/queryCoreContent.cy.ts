
import queryGraphql from "../../support/pages/query_pages"
describe(`Smoke test`, () => {
    beforeEach(() => {
        
      })
    const testData = require("../../fixtures/queryCoreContentTypes.json");
    describe("Query page content", () => {
        testData.forEach((testDataRow: any) => {
            const testData = {
                contentType: testDataRow.contentType,
                queryBody: testDataRow.queryBody,
                pageContent: testDataRow.pageContent
            };
        context(`Query page content: ${testData.contentType}`, ()=>{ 
            it(`Given I send the graphql query for ${testData.contentType} `, () =>{
                queryGraphql.queryPageContentApi('masterAPI', testData.queryBody)
                cy.addContext(Cypress.env('masterAPI'));
                cy.get('@resBody').then(resBody => {
                    cy.task('setStatus', resBody.status);
                    cy.task('setBody', resBody.body)
                 });
            })
        
            it("Then I expected status code as 200", ()=>{
                cy.verifyStatus(200 ) 
            })
            
            it("And the items list should be not null", () =>{
                cy.verifyBodyNotNull(testData.pageContent)     
            })
            it("And Title Field should not be empty", () =>{
                cy.verifyRequiredFieldNotNull(testData.pageContent, 'title');               
            })
            it("And Published Date Field should not be empty", () =>{
                cy.verifyRequiredFieldNotNull(testData.pageContent, 'publishedDate');
            })
            it("And query not return error", () => {
                cy.verifyNoError();
              });
        })
    })
    

})
})
