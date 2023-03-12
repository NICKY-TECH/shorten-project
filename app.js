const inputField=document.querySelector('input');

const submitButton=document.querySelector('.shorten-it');

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
       const linkFound= await fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
        inputField.classList.remove('red');
        inputField.classList.remove('border-red');
        errorMessage.style.display='none';
        console.log( await linkFound.json())
       }
       shortenLink();
    }
})