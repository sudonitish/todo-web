let textarea = document.getElementById("textarea");
let taskCollection = [];
let itemToUpdate = null;
let urlforAdd = "http://localhost:3000/data.json";
let urlforDelete = "http://localhost:3000/delete";
let urlforUpdate = "http://localhost:3000/update";
loadFromServer();
function createDateTime() {
    let sysDate = new Date();
    let date=sysDate.getDate();
    let month=sysDate.getMonth() + 1;
    let HH=sysDate.getHours();
    let MM=sysDate.getMinutes();

    let dT ="" ;
    if(month<10)
    dT+="0";
    dT+=month+"/";
    if (date < 10) {
        dT += "0" + date;
    }
    else {
        dT += date;
    }
    dT+="/"+ sysDate.getFullYear() + " ";
    if (HH % 12 === 0) {
        dT += "12";
    }
    else {
        if(HH<10||(HH>12&&HH<22))
        dT+="0";
        dT+=HH%12;
    }
    dT+=":";
    if(MM<10)
    dT+="0";
    dT+=sysDate.getMinutes()+" ";
    if(HH>=12){ dT+="PM"}
    else{dT+="AM"}
  
    return dT;
}
function loadFromServer() {
    let requestGET = new XMLHttpRequest();
    requestGET.open("GET", "http://localhost:3000/data.json");
    requestGET.send();
    requestGET.addEventListener('load', () => {
        if (requestGET.response === "error occured") 
        {
            alert(requestGET.response,"  ,Please try again after few minutes!");
        }
        else 
        {
            if (requestGET.response === "") {
                taskCollection = [];

            }
            else {
                taskCollection = JSON.parse(requestGET.response);

            }
            afterLoad();
        }

    });
}
function afterLoad(){
    taskCollection.forEach(function (t) {
        addTaskToList(t.id,t.txt, t.fg, t.cdt,t.ddt);
    });
}
function saveToServer(url,nob) {
    let requestPOST = new XMLHttpRequest();
    requestPOST.open("POST", url);
    requestPOST.setRequestHeader('Content-Type', "application/json");
    requestPOST.send(JSON.stringify(nob));
    requestPOST.addEventListener('load', () => {
        console.log(requestPOST.response);
    });
}
function addTaskToList(id,text, flag, cDT,dDT) {

    let tasks = document.getElementById("tasks");
    let list = document.createElement("div");
    let uid=document.createElement("label");
    let task = document.createElement("div");
    let content = document.createElement("div");
    let action = document.createElement("div");

    let input = document.createElement("input");
    let edBtn = document.createElement("button");
    let delBtn = document.createElement("button");

    let cTime = document.createElement("div");
    let cTimeText = document.createElement("span");
    let cTimeDate = document.createElement("span");

    let dTime = document.createElement("div");
    let dTimeText = document.createElement("span");
    let dTimeDate = document.createElement("span");
    let dCurrTime=document.createElement("input");

    let nob = {
        id:id,
        txt: text,
        fg: flag,
        cdt: cDT,
        ddt:dDT
    };
    uid.className="uid";
    uid.innerHTML=id;
    list.className = "list";
    task.className = "li";
    content.className = "content";
    content.innerHTML = text;
    action.className = "action";
    input.type = "checkbox";
    input.className = "checkbox";
    input.checked = flag;
    input.name = "done";

    cTimeText.innerHTML = "Time: ";
    cTimeDate.innerHTML = cDT;
    cTime.className = "cTime";
    cTimeText.className="cTimeText";
    cTimeDate.className="cTimeDate";
    dTimeText.innerHTML = "Deadline: ";
    dTime.className = "dTime";
    dTimeText.className="dTimeText";
    dTimeDate.className="dTimeDate";
    dCurrTime.type="datetime-local";
    dCurrTime.id="deadDT";
    dCurrTime.value=dDT;

    if (input.checked === true) {
        content.style.textDecoration = "line-through";
    }

    edBtn.innerHTML = '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>';
    delBtn.innerHTML = '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>'

    //appending
    action.appendChild(input);
    action.appendChild(edBtn);
    action.appendChild(delBtn);
    task.appendChild(uid);
    task.appendChild(content);
    task.appendChild(action);
    cTime.appendChild(cTimeText);
    cTime.appendChild(cTimeDate);
    dTime.appendChild(dTimeText);
    dTimeDate.appendChild(dCurrTime);
    dTime.appendChild(dTimeDate);
    list.appendChild(task);
    list.appendChild(cTime);
    list.appendChild(dTime);
    tasks.appendChild(list);
    taskCollection.push(nob);
    // if(itemToUpdate===null)
    
    edBtn.addEventListener('click', function () {
        textarea.value = nob.txt;
        itemToUpdate = {
            content: content,
            cTimeDate: cTimeDate,
            nob: nob
        };
        //  console.log(edBtn.parentElement.parentElement.childNodes[0].innerHTML);
    });
    
    delBtn.addEventListener('click', function () {
        // console.log(delBtn.parentElement.parentElement.childNodes[0].innerHTML);
        list.remove();
        let index = taskCollection.indexOf(nob);
        taskCollection.splice(index, 1);
        saveToServer(urlforDelete,nob);
    });
        
    input.addEventListener('change', function () {
        if (input.checked) {
            content.style.textDecoration = "line-through";
        }
        else {
            content.style.textDecoration = "none";
        }
        //  console.log(input.parentElement.parentElement.childNodes[0].innerHTML);
        nob.fg = input.checked;
        saveToServer(urlforUpdate,nob);
    });
    
    dCurrTime.addEventListener('change',()=>{
        nob.ddt=dCurrTime.value;
        //  console.log(dCurrTime.parentElement.parentElement.parentElement.childNodes[0].childNodes[0].innerHTML);
        saveToServer(urlforUpdate,nob)
    })
    return nob;
}
textarea.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        let value = textarea.value.trim();
        let currDateTime = createDateTime();
        let deadDateTime= new Date();
        deadDateTime.setMinutes(deadDateTime.getMinutes()-deadDateTime.getTimezoneOffset());
        deadDateTime=deadDateTime.toISOString().slice(0,16);
        if (value === "") {
            textarea.value = value;
            return;
        }

        if (itemToUpdate === null)
            {let nob = addTaskToList(Date.now(),value, false, currDateTime,deadDateTime);
            saveToServer(urlforAdd,nob);}
        else {
            itemToUpdate.content.innerHTML = value;
            itemToUpdate.cTimeDate.innerHTML = currDateTime;
            itemToUpdate.nob.txt = value;
            itemToUpdate.nob.cdt = currDateTime;
            saveToServer(urlforUpdate,itemToUpdate.nob)
            itemToUpdate = null;
        }

        textarea.value = "";
    }
});

