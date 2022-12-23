document.getElementById('form').addEventListener('submit', saveIssue);

function saveIssue(e) {
    var issueId = chance.guid();
    var issueDesc = document.getElementById('issue').value;
    var issueSeverity = document.getElementById('priority').value;
    var issueAssignedTo = document.getElementById('assigned-to').value;
    var issueDate = document.getElementById('date').value;
    var issueIssuedBy = document.getElementById('issuer').value;
    var issueStatus = 'Open';
    var issue = {
      id: issueId,
      description: issueDesc,
      severity: issueSeverity,
      assignedTo: issueAssignedTo,
      status: issueStatus,
      issuedBy: issueIssuedBy,
      date: issueDate 
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
    
    document.getElementById('form').reset();
   
    fetchIssues();
    
    e.preventDefault(); 
  }

  function setStatusClosed (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));
  
  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }
    
  localStorage.setItem('issues', JSON.stringify(issues));
  
  fetchIssues();
}

function deleteIssue (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
  }
  

function fetchIssues () {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');
    
    issuesList.innerHTML = '';
    
    for (var i = 0; i < issues.length; i++) {
      var id = issues[i].id;
      var desc = issues[i].description;
      var severity = issues[i].severity;
      var assignedTo = issues[i].assignedTo;
      var status = issues[i].status;
      var issuedBy = issues[i].issuedBy;
      var date = issues[i].date;
      
      issuesList.innerHTML +=   '<div class="well">'+
                                '<h6>Issue ID: ' + id + '</h6>'+
                                '<p><span class="label label-info">' + status + '</span></p>'+
                                '<h3>' + desc + '</h3>'+
                                '<p>Issued by' + ' ' + issuedBy + ' on ' + date + '</p>' +
                                '<p><i class="fa-solid fa-business-time"></i> ' + severity + ' '+
                                '<i class="fa-regular fa-user"></i> ' + assignedTo + '</p>'+
                                '<a href="#" class="btn btn-success" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                                '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                                '</div>';
    }
  }

  