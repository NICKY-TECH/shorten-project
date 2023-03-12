const inputField=document.querySelector('input');

let arrayStore=[];

const submitButton=document.querySelector('.shorten-it');

const shortenContainer=document.querySelector('.shorten-link-container')

const errorMessage=document.querySelector('.error-message');

submitButton.addEventListener('click',(event)=>{
    event.preventDefault();
    if(inputField.value.length==0){
        inputField.classList.add('red');
        inputField.classList.add('border-red');
        errorMessage.style.display='inline';

    }else{
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
       localStorage.setItem(`${number}`,JSON.stringify({
        originalLink:linkFound.result.original_link,
        shortLink:linkFound.result.short_link
    }));
        let fragment= new DocumentFragment();
        let shortenedLink=document.createElement('div');
        shortenedLink.classList.add('shortened-link');
        let original=document.createElement('p');
        original.classList.add('original-link');
        original.innerHTML=linkFound.result.original_link;
        shortenedLink.prepend(original);
        let shortenResult=document.createElement('div');
        shortenResult.classList.add('shorten-result');
        let resultP=document.createElement('p');
        resultP.classList.add('result-of-shortened-link');
        resultP.innerHTML=linkFound.result.short_link;
        shortenResult.prepend(resultP);
        let buttonCopy=document.createElement('button');
        buttonCopy.innerHTML='copy';
        shortenResult.append(buttonCopy);
        shortenedLink.append(shortenResult);
        fragment.append(shortenedLink);
        shortenContainer.append(fragment);
        console.log(fragment)


        
        }

       }
       shortenLink();
    }
});