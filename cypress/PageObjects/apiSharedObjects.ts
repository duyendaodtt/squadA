import { JsonFormatter } from "@cucumber/cucumber"
import cypress from "cypress"
import { any } from "cypress/types/bluebird"


class ApiShareObjects {
    verifyStatusCode(statusCode, expectedStatusCode: number) {
            expect(statusCode).to.eq(expectedStatusCode)
    }

    verifyStatus(expectedStatusCode) {
        cy.task('getStatus').then((statusCode) => {
            expect(statusCode).to.eq(expectedStatusCode)
            
        })   
    }

    verifyItemsNotNull( body: any, contentType: string) {

        expect(body.data).to.have.all.keys(contentType)
        cy.wrap(body.data).its(contentType).then((itemList) =>{
            expect(itemList.items).not.empty
        })
        
    }

    verifyBodyNotNull(contentType: string){
        cy.task('getBody').then( resBody => { 
            cy.log(contentType)
            if(contentType.includes('page_event')){
                cy.wrap(resBody.data).then((itemList) =>{
                    expect(itemList).not.empty
                })  
            }
            else {
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
    }
    verifyRequiredFieldNotNull(contentType: string, requiredField: string){
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
    }
    // update later. Check URL contains at least 2 items
    verifyUrlShouldHaveAtleastTwoSlash(contentType: string, findRegex: string){
        cy.task('getBody').then(resBody =>{    
            const itemsArr = resBody.data[contentType].items;
            itemsArr.forEach(item => {
                var count =  item.match(new RegExp(findRegex,"g") || [])?.length
                expect(count).greaterThan(1);
            })

        })
    }

    verifyNoError(contentType: string){
        cy.task('getBody').then( resBody => { 
                expect(resBody).not.has.property('errors')                
        })  
    }

    verifyNavigationNotNull(contentType: string){
        cy.task('getBody').then(resBody =>{    
            const itemsArr = resBody.data['navigation'];
            cy.log(itemsArr);
           // expect(itemsArr['informaBar']).has.not.null
            expect(itemsArr['logo'].url).has.not.null
            //expect(itemsArr['mainMenuItems']).has.not.null
            //expect(itemsArr['secondaryMenu']).has.not.null
            //expect(itemsArr['sideNavSections']).has.not.null
        })
    }

    verifyFooterNotNull(contentType: string){
        cy.task('getBody').then(resBody =>{    
            const itemsArr = resBody.data['footer'];
            cy.log(itemsArr);
           // expect(itemsArr['informaBar']).has.not.null
            expect(itemsArr['logo'].url).has.not.null
            //expect(itemsArr['mainMenuItems']).has.not.null
            //expect(itemsArr['secondaryMenu']).has.not.null
            //expect(itemsArr['sideNavSections']).has.not.null
        })
    }

}

export default ApiShareObjects