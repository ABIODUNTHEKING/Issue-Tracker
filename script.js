function newIssue(){
    let mainissues = JSON.parse(localStorage.getItem('issues'))
    let receivedIssues = document.getElementById('received-issues')

    receivedIssues.innerHTML= ""

    for(let i = 0; i < mainissues.length; i++){
        let id = mainissues[i].id;
        let user = mainissues[i].user;
        let description = mainissues[i].description;
        let fixer = mainissues[i].fixer;
        let priority = mainissues[i].priority;
        let date = mainissues[i].date;
        let status = mainissues[i].status;
    

    receivedIssues.innerHTML = `<div> 
                               <h6>The ISSUE ID: ${id} created on ${date} by ${user}</h6> 
                               <p class="text-center text-info"> ${status} </p>
                               <h3>${description}</h3>
                               <p><i class="fa-regular fa-business-time"></i>${priority} <i class="fa-regular fa-user"></i>${fixer}</p>
                               <a href="#" class="btn btn-warning" onclick="issueResolved(${issueId})">Close</a> 
                               <a href="#" class="btn btn-danger" onclick="deleteIssue(${issueId})">Delete</a>
                               </div>`;
    }

}

document.getElementById('form').addEventListener('submit', saveIssue);

function saveIssue(e) {
    let issueId = chance.guid();
    let issueDescription = document.getElementById('issue').value;
    let issuePriority = document.getElementById('priority').value;
    let issueFixer = document.getElementById('assigned-to').value;
    let issueStatus = 'Open';
    let issue = {
      id: issueId,
      description: issueDescription,
      severity: issuePriority,
      assignedTo: issueFixer,
      status: issueStatus
    }
    
    if (localStorage.getItem('issues') === null) {
      var issues = [];
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
    } else {
      var issues = JSON.parse(localStorage.getItem('issues'));
      issues.push(issue);
      localStorage.setItem('issues', JSON.stringify(issues));
    }
    
    document.getElementById('issueInputForm').reset();
   
    newIssue();
    
    e.preventDefault(); 
  }

