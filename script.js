let form = document.getElementById('form');
form.addEventListener('submit', saveIssue);

function saveIssue(e){
  e.preventDefault()


  let issue = {
      id: chance.guid(),
      description: document.getElementById('issue').value,
      priority: document.getElementById('priority').value,
      fixer: document.getElementById('assigned-to').value,
      status: 'Open',
      user: document.getElementById('issuer').value,
      date: document.getElementById('date').value 
  }

  if(localStorage.getItem('issues') === null){
    let setOfIssues = []
    setOfIssues.push(issue)
    localStorage.setItem('issues', JSON.stringify(setOfIssues))
  }
  else{
    let setOfissues = JSON.parse(localStorage.getItem('issues'))
    setOfissues.push(issue)
    localStorage.setItem('issues', JSON.stringify(setOfissues))
  }

  form.reset();
  newIssue();
}


function newIssue(){ 
  let mainIssues = JSON.parse(localStorage.getItem('issues'))
  let receivedIssues = document.getElementById('received-issues')

  receivedIssues.innerHTML = '';

  for(let i = 0; i < mainIssues.length; i++){
    let id = mainIssues[i].id;
    let user = mainIssues[i].user;
    let description = mainIssues[i].description;
    let fixer = mainIssues[i].fixer;
    let priority = mainIssues[i].priority;
    let date = mainIssues[i].date;
    let status = mainIssues[i].status;
  
  receivedIssues.innerHTML +=   '<div class="well bg-white shadow rounded mt-2 mx-2 py-3 px-5">'+
                                '<h6>Issue ID: ' + id + '</h6>'+
                                '<p><span class="label label-info">' + status + '</span></p>'+
                                '<h3>' + description + '</h3>'+
                                '<p>Issued by ' + user + ' on ' + date + '</p>' +
                                '<p><i class="fa-solid fa-business-time"></i> ' + priority + ' '+
                                '<i class="fa-regular fa-user"></i> ' + fixer + '</p>'+
                                '<a href="#" class="btn btn-success" onclick="closeIssue(\''+id+'\')">Close</a> '+
                                '<a href="#" class="btn btn-danger" onclick="deleteIssue( \''+id+'\')">Delete</a>'+
                                '</div>';
  }

}

function closeIssue(id){
  let issues = JSON.parse(localStorage.getItem('issues'))
  for(let i = 0; i < issues.length; i++){
    if(issues[i].id == id){
      issues[i].status = "Close"
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  newIssue()
}

function deleteIssue(id){
  let issues = JSON.parse(localStorage.getItem('issues'))
  for(let i = 0; i < issues.length; i++){
    if(issues[i].status == "Close"){
      issues.splice(i, 1)
 
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  newIssue()
}






