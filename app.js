const inputField=document.querySelector('input');

let arrayStore=[];

const submitButton=document.querySelector('.shorten-it');

const shortenContainer=document.querySelector('.shorten-link-container')

const errorMessage=document.querySelector('.error-message');

submitButton.addEventListener('click',async(event)=>{
    event.preventDefault();
    if(inputField.value.length==0){
        errorMessages(inputField,errorMessage);

    }
    else{
        async function shortenLink(){
        const link=inputField.value;
        let linkFound= await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`);
        inputField.classList.remove('red');
        inputField.classList.remove('border-red');
        errorMessage.style.display='none';
        linkFound=await linkFound.json()
        console.log(linkFound)
        if(linkFound.ok==true){
       let number=localStorage.length+1;
       let urlEntered={
        originalLink:linkFound.result.original_link,
        shortLink:linkFound.result.short_link
    }
       localStorage.setItem(`${number}`,JSON.stringify(urlEntered));
   await linkFormation(urlEntered.originalLink,urlEntered.shortLink)
        
        }else if(linkFound.ok==false){
            errorMessages(inputField,errorMessage);
        }

       }
      await  shortenLink();
// copies only the first child write a code that checks which of the divs within the shorten container gave out the event.
        let shortendContainer=document.querySelector('.shorten-link-container');
        shortendContainer.addEventListener('click', async(event)=>{
           if(event.target.classList.contains('copy-button')){
            let copyText=event.target.parentNode.firstChild.innerHTML;
            await navigator.clipboard.writeText(copyText);
           event.target.classList.remove('copy-original-color');
           event.target.classList.add('copied');
            event.target.innerHTML='Copied'

           }
        })
     
    }
 
});

function errorMessages(inputField,errorMessage){
    inputField.classList.add('red');
    inputField.classList.add('border-red');
    errorMessage.style.display='inline';

}

window.addEventListener('load',async()=>{

  onReloadLinkFormation();

})

async function onReloadLinkFormation(){
    if(localStorage.length>5){
    let fragment= new DocumentFragment();

        for(let i=5; i>=1; i--){
            let indexFound=localStorage.key(i);
            let getData=JSON.parse(localStorage.getItem(`${indexFound}`));
    let shortenedLink=document.createElement('div');
    shortenedLink.classList.add('shortened-link');
    let original=document.createElement('p');
    original.classList.add('original-link');
    original.innerHTML=getData.originalLink;
    shortenedLink.prepend(original);
    let shortenResult=document.createElement('div');
    shortenResult.classList.add('shorten-result');
    let resultP=document.createElement('p');
    resultP.classList.add('result-of-shortened-link');
    resultP.innerHTML=getData.shortLink;
    shortenResult.prepend(resultP);
    let buttonCopy=document.createElement('button');
    buttonCopy.classList.add('copy-button','copy-original-color');
    buttonCopy.innerHTML='copy';
    shortenResult.append(buttonCopy);
    shortenedLink.append(shortenResult);
    fragment.append(shortenedLink);
        }
        shortenContainer.append(fragment);
      }
      else {
        let fragment= new DocumentFragment();
        for(let i=localStorage.length; i>0; i--){
            let indexFound=localStorage.key(i);
            let getData=JSON.parse(localStorage.getItem(`${indexFound}`));
    let shortenedLink=document.createElement('div');
    shortenedLink.classList.add('shortened-link');
    let original=document.createElement('p');
    original.classList.add('original-link');
    original.innerHTML=getData.originalLink;
    shortenedLink.prepend(original);
    let shortenResult=document.createElement('div');
    shortenResult.classList.add('shorten-result');
    let resultP=document.createElement('p');
    resultP.classList.add('result-of-shortened-link');
    resultP.innerHTML=getData.shortLink;
    shortenResult.prepend(resultP);
    let buttonCopy=document.createElement('button');
    buttonCopy.classList.add('copy-button','copy-original-color');
    buttonCopy.innerHTML='copy';
    shortenResult.append(buttonCopy);
    shortenedLink.append(shortenResult);
    fragment.append(shortenedLink);
    }
    shortenContainer.append(fragment);
      }
    

}

async function linkFormation(linkOriginal,formedLink){
    let fragment= new DocumentFragment();
    let shortenedLink=document.createElement('div');
    shortenedLink.classList.add('shortened-link');
    let original=document.createElement('p');
    original.classList.add('original-link');
    original.innerHTML=linkOriginal;
    shortenedLink.prepend(original);
    let shortenResult=document.createElement('div');
    shortenResult.classList.add('shorten-result');
    let resultP=document.createElement('p');
    resultP.classList.add('result-of-shortened-link');
    resultP.innerHTML=formedLink;
    shortenResult.prepend(resultP);
    let buttonCopy=document.createElement('button');
    buttonCopy.classList.add('copy-button','copy-original-color');
    buttonCopy.innerHTML='copy';
    shortenResult.append(buttonCopy);
    shortenedLink.append(shortenResult);
    fragment.append(shortenedLink);
    shortenContainer.append(fragment);
}
