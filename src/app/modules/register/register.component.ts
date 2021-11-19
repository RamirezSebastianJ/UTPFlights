import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'src/app/core/models/response.model';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  checkoutForm;
  form = new FormGroup({
    dni : new FormControl('', [Validators.required]),
    name : new FormControl('', [Validators.required]),
    lastName : new FormControl('', [Validators.required]),
    dateBirth: new FormControl('', [Validators.required]),
    placeBirth: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor( private formBuilder: FormBuilder,private authService: AuthService,private router: Router, private route: ActivatedRoute) {
    this.checkoutForm = this.formBuilder.group({
      name:'',
      lastName:'',
      dateBirth:'',
      placeBirth:'',
      address:'',
      gender:'',
      email:'',
      password:'',
    });
  }

  loginResponse: response={
    message:'',
    status: 0,
    rol: -1,
    pending: -1

  };

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    this.form.controls['email'].setValue(this.route.snapshot.queryParams.email);
    console.log(this.route.snapshot.queryParams);
    this.form.controls['password'].setValue(this.route.snapshot.queryParams.password);
    if(this.route.snapshot.queryParams.pending == 1 ){
      this.form.controls['email'].disable();
    }
  }

  register(){
    console.log(this.form.get('name')!.value , this.form.get('password')!.value);
    if(this.route.snapshot.queryParams.pending == 1 ){
      this.authService.completarAdmin(
        this.form.get('dni')!.value,
        this.form.get('name')!.value,
        this.form.get('lastName')!.value,
        this.form.get('dateBirth')!.value,
        this.form.get('placeBirth')!.value,
        this.form.get('address')!.value,
        this.form.get('gender')!.value,
        this.form.get('email')!.value,
        this.form.get('password')!.value,
      ).subscribe((response)=>{
        this.loginResponse = response;
        console.log(response);
        if(response.status ===200){
          alert('Usuario registrado correctamente');
          this.router.navigate(['/']);
      }
    },(error:any)=>{
      console.error("error voucher ", error)
    });
    }else{
      this.authService.register(
        this.form.get('dni')!.value,
        this.form.get('name')!.value,
        this.form.get('lastName')!.value,
        this.form.get('dateBirth')!.value,
        this.form.get('placeBirth')!.value,
        this.form.get('address')!.value,
        this.form.get('gender')!.value,
        this.form.get('email')!.value,
        this.form.get('password')!.value,
        this.form.get('password')!.value,
      ).subscribe((response)=>{
        this.loginResponse = response;
        console.log(response);
        if(response.status ===200){
          alert('Usuario registrado correctamente');
          this.router.navigate(['/']);
      }
    },(error:any)=>{
      console.error("error voucher ", error)
    });

    }

}
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
