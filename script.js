//your code here
//selected required elements 
const imgContainer = document.querySelector('.container');
const reset = document.querySelector("#reset")
const verify = document.querySelector("#verify")
let images = document.querySelectorAll('img');
let para = document.querySelector("#para");

//created a new image tag for identical image 
let newele = document.createElement('img');

//suffle the images on load and appended identical image
window.addEventListener("load",()=>{shuffle(images);copy(images)});

//creating an array of image from node-list returned by querySelector
let allimages = (function(){
    let imageArr = [];
    let l = images.length;
	while (l--) { 
        imageArr.push(images[l]);
     }
     imageArr.push(newele)
     return imageArr;
})();

// adding event-listener to all images
function addLintener(){
    let selected = [];
    for(let i = 0; i<allimages.length; i++){
        allimages[i].addEventListener("click", (e)=>{
            if(!e.target.classList.contains("selected")){
                e.target.classList.add("selected");
                selected.push(e.target);
                reset.style.display="inline-block";
            }
            else{
                e.target.classList.remove("selected");
                selected.pop();
            }

            //adding event-listener to reset button
            reset.addEventListener("click",()=>{
                reset.style.display="none";
                for(let j = 0; j<allimages.length; j++){
                    allimages[j].classList.remove("selected");
                }
                selected = [];
                para.textContent = "";
                verify.disabled = false;
                verified(selected);
            })

            //condition for buttons to be rendered or not
            if(selected.length==0){
                reset.style.display="none";
            }

            if(selected.length===2){
                verify.style.display = "inline-block";
                verified(selected);
            }
            else{
                verify.style.display = "none";
            }
            console.log(selected);
        })
    }
}

//calling function to add event-listener
addLintener();

// add event-listener to verify button
function verified(selected){
    if(selected.length===2){
        verify.style.display = "inline-block";
    }
    else{
        verify.style.display = "none";
    }

    let allClass = ['img1', 'img2', 'img3', 'img4', 'img5'];
    let bool = true;
    let count = 0;
    verify.addEventListener("click", ()=>{
        console.log("verify");
        console.log(selected);
        verify.style.display = "none"
        for(let k = 0; k < allClass.length; k++){
            if(selected[0].classList.contains(allClass[k]) && selected[1].classList.contains(allClass[k])){
                console.log("same");
                para.textContent = "You are a human. Congratulations!";
                bool = true
                break;
            }
            else{
                para.textContent = "";
                bool = false;
            }
        }
        if(bool===false){
            para.textContent = "We can't verify you as a human. You selected the non-identical tiles."
            console.log("not same");
            count++;
        }
        // if(count === 3){
        //     verify.disabled = true;
        //     count = 0;
        //     alert("Limit reached, You have tried 3 times already!!!")
        // }
    })
    if(selected.length==0){
        reset.style.display="none";
    }
}

// add event listener to c


//function to suffle the images
function shuffle(elems) {
    let allElems = (function(){
        let ret = [], l = elems.length;
        while (l--) { 
            ret[ret.length] = elems[l];
        }
        return ret;
    })();
   
    let shuffled = (function(){
        let l = allElems.length;
        while (l--) {
            let random = Math.floor(Math.random() * allElems.length);
            random = Math.floor(Math.random() * l);
            [allElems[l], allElems[random]] = [allElems[random], allElems[l]];
        }
        return allElems; 
    })(), l = elems.length;
      
    for(let i = 0; i<l; i++){
        imgContainer.appendChild(shuffled[i]);
        // imgContainer.removeChild(elems[l]);
    }
}

//function to create and append random identical image
function copy(element){
	// let newele = document.createElement('img');
    let random = Math.floor(Math.random() * element.length);
    let elem = element[random];
    // let source = elem.src;
    let classN = elem.className;
    // newele.src=source;
    newele.className = classN;

    // console.log(newele);
    imgContainer.appendChild(newele);
}




