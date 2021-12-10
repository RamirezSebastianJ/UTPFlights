import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { response } from 'src/app/core/models/response.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  form = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required])
  });
  closeResult = '';
  login: boolean = true;
  loginResponse: response={
    message:'',
    status: 0,
    rol: -1,
    pending: -1

  };
  error = false;

  emailLogin: string = "";
  rolLogin: string = "";
  log: boolean = false;

  constructor(private modalService: NgbModal, private router: Router, private authService: AuthService, private route: ActivatedRoute) {
    console.log(this.route.snapshot.fragment);
  }
  ngOnInit(): void {
    console.log(this.route.snapshot.fragment);
    this.displayLogin();
    throw new Error('Method not implemented.');
  }

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



  toRegister(){
    this.router.navigate(['register']);

  }

  activeRegister(){
    console.log(this.form.get('email')!.value , this.form.get('password')!.value);
    this.authService.login(this.form.get('email')!.value , this.form.get('password')!.value).subscribe((response) => {
      this.loginResponse = response;
      console.log(response);
      if(response.status ===200){
        localStorage.setItem('email',this.form.get('email')!.value  );
        localStorage.setItem('rol',response.rol.toString());
        this.displayLogin();
        if(response.rol===2){
          this.router.navigate(['root/home']);
        }else{
          if(response.rol===1){
            alert('Login ADMIN');
            this.router.navigate(['admin'],);
          }else{
            alert('Login Usuario');
          }
        }
        if(response.pending ===1){
          this.router.navigate(['register'],
          {
            queryParams: {
              email: this.form.get('email')!.value,
              password: this.form.get('password')!.value,
              pending: response.pending,
              rol:response.rol
            }
          });
        }
      }else{
        alert('Email o clave incorrecta');
      }

    },(error:any)=>{
      console.error("error voucher ", error)
    });
    this.error = true;

  }

  displayLogin(){
    let email = localStorage.getItem('email');
    let rol = localStorage.getItem('rol');

    if(email?.length && rol?.length){
      this.emailLogin = email;
      this.rolLogin = rol;
      this.log = true;
    }
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(['/']);
    this.log = false;
  }

}
