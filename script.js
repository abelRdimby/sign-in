// const screenHeight = screen.availHeight
// const screenWidth = screen.availWidth
// console.log("ScreenWidth = " +screenWidth + " ScreenHeight = "+ screenHeight )

                

const section = document.getElementsByTagName('section')[0]
const sectionId = document.getElementById("sectionId")
const body = document.getElementsByTagName("body")[0]
console.log(body)

const loadingBlock = document.getElementById("loadingId")
console.log(loadingBlock)

function addSectionAftLoading() {
    loadingBlock.remove()
    body.append(section)
    
}
function removeElement(element){
    element.remove()
}

function loadingWait() {
    removeElement(section) 
} 


setTimeout(addSectionAftLoading,1000)


