const inputField=document.querySelector('input');

const submitButton=document.querySelector('.shorten-it')

submitButton.addEventListener('click',(event)=>{
    event.preventDefault();
    if(inputField.value.length==0){
        inputField.classList.add('red');
        inputField.classList.add('border-red');

    }
})