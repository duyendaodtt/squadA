class PageContent {
  verifyRequiredFieldNotNull(contentType: string, requiredField: string) {
    cy.log(contentType);
    if (contentType === "page_event") {
      cy.task("getBody").then((resBody) => {
        if (resBody.data["page_events"].content === undefined) {
          const contentBody = resBody.data["page_events"].items[0];
          cy.log(contentBody);
          expect(contentBody[requiredField]).not.null;
        } else {
          const contentBody = resBody.data["page_events"].content;
          cy.log(contentBody);
          expect(contentBody[requiredField]).not.null;
        }
      });
    } else {
      cy.task("getBody").then((resBody) => {
        if (resBody.data[contentType].content === undefined) {
          const contentBody = resBody.data[contentType].items[0];
          cy.log(contentBody);
          expect(contentBody[requiredField]).not.null;
        } else {
          const contentBody = resBody.data[contentType].content;
          cy.log(contentBody);
          expect(contentBody[requiredField]).not.null;
        }
      });
    }
  }
}
export default PageContent;
