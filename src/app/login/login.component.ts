import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public loginForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  login(){
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe(res=>{
      const user= res.find((a:any)=>{
        return a.email == this.loginForm.value.email && a.password == this.loginForm.value.password
      })
      if(user){
        alert("login Success")
        this.loginForm.reset()
        this.router.navigate(['dashboard'])
      }else{
        alert("Pleae Register Befor Login")
      }
    },err=>{
      alert("Somthing error")
    })
  }

}
