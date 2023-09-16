const state={
    taskList:[],
};


const taskContent=document.querySelector(".task__contents");
const taskModal=document.querySelector(".task__modal_body");

const HtmlTaskContent=({id,title,description,type,url})=>`
    <div class='col-md-6 col-lg-4 mt-3' id=${id}, key=${id}>
        <div class='card shadow-sm task__card'>
            <div class="card-header d-flex gap-2 justify-content-end task__card_header">
                <button type='button' class='btn btn-outline-info mr-2' name=${id}  onclick='editTask.apply(this,arguments)'>
                   <i class="fa-solid fa-pencil name=${id}"></i>
                </button>
                <button type='button' class='btn btn-outline-danger mr-2'  name=${id} onclick='DeleteTask.apply(this,arguments)'>
                   <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class='card-body mr-2' name=${id}>
              ${
                url ? `<img width='100%' src=${url} alt='card image caption' class='card-image-top mg-2 rounded-lg'/>`:
                `<img width='100%' height='300px' src='https://img.freepik.com/premium-vector/photo-icon-picture-icon-image-sign-symbol-vector-illustration_64749-4409.jpg' alt='card image caption' class='card-image-top mg-2 rounded-lg'/>`
              }
              <h4 class='task__card_title'>${title}</h4>
              <p class='description trim-3-lines text-muted' data-gram_editor='false'>${description}</p>
              <div class='tags text-white d-flex flex-wrap'>
              <span class='badge bg-primary mr-1 '>${type}</span>
          </div>    
            
          </div>

            <div class='card-footer'>
               <button class='btn btn-outline-primary float-right'
               data-bs-toggle='modal' 
               data-bs-target='#showModal'
               id=${id}
               onclick='openTask.apply(this,arguments)'
               type='button'>Open Task</button>
            </div>
        </div>
    </div>
`;


const HtmlModalContent=({id,title,url,description})=>{
    const date=new Date(parseInt(id));
    return `
      <div id=${id}>
      ${
        url ? `<img width='100%' src=${url} alt='card image caption' class='card-image-top mg-2 rounded-lg'/>`:
        `<img width='100%' height='100%' src='https://img.freepik.com/premium-vector/photo-icon-picture-icon-image-sign-symbol-vector-illustration_64749-4409.jpg' alt='card image caption' class='card-image-top mg-2 rounded-lg'/>`
      }
        <strong class='text-sm text-muted'>Created on ${date.toDateString()}</strong>
        <h2 class='my-3'>${title}</h2>
        <p class='lead'>${description}</p>
      </div>
    `;
}

const UpdateLocalStorage=()=>{
    localStorage.setItem("tasks",JSON.stringify({tasks:state.taskList}));

};

const LoadIntialData=()=>{
   const localStorageCopy=JSON.parse(localStorage.tasks);
   if(localStorageCopy) state.taskList=localStorageCopy.tasks;

   state.taskList.map((cardDate) =>{
      taskContent.insertAdjacentHTML("beforeend",HtmlTaskContent(cardDate))
   })
};

const HandleSubmit=(event)=>{
    const id=`${Date.now()}`;
    const input={
        url:document.getElementById('ImageUrl').value,
        title:document.getElementById('TaskTitle').value,
        description:document.getElementById('TaskDec').value,
        type:document.getElementById('TaskType').value,
    }
    if(input.title==='' || input.description==='' || input.type===''){
        return alert("please fill all the fields")
    }
    taskContent.insertAdjacentHTML('beforeend',HtmlTaskContent({
        ...input,
        id,
    })
    );
    state.taskList.push({...input,id});
    UpdateLocalStorage();
};

const openTask=(e)=>{
    if(!e) e=window.event

    const getTask=state.taskList.find(({id})=>id===e.target.id);

    taskModal.innerHTML=HtmlModalContent(getTask);
};

const DeleteTask = (e) => {
    if (!e) e = window.event;
    
    const targetId = e.target.getAttribute("name");
    const type = e.target.tagName;
    const removeItem = state.taskList.filter(({ id }) => id !== targetId);
    state.taskList = removeItem;
    UpdateLocalStorage();
    location.reload()

   
    /* 
    let cardElement = e.target.closest(".task__card");
    
    if (cardElement) {
  
        cardElement.parentNode.removeChild(cardElement);
 
        const removeItem = state.taskList.filter(({ id }) => id !== targetId);
        state.taskList = removeItem;
        UpdateLocalStorage();
    } */
};

const editTask=(e)=>{
    if(!e) e=window.event
    const targetId=e.target.id;
    const type=e.target.tagName;
    let parentNode;
    let title;
    let taskDescription;
    let taskType;
    let submitHandle;

    if(type === "BUTTON"){
        parentNode=e.target.parentNode.parentNode;
    }


    console.log(parentNode.childNodes)
    

};