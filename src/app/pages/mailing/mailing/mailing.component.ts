import { Component, OnInit } from '@angular/core';
window['CKEDITOR_BASEPATH'] = '//cdn.ckeditor.com/4.6.0/full/'
import 'ckeditor'
import { UserService } from '../../../@core/services/user.service';
// import './ckeditor.loader';


@Component({
  selector: 'ngx-mailing',
  templateUrl: './mailing.component.html',
  styleUrls: ['./mailing.component.scss']
})
export class MailingComponent implements OnInit {
  mail =""
  object = ""
  to=""
  constructor( private userService : UserService) { }

  ngOnInit(): void {
  }

  sendMail(){
    this.userService.sendMail(this.to, this.mail, this.object).subscribe()
  }
}
