
export {};

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            verifyStatusCode(statusCode:number, expectedStatusCode: number): Chainable<number>;
            verifyStatus(expectedStatusCode:number): Chainable<number>;
            verifyNoError():Chainable<void>;
            verifyItemsNotNull( body: any, contentType: string) :Chainable<void>;
            verifyRequiredFieldNotNull(contentType: string, requiredField: string): Chainable<void>;
            verifyBodyNotNull(contentType: string):Chainable<void>;
        }
    }
}

// Repeated across test scripts
Cypress.Commands.add('verifyStatusCode', (statusCode, expectedStatusCode: number) => {
    expect(statusCode).to.eq(expectedStatusCode)
});
Cypress.Commands.add('verifyStatus', ( expectedStatusCode: number) => {
    cy.task('getStatus').then((statusCode) => {
        expect(statusCode).to.eq(expectedStatusCode);
    })   
});
Cypress.Commands.add('verifyNoError', () => {
    cy.task('getBody').then( resBody => { 
            expect(resBody).not.has.property('errors')                
    })  
});
Cypress.Commands.add('verifyItemsNotNull', ( body: any, contentType: string) => {
    expect(body.data).to.have.all.keys(contentType)
    cy.wrap(body.data).its(contentType).then((itemList) =>{
        expect(itemList.items).not.empty
    })
});
Cypress.Commands.add('verifyRequiredFieldNotNull', (contentType: string, requiredField: string) => {
    cy.task('getBody').then(resBody =>{    
        const itemsArr = resBody.data[contentType].items;
        itemsArr.forEach(item => {
            if(contentType === 'all_event' && requiredField === 'publishedDate') {
                expect(item).not.have.property(requiredField)
            }
            else{
                expect(item).property(requiredField).not.null
            }
        }) 
    })
});
Cypress.Commands.add('verifyBodyNotNull', (contentType: string) => {
    cy.task('getBody').then( resBody => { 
        cy.log(contentType)
        if( contentType === 'page_event'){
            cy.wrap(resBody.data).its("page_events").then((itemList) =>{
                expect(itemList.items).not.empty
            })
        } else {
            cy.wrap(resBody.data).its(contentType).then((itemList) =>{
            if(contentType.includes('_basic')||contentType.includes('_content')){
                expect(itemList).not.empty
            }
            else{
                expect(itemList.items).not.empty
            }
            
        })  
    }

    })   
});

Cypress.Commands.add('verifyUrlShouldCorrect', (contentType: string) => {
    var listErrors = [];
    cy.task('getBody').then(resBody =>{    
        const itemsArr = resBody.data[contentType].items;
        itemsArr.forEach(item => {
            
            var count =  item.url.match(new RegExp("\/","g"))?.length;
            if(count === 1){
                var singleError = {}
                singleError['ContentType'] = contentType;
                singleError['Title'] = item.title;
                singleError['URL'] = item.url;
                listErrors.push(singleError);
            }
            //expect(count >= 2).true;
        })
        console.log(listErrors);
        var today = new Date();
        var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
        cy.writeFile(`cypress/fixtures/UrlErrors/${contentType}_${time}.json`, listErrors, { flag: 'a+' });
    })
});