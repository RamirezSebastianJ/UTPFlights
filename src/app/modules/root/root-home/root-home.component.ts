import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { response } from 'src/app/core/models/response.model';
@Component({
  selector: 'app-root-home',
  templateUrl: './root-home.component.html',
  styleUrls: ['./root-home.component.scss']
})
export class RootHomeComponent implements OnInit {
  closeResult = '';

  form = new FormGroup({
    dni : new FormControl('', [Validators.required, Validators.email]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required])
  });
  login: boolean = true;
  constructor(private modalService: NgbModal,private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  loginResponse: response={
    message:'',
    status: 0,
    rol: -1,
    pending: -1

  };
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getErrorMessage() {
    if (this.form.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.hasError('email') ? 'Not a valid email' : '';
  }

  activeRegister(){
    console.log(this.form.get('email')!.value , this.form.get('password')!.value);
    this.authService.registerAdmin(this.form.get('dni')!.value,this.form.get('email')!.value , this.form.get('password')!.value).subscribe((response) => {
      this.loginResponse = response;
      console.log(response);
      if(response.status ===200){
        alert('Registro exitoso');

      }

    },(error:any)=>{
      console.error("error voucher ", error)
    });
  }

  toRegister(){
    this.router.navigate(['register']);
  }

}
