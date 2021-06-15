import { saveAs } from 'file-saver'
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { AppState } from '../../../@core/auth/ngrx-auth/appState';
import { GetUserAction } from '../../../@core/auth/ngrx-auth/auth.actions';
import { currentUserSelector, projectSelector } from '../../../@core/auth/ngrx-auth/auth.reducers';
import { AssumptionService } from '../../../@core/services/assumptions.service';
import { DependencyService } from '../../../@core/services/dependency.service';
import { HighlightService } from '../../../@core/services/highlights.service';
import { IssueService } from '../../../@core/services/issues.service';
import { MeetingService } from '../../../@core/services/meetings.service';
import { PhaseService } from '../../../@core/services/phases.service';
import { RequestService } from '../../../@core/services/requests.service';
import { RiskService } from '../../../@core/services/risks.service';
import { RoleService } from '../../../@core/services/role.service';
import { TaskService } from '../../../@core/services/tasks.service';
import { UserService } from '../../../@core/services/user.service';
import { ProjectService } from '../../../@core/services/projects.service';
import { DecisionService } from '../../../@core/services/meetingDecision.service';
import { DepartementService } from '../../../@core/services/departements.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
    selector: 'ngx-project-details',
    templateUrl: './projectDetails.component.html',
  })
  export class ProjectDetailsComponent implements OnInit { 
    addHighlightWindow : NbWindowRef;
    addIssueWindow : NbWindowRef;
    addAssumptionWindow : NbWindowRef;
    addRiskWindow : NbWindowRef;
    addDependencyWindow:NbWindowRef;
    addTaskWindow : NbWindowRef;
    addMeetingWindow : NbWindowRef;
    updateMeetingWindow : NbWindowRef
    createCRWindow : NbWindowRef;
    updateCRWindow : NbWindowRef;
    createDRWindow : NbWindowRef;
    createMeetDecisionWinodw : NbWindowRef ; 
    addReportWindow : NbWindowRef;
    details;
    report; 
    project = {name : "", departements : [] , forcast  : "" , baselineDate :"" , score : "" , progress : ""}
    updateMeetingGuests;
    planificationPhase={id:"",name:"",status:"",forecastedDate : "" , baselineDate:"" , file :null} ;
    initPhase={id:"",name:"",status:"",forecastedDate : "" , baselineDate:"",file:null} ;
    devPhase= {id:"",name:"",status:"",forecastedDate : "" , baselineDate:"",file:null};
    depPhase= {id:"",name:"",status:"",forecastedDate : "" , baselineDate:"",file :null};
    Raid ={name : "Highlights", items : [] , color : "mediumaquamarine" , icon :"sun-outline"};
    dependencies = [];
    dependencyStatus;
    dependencyBound
    issues; 
    tasks;
    issueStatus;
    issueImpact;
    highlights; 
    risks=[];
    riskProbability;
    riskStatus;
    riskImpact;
    option1="option"
    assumptions = [];
    assumptionStatus;
    userId;
    projectId;
    guests;
    Developers;
    taskDetails;
    darkgrey='darkgrey' ; 
    taskStatus;
    userTask;
    meets
    CRrequests;
    fd;
    file;
    meetFile
    CR="CR";
    DR="DR";
    departement = {CRapprovers : [] , DRapprovers : []} ;
    @ViewChild('addReportTemplate') addReportTemplate: TemplateRef<any>;
    @ViewChild('addHighlightTemplate') addHighlightTemplate: TemplateRef<any>;
    @ViewChild('createMeetDecisionTemplate') createMeetDecisionTemplate: TemplateRef<any>;
    @ViewChild('addIssueTemplate') addIssueTemplate: TemplateRef<any>;
    @ViewChild('addRiskTemplate') addRiskTemplate: TemplateRef<any>;
    @ViewChild('addDependencyTemplate') addDependencyTemplate: TemplateRef<any>;
    @ViewChild('addAssumptionTemplate') addAssumptionTemplate: TemplateRef<any>;
    @ViewChild('addTaskTemplate') addTaskTemplate: TemplateRef<any>;
    @ViewChild('addMeetingTemplate') addMeetingTemplate: TemplateRef<any>;
    @ViewChild('updateMeetingTemplate') updateMeetingTemplate: TemplateRef<any>;
    @ViewChild('CRrequestTemplate') CRrequestTemplate : TemplateRef<any>;
    @ViewChild('updateCRTemplate') updateCRTemplate : TemplateRef<any>;
    @ViewChild('createDRTemplate') createDRTemplate : TemplateRef<any>;
    constructor(
      private store : Store<AppState>, 
      private phaseService : PhaseService , 
      private dependencyService : DependencyService,
      private issueService : IssueService,
      private assumptionService : AssumptionService,
      private riskService : RiskService , 
      private highlightService: HighlightService,
      private userService : UserService ,
      private windowService: NbWindowService ,
      private taskService : TaskService ,
      private roleService : RoleService , 
      private meetingService : MeetingService,
      private requestService : RequestService,
      private projectService : ProjectService,
      private decisionService : DecisionService,
      private departementService : DepartementService,
      private http : HttpClient
    ){
    }
    ngOnInit(){ 
      this.store.dispatch(new GetUserAction)
      this.store.select(currentUserSelector).subscribe((res)=>{
        this.userId=res;
      })
    this.store.select(projectSelector).subscribe((data : any)=>{
      this.projectId=data ;
    this.projectService.getProjectById(data).subscribe((res : any)=>{
      this.project=res.data.getProjectById
      this.getDepartement(this.project.departements[0].id)
    })
    this.getPhases(data)
    this.getRequests(data);
    this.getTasks(data);
    this.getDependencies(data)
    this.getIssues(data);
    this.getRisks(data);
    this.getAssumptions(data)
    this.getHighlights(data) ;
    this.getMeetings(data)
 })
this.details={}
    }
    getPhases(projectId){
      this.phaseService.getPhasesByProject(projectId).subscribe((res : any)=>{

        res.data.getPhasesByProject.forEach(element => {
          if(element.name=="Planification"){
            element.forecastedDate=this.getDate(element.forecastedDate)
            this.planificationPhase=element}
          if(element.name=="Initialization"){
            this.initPhase=element}
          if(element.name=="Development"){
            this.devPhase=element}
          if(element.name=="Deploiement"){
            this.depPhase=element}
          });
      })
    }
getMeetings(projectId){
  this.meets=[]
  this.meetingService.getMeetsByProject(projectId).subscribe((res:any)=>{
  res.data.getMeetsByProject.forEach(element => {
      this.decisionService.getDecisionsByMeeting(element.id).subscribe((data: any )=>{
        element.decisions= data.data.getDecisionsByMeeting;
        this.meets.push(element);
      })
    });

  })
}
getDepartement(id){
  return this.departementService.getDepartementById(id).subscribe((res: any)=>{
    this.departement= res.data.getDepartementById
  })
}
getDependencies(projectId){
  this.dependencies=[]
  this.dependencyService.getDependencyByProject(projectId).subscribe((res:any)=>{
    this.dependencies=res.data.getDependencyByProject

  })
}
getAssumptions(projectId){
  this.assumptions=[]
      this.assumptionService.getAssumptionsByProject(projectId).subscribe((res:any)=>{
        this.assumptions=res.data.getAssumptionsByProject
      })
    }
getRisks(projectId){
  this.risks=[]
  this.riskService.getRisksByProject(projectId).subscribe((res:any)=>{
    this.risks=res.data.getRisksByProject  
  })
}
getHighlights(projectId){
      this.highlights=[]
      this.highlightService.getHighlightsByProject(projectId).subscribe((res:any)=>{
        this.highlights=res.data.getHighlightsByProject
        this.Raid.items=this.highlights
      }) 
    }
  
getIssues(projectId){
      this.issues=[]
      this.issueService.getIssuesByProject(projectId).subscribe((res:any)=>{
        this.issues=res.data.getIssuesByProject
  })
  }
  getTasks(projectId){
    this.tasks=[]
this.taskService.getTasksByProject(projectId).subscribe((res : any)=>{

  this.tasks=res.data.getTasksByProject
})
  }
  getRequests(projectId){
    this.CRrequests=[]
    this.requestService.getRequestsByProject(projectId).subscribe((res:any)=>{
      this.CRrequests=res.data.getRequestsByProject
    })
  }
showAllDeps(){
  this.Raid.name="Dependencies"
  this.Raid.color="cadetblue"
  this.Raid.items=this.dependencies
}
showAllAssumptions(){
  this.Raid.icon="bulb-outline"
  this.Raid.name="Assumptions"
  this.Raid.color="darkgrey"
  this.Raid.items=this.assumptions
}
showAllHighlights(){
  this.Raid.icon="layers-outline"
  this.Raid.color="mediumaquamarine"
  this.Raid.name="Highlights"
  this.Raid.items=this.highlights
}
showAllIssues(){
  this.Raid.icon="alert-circle-outline"
  this.Raid.color="burlywood"
  this.Raid.name="Issues"
  this.Raid.items=this.issues
}
showAllRisks(){
  this.Raid.color="close-outline"
  this.Raid.color="indianred"
  this.Raid.name="Risks"
  this.Raid.items=this.risks
}
openCreateHighlightWindow(){
 this.addHighlightWindow = this.windowService.open(this.addHighlightTemplate, { title: `Create New Highlight`,context: {description :"" } });
}
createHighlight(data){
  this.highlightService.createHighlight(this.userId.user.id,this.projectId,data).subscribe(()=>{
    this.getHighlights(this.projectId)
  })
  this.addHighlightWindow.close();
}
openCreateIssueWindow(){
  this.addIssueWindow = this.windowService.open(this.addIssueTemplate, { title: `Create New Issue`,
  context: {description :"" , Status : "opened" , Impact : "high" , actionPlan: "" } });
 }
 selectStatus($event){
   this.issueStatus=""
   if($event==1){
    this.issueStatus="opened"
   }
   else{
     if($event==2){
      this.issueStatus="unde Mitigation"
     }
     else{
      this.issueStatus="Resolved"
     }
   }
 }
 selectImpact($event){
   this.issueImpact=""
  if($event==1){
    this.issueImpact="Low"
  }
  else{
    if($event==2){
      this.issueImpact="Medium"
    }
    else{
      this.issueImpact="High"
    }
  }
}
createIssue(description,status,impact,actionPlan){
  this.issueService.createIssue(this.userId.user.id,this.projectId,description,this.issueStatus,this.issueImpact , actionPlan).subscribe(()=>{
    this.getIssues(this.projectId)
this.showAllIssues()  })
  this.addIssueWindow.close();
}
openCreateRiskWindow(){
  this.addRiskWindow = this.windowService.open(this.addRiskTemplate, { title: `Create New risk`,context: {description :""  , targetMitigationDate:"",MitigationPlan:""} });
 }
 selectRiskStatus($event){
  this.riskStatus=""
  if($event==1){
   this.riskStatus="opened"
  }
  else{
    if($event==2){
     this.riskStatus="unde Mitigation"
    }
    else{
     this.riskStatus="Resolved"
    }
  }
}
selectRiskImpact($event){
  this.riskImpact=""
 if($event==1){
   this.riskImpact="Low"
 }
 else{
   if($event==2){
     this.riskImpact="Medium"
   }
   else{
     this.riskImpact="High"
   }
 }
}
selectRiskProbabilit($event){
  this.riskProbability=""
 if($event==1){
   this.riskProbability="Low"
 }
 else{
   if($event==2){
     this.riskProbability="Medium"
   }
   else{
     this.riskProbability="High"
   }
 }
}
 
 createRisk(data){
this.riskService.createRisk(
  this.userId.user.id,
  this.projectId,
  data.description,
  this.riskProbability,
  this.riskImpact,
  data.targetMitigationDate,
  data.MitigationPlan,
  this.riskStatus
  ).subscribe(()=>{
this.getRisks(this.projectId);
    this.addRiskWindow.close()
  })
}
openCreateDependencyWindow(){
  this.addDependencyWindow=this.windowService.open(this.addDependencyTemplate,{title: `Create New dependency` , context : {description : "" , Bound : ""}})
}
selectDependencyStatus($event){
  this.dependencyStatus="";
  if($event==1){
    this.dependencyStatus="Identified"
  }
  else{
    if($event==2){
      this.dependencyStatus="Monitored"
    }
    else{
      this.dependencyStatus="Closed"
    }
  }
}
selectDependencyBound($event){
  this.dependencyBound="";
  if($event==1){
    this.dependencyBound="InBound"
  }
  else{
    this.dependencyBound="outBound"}
}
createDependency(data){
  this.dependencyService.createDependency(this.projectId, this.userId.user.id,data.description , this.dependencyStatus,this.dependencyBound).subscribe(()=>{
    this.getDependencies(this.projectId);
    this.addDependencyWindow.close()
  });
}
openCreateAssumptionWindow(){
  this.addAssumptionWindow=this.windowService.open(this.addAssumptionTemplate,{title: `Create New assumption` , context : {description : ""}})
}
selectAssumptionStatus($event){
  this.assumptionStatus="";
  if($event==1){
    this.assumptionStatus="opened"
  }
  else{
    this.assumptionStatus="closed"}
}
createAssumption(data){
  this.assumptionService.createAssumption(this.projectId, this.userId.user.id,data ,this.assumptionStatus).subscribe(()=>{
    this.getAssumptions(this.projectId);
    this.addAssumptionWindow.close()
  })
}
showDetails(data){
  this.details=data;
this.details.dateRaised=this.getDate(this.details.dateRaised);
}

openCreateTaskWindow(){
  this.Developers=[]
  this.roleService.getRolesByPermission(1).subscribe((res:any)=>{
  res.data.getRolesByPermission.forEach(element => {
  this.userService.getUsersByRole(element.id).subscribe((data: any)=>{
    for(let u of data.data.getUsersByRole){
    this.Developers.push(u)}
  })
});
  this.addTaskWindow=this.windowService.open(this.addTaskTemplate ,{title:"create new Task" , context:{description :"",budget : 0 , startDate:"" ,endDate:"" , developers : this.Developers }})
})
}
selectUser($event){
  this.userTask =$event 
}
selectTaskStatus($event){
if($event==1){
  this.taskStatus = "new"
}
else {
  if($event==2){
    this.taskStatus="in progress"
  }
  else{
    this.taskStatus="done"
  }
}}
createTask(data){
  this.taskService.createTask(this.userTask,this.projectId,data.description ,data.budget,this.taskStatus,data.startDate,data.endDate).subscribe(()=>{
    this.getTasks(this.projectId);
    this.addTaskWindow.close();
  })
}
setTaskStatus(item){
  const idx=this.tasks.indexOf(item)
  this.taskService.setTaskStatus(item.id).subscribe((res:any)=>{
    this.tasks[idx].status=res.data.setTaskStatus.status
  })
}
showTaskDetails(item){
  this.taskDetails=item
}
openCreateMeetingWindow(){
  this.guests=[]
  this.userService.getUsers().subscribe((data:any)=>{
    data.data.getUsers.forEach(element => {
      this.guests.push({checked : false,user : element})
    });
  })

  
this.addMeetingWindow= this.windowService.open(this.addMeetingTemplate, {title:"create meeting" , context:{ subject:"",location:"", duration :"" , startDate:""}})
}
toggle(guest){
 const index= this.guests.indexOf(guest)

 this.guests[index].checked=true;
}
createMeeting(data){
  var meetingGuests =[];
  this.guests.forEach(element => {
    if(element.checked){
      meetingGuests.push(parseInt(element.user.id));
    }
  });
this.meetingService.createMeeting(this.userId.user.id ,this.projectId,data.subject,data.duration,data.location,meetingGuests,data.startDate).subscribe(()=>{
  this.getMeetings(this.projectId);
  this.addMeetingWindow.close();
})
}
openUpdateMeetingWindow(data){
  this.updateMeetingGuests=[]
  this.userService.getUsers().subscribe((res:any)=>{
    res.data.getUsers.forEach(element => {
      const index= data.guests.indexOf(element.name)
      if(index!=-1){
        this.updateMeetingGuests.push({checked : true,user : element})}
      else{
        this.updateMeetingGuests.push({checked : false,user : element})
      }
    });
  })
  this.updateMeetingWindow=this.windowService.open(this.updateMeetingTemplate,{title:"update Meeting", context : {data : data , guests : this.updateMeetingGuests}})
}
updateToggle(guest){
  const index = this.updateMeetingGuests.indexOf(guest)
  this.updateMeetingGuests[index].checked=!(this.updateMeetingGuests[index].checked);
}
updateMeeting(data){
  var newguests=[]
  this.updateMeetingGuests.forEach(element => {
    if(element.checked){
      newguests.push(parseInt(element.user.id))
    }
  });
  if(data.startDate==undefined){
    data.startDate=data.date
  }
  this.meetingService.updateMeeting(data.id,data.subject,data.duration,data.location,newguests,data.startDate).subscribe()
}

openCreateCRWindow(currentDate , phaseId){
  this.createCRWindow = this.windowService.open(this.CRrequestTemplate , {title : "Change Request" , context : { currentDate : currentDate , phase : phaseId , newDate : ""}})
}
createCR(data){
this.requestService.createRequest(this.projectId,this.userId.user.id,data.phase , "CR", data.currentDate,data.newDate,null).subscribe(()=>{
  this.getRequests(this.projectId)
  this.createCRWindow.close();
})
}
openUpdateCR(data){
this.updateCRWindow=this.windowService.open(this.updateCRTemplate,{title:"CR Decision" ,context: {id : data.id,currentDate : data.currentDate , newDate : data.newDate , type:data.type, note:""}})
}
acceptCR(data){
  this.requestService.updateRequest(data.id,this.userId.user.id,data.note,"accepted").subscribe(()=>{
    this.updateCRWindow.close()
    this.getPhases(this.projectId);
  })
}
declineCR(data){
  this.requestService.updateRequest(data.id,this.userId.user.id,data.note,"refused").subscribe(()=>{
  this.updateCRWindow.close()
  })
}
getDate(date){
  var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours=''+d.getHours(),
        mins=''+d.getMinutes()
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if(hours.length<2)
        hours='0'+hours
    if(mins.length<2)
    mins='0'+mins
    return year+'/'+month+'/'+day+' '+hours+':'+mins;
}

upload($event) {
  var operations = {
    query: `
      mutation uploadFile($file: Upload!) {
        uploadFile(file: $file) 
      }
    `,
    variables: {
      file: null
    }
  }
  var _map = { 
    file: ["variables.file"]
  }
  this.file = $event.target.files[0]
this.fd = new FormData()
this.fd.append('operations', JSON.stringify(operations))
this.fd.append('map', JSON.stringify(_map))
this.fd.append('file', this.file, this.file.name)
}
openCreateDRWinodow(data){
  console.log('dropened')
  this.createDRWindow=this.windowService.open(this.createDRTemplate,{title:"Delivery Request",context:{phase : data}})
}
createDR(data){
  this.requestService.createRequest(this.projectId,this.userId.user.id,data.phase , "DR", null,null , this.file.name).subscribe(()=>{
    this.getRequests(this.projectId)
    this.createDRWindow.close();
  })
  this.http.post("http://localhost:3000/graphql",this.fd).subscribe()
}
savefile(file){
  this.requestService.download(file).subscribe((data:any)=>{
    var byteCharacters = atob(data.data.download)
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    const blob = 
    new Blob([byteArray], 
             {type: "text/plain;charset=utf-8"});
             saveAs(blob, file);
  })
}
setPhaseStatus(id){
  this.phaseService.setPhaseStatus(id).subscribe(()=>{
    this.getPhases(this.projectId)
  })
}
openCreateMeetDecisionWindow(meetid){
  this.createMeetDecisionWinodw=this.windowService.open(this.createMeetDecisionTemplate,{title:"Meeting Decision" ,context:{meetID : meetid, name : ""}})
}
 makeDecision(decisionname,meetid){
this.decisionService.upload(decisionname,this.meetFile,meetid).subscribe(()=>{
  this.createMeetDecisionWinodw.close()
})
}
uploadDecision($event){
  this.meetFile=[]
  this.meetFile=$event.target.files;

}
saveDecisionFile(fileName,file_id){
  this.decisionService.download(file_id+'_'+fileName).subscribe((data:any)=>{
    var byteCharacters = atob(data.data.downloadDecision)
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    const blob = 
    new Blob([byteArray], 
             {type: "text/plain;charset=utf-8"});
             saveAs(blob, fileName);
  })
  }
openAddReportWindow(){
  this.addReportWindow = this.windowService.open(this.addReportTemplate, {title:"add report"})
}
uploadReportEvent($event){
  this.report = $event.target.files[0]; 
}
uploadReport(){
  this.projectService.addReportToProject(this.projectId,this.report).subscribe(()=>{
    this.addReportWindow.close();
  })
}
getcolor(status){
  if(status=='delayed'){
  return '#be0000'}
  if(status=='done'){
    return '#ddffbc'
  }
  if(status=='waiting to start'){
    return 'lightblue'
  }
  if(status=='delayed and delivered'){
    return "#d97642"
  }
  if(status=='in progress'){
    return '#fbe0c4'
  }
}
}