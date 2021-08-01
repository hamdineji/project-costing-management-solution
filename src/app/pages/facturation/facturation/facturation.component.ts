import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FactureService } from '../../../@core/services/facture.service';
import * as html2pdf from 'html2pdf.js'
import { HttpClient } from '@angular/common/http';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { saveAs } from 'file-saver'

@Component({
  selector: 'ngx-facturation',
  templateUrl: './facturation.component.html',
  styleUrls: ['./facturation.component.scss']
})
export class FacturationComponent implements OnInit {
allFactures
rates = 1
id
factureWindow : NbWindowRef;
@ViewChild('facture') facture: TemplateRef<any>;

  constructor( private factureService : FactureService ,
               private http : HttpClient,
               private windowService: NbWindowService ) { }

  ngOnInit(): void {
this.factureService.getAllFactures().subscribe((res : any)=>{
  this.allFactures= res.data.getAllFactures ;
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
  openSetFactureWindow( id ){
    this.id= id ;
    this.factureWindow=this.windowService.open(this.facture,{title: `save bill`})
  }
  async setFacture() {
    const content : Element = document.getElementById('element-to-export')
    html2pdf().from(content).toPdf().output('blob').then((result) => {
    this.factureWindow.close()
    this.factureService.setFacture(this.id,result ).subscribe()})
  }
  changeCurrency($event){
  this.http.get('http://api.exchangeratesapi.io/v1/latest?access_key=57b714dc20c67192ff5b22c55e233d88').subscribe((res : any)=>{
  switch($event){
    case 1 : {
      this.rates =res.rates.TND 
      break ;
    }
    case 2 : {
      this.rates = res.rates.USD;
      break ;
    }
    case 3 : {
      this.rates = res.rates.QAR
      break ;
    }
    case 4 : {
      this.rates =res.rates.AED
      break;
    }
    case 5 : {
      this.rates =1
      break;
    }
  }
  })
  }
  donwload(id){
    this.factureService.downloadFacture(id).subscribe((res :any)=>{
      var byteCharacters = atob(res.data.downloadFacture)
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      const blob = 
      new Blob([byteArray], 
               {type: "text/plain;charset=utf-8"});
               saveAs(blob, "facture.pdf");
    })
  }
}
