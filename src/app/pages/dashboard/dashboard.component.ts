import {Component, OnDestroy, OnInit} from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { UserService } from '../../@core/services/user.service';
import { TaskService } from '../../@core/services/tasks.service';
import * as Highcharts from 'highcharts';
import { AppState } from '../../@core/auth/ngrx-auth/appState';
import { Store } from '@ngrx/store';
import { GetUserAction } from '../../@core/auth/ngrx-auth/auth.actions';
import { currentUserSelector, projectSelector } from '../../@core/auth/ngrx-auth/auth.reducers';
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  data ;
  ChartData;
  selectedRaid
  projectsData =[]; 
  taskData = []
  highcharts = Highcharts;
  
   chartOptions={         
       chart : {
          zoomType: 'xy'
       },
       title : {
          text: ''   
       },   
       subtitle : {
          text: ''
       },
       xAxis : {
          categories: [],
          crosshair: true
       },
       yAxis : [
          { // Primary yAxis
             labels: {
                format: '{value}',
                style: {
                   color: Highcharts.getOptions().colors[1]
                }
             },
             title: {
                text: 'Temperature',
                style: {
                   color: Highcharts.getOptions().colors[1]
                }
             },
             opposite: true
          }, 
          { // Secondary yAxis
             title: {
                text: 'tasks',
                style: {
                   color: Highcharts.getOptions().colors[0]
                }
             },
             labels: {
                format: '{value}',
                style: {
                   color: Highcharts.getOptions().colors[0]
                }
             }
          },
          { // Tertiary yAxis
             gridLineWidth: 0,
             title: {
                text: 'vacations',
                style: {
                   color: Highcharts.getOptions().colors[1]
                }
             },
             labels: {
                format: '{value}',
                style: {
                   color: Highcharts.getOptions().colors[1]
                }
             },
             opposite:true  
          }
       ],
       tooltip: {
          shared: true
       },
       legend: {
          enabled:false
       },
       series : [
          {
             name: 'tasks',
             type: 'column',
             yAxis: 1,
             data: [],
             tooltip: {
                valueSuffix: ''
             }
          }, 
          {
             name: 'vacation',
             type: 'spline',
             yAxis: 2,
             data: [],
             marker: {
                enabled: false
             },
             dashStyle: 'shortdot',
             tooltip: {
                valueSuffix: ''
             }
          },
          {
             name: 'absences',
             type: 'spline',
             data: [],
             tooltip: {
                valueSuffix: ''
             }
          }
       ]
    };
  constructor( private userService : UserService ,
    private taskService :  TaskService  ,
    private store : Store<AppState>,
    ) {
   

  }

  ngOnInit(){
    this.store.dispatch(new GetUserAction)
    this.store.select(currentUserSelector).subscribe((data : any)=>{
      console.log("user",data)
    this.getMonths(data.user.id)
   const New = {label : "new" , number : 0}
   const in_progress = {label : "in progress" , number : 0}
   const done = {label : "done" , number : 0}

    this.taskService.getTasksByUser(data.user.id).subscribe((res : any )=>{
      res.data.getTasksByUser.forEach(element => {
        if(element.status=="new"){
          New.number+=1
        }
        else{
          if(element.status=="done"){
            done.number+=1
          }
          else{
            in_progress.number+=1
          }
        }

    })
    this.taskData=[New, in_progress,done] ;
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("tasks", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 1;

chart.data =
this.taskData
var series = chart.series.push(new am4charts.PieSeries());
series.dataFields.value = "number";
series.dataFields.category = "label";
series.labels.template.disabled = true;
series.slices.template.cornerRadius = 5;
series.colors.step = 3;
chart.legend = new am4charts.Legend();

  })
    this.userService.getData(data.user.id).subscribe((res: any)=>{
      this.data= res.data.getUserWithProjects.projects;
      this.ChartData=[]
      const opened = {label : "opened" ,  number : 0}
      const underMitigation = {label : "under Mitigation" ,  number : 0}
      const Resolved = {label : "Resolved" ,  number : 0}
      const activeAndPrior={label : "active & prior" , number : 0}
      const activeAndnotPrior={label : "active & not prior" , number : 0}
      const inactiveAndPrior={label : "inactive &  prior" , number : 0}
      const inactiveAndnotPrior= {label : "inactive & not prior" , number : 0}


     for(let p of this.data){
       if (p.status=="active"){
         if(p.priority){
           activeAndPrior.number+=1
         }
         else{
          activeAndnotPrior.number+=1
         }
       }
       else{
         if(p.priority){
          inactiveAndPrior.number+=1
         }
         else{
          inactiveAndnotPrior.number+=1
         }
       }
       for(let i of p.issues){
        if(i.status=="opened"){
          opened.number+=1
        }
        else{
          if(i.status=="under Mitigation"){
            underMitigation.number+=1
          }
          else{
            Resolved.number+=1
          }
        }
       }
     }
     this.projectsData=[activeAndPrior ,inactiveAndPrior,activeAndnotPrior,inactiveAndnotPrior ]
     this.ChartData=[opened, underMitigation,Resolved]
    this.showProjectData()
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 1;

chart.data =
this.ChartData
chart.innerRadius = am4core.percent(40);
var series = chart.series.push(new am4charts.PieSeries());
series.dataFields.value = "number";
series.dataFields.category = "label";
series.labels.template.disabled = true;
series.slices.template.cornerRadius = 5;
series.colors.step = 3;
chart.legend = new am4charts.Legend();

})
    })
  }
  showProjectData(){
    am4core.useTheme(am4themes_animated);

var chart = am4core.create("div", am4charts.XYChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.data = this.projectsData
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "label";

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
// axis break
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryX = "label";
series.dataFields.valueY = "number";
series.columns.template.tooltipText = "{valueY.value}";
series.columns.template.tooltipY = 0;
series.columns.template.strokeOpacity = 0
series.columns.template.adapter.add("fill", (fill, target) => {
  return chart.colors.getIndex(target.dataItem.index+50);
});
  }
  change($event){
   
   
    switch($event){
      case "1" : {
        const opened = {label : "opened" ,  number : 0}
        const underMitigation = {label : "under Mitigation" ,  number : 0}
        const Resolved = {label : "Resolved" ,  number : 0}
    for(let p of this.data){
     for(let i of p.issues){
      if(i.status=="opened"){
        opened.number+=1
      }
      else{
        if(i.status=="under Mitigation"){
          underMitigation.number+=1
        }
        else{
          Resolved.number+=1
        }
      }
     }
   }
    this.ChartData=[opened, underMitigation,Resolved]
          break ;
      }
      case "2" : {
        const opened = {label : "opened" ,  number : 0}
        const closed = {label : "closed" ,  number : 0}
    for(let p of this.data){
     for(let i of p.assumption){
      if(i.status=="opened"){
        opened.number+=1
      }
      else{
       closed.number+=1
      }
     }
   }
    this.ChartData=[opened,closed]       
    break ;
      }
      case "3" : {
        const opened = {label : "opened" ,  number : 0}
        const underMitigation = {label : "under Mitigation" ,  number : 0}
        const Resolved = {label : "Resolved" ,  number : 0}
    for(let p of this.data){
     for(let i of p.risks){
      if(i.RiskStatus=="opened"){
        opened.number+=1
      }
      else{
        if(i.RiskStatus=="under Mitigation"){
          underMitigation.number+=1
        }
        else{
          Resolved.number+=1
        }
      }
     }
   }
    this.ChartData=[opened, underMitigation,Resolved]
        break ;
      }
      case "4" : {
        const identified = {label : "identified" ,  number : 0}
        const monitored = {label : "monitored" ,  number : 0}
        const closed = {label : "closed" ,  number : 0}
    for(let p of this.data){
     for(let i of p.risks){
      if(i.status=="identified"){
        identified.number+=1
      }
      else{
        if(i.status=="monitored"){
          monitored.number+=1
        }
        else{
          closed.number+=1
        }
      }
     }
   }
    this.ChartData=[identified, monitored,closed]       
     break ;
      }
    }
 
      am4core.useTheme(am4themes_animated);
      let chart = am4core.create("chartdiv", am4charts.PieChart);
      chart.hiddenState.properties.opacity = 1;
      chart.data =this.ChartData
      chart.innerRadius = am4core.percent(40);
      var series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = "number";
      // series.dataFields.radiusValue = "number";
      series.dataFields.category = "label";
      series.labels.template.disabled = true;
      series.slices.template.cornerRadius = 5;
      series.colors.step = 3;
      chart.legend = new am4charts.Legend();
  }
  getMonths(id){
  let months = [] ;
  const current = new Date() ;
  for(let i of [6,5,4,3,2,1,0] ){
  let month = new Date()
  month.setMonth(current.getMonth()-i)
  months.push( month.toLocaleString('default', { month: 'long' }))
  }
 let tasks=[0,0,0,0,0,0,0]
 let vacation = [0,0,0,0,0,0,0]
 let absences = [0,0,0,0,0,0,0]

this.taskService.getTasksByUser(id).subscribe((res : any)=>{
  res.data.getTasksByUser.forEach(element => {
  let index 
  index=  months.indexOf(new Date(element.endDate).toLocaleString('default', { month: 'long' }))
  if(index!=-1){
  tasks[index]+=1
  }
  });
  this.userService.getData(id).subscribe((res : any)=>{
    console.log("hhhh", res.data.getUserWithProjects)
     for(let v of res.data.getUserWithProjects.vacation){

      let index 
  index=  months.indexOf(new Date(v.endDate).toLocaleString('default', { month: 'long' }))
  if(index!=-1){
    vacation[index]+=1
    }}
    for(let a in res.data.getUserWithProjects.absences){
    let index 
    index=  months.indexOf(new Date(a).toLocaleString('default', { month: 'long' }))
    if(index!=-1){
      absences[index]+=1
    }}

  this.chartOptions  = 
  {         
      chart : {
         zoomType: 'xy'
      },
      title : {
         text: ''   
      },   
      subtitle : {
         text: ''
      },
      xAxis : {
         categories: months,
         crosshair: true
      },
      yAxis : [
         { // Primary yAxis
            labels: {
               format: '{value}',
               style: {
                  color: Highcharts.getOptions().colors[1]
               }
            },
            title: {
               text: 'absences',
               style: {
                  color: Highcharts.getOptions().colors[1]
               }
            },
            opposite: true
         }, 
         { // Secondary yAxis
            title: {
               text: 'tasks',
               style: {
                  color: Highcharts.getOptions().colors[0]
               }
            },
            labels: {
               format: '{value}',
               style: {
                  color: Highcharts.getOptions().colors[0]
               }
            }
         },
         { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
               text: 'vacations',
               style: {
                  color: Highcharts.getOptions().colors[1]
               }
            },
            labels: {
               format: '{value}',
               style: {
                  color: Highcharts.getOptions().colors[1]
               }
            },
            opposite:true  
         }
      ],
      tooltip: {
         shared: true
      },
      legend: {
         enabled:false
      },
      series : [
         {
            name: 'tasks',
            type: 'column',
            yAxis: 1,
            data: tasks,
            tooltip: {
               valueSuffix: ''
            }
         }, 
         {
            name: 'vacation',
            type: 'spline',
            yAxis: 2,
            data: vacation,
            marker: {
               enabled: false
            },
            dashStyle: 'shortdot',
            tooltip: {
               valueSuffix: ''
            }
         },
         {
            name: 'absences',
            type: 'spline',
            data: absences,
            tooltip: {
               valueSuffix: ''
            }
         }
      ]
   };

  })
  })
  return {tasks : tasks , vacation : vacation ,absences : absences }
  }
}
