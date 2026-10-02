const deleteBtn = document.querySelectorAll('.deleteBtn');
for(let btn  of deleteBtn){
    btn.addEventListener('submit', (event)=>{
        let question =  confirm('Are  you sure ,you want to delete the chat?');        
        if(!question){
            event.preventDefault();
        }   
    })
}