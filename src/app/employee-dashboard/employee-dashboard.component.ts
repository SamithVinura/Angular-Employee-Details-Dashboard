import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { EmloyeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';
import { SelectorMatcher } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  display = "none";
  formvalue !: FormGroup;
  employeeModelobj:EmloyeeModel=new EmloyeeModel();
  employeeData!:any;
  showAdd!:boolean;
  showUpdate !:boolean;
  constructor(private formbuilder:FormBuilder, private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.formvalue=this.formbuilder.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      mobile:[''],
      salary:['']

    })
    this.getAllEmployee();
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  postEmployeeDetails(){
    this.employeeModelobj.firstName= this.formvalue.value.firstname;
    this.employeeModelobj.lastName= this.formvalue.value.lastname;
    this.employeeModelobj.email= this.formvalue.value.email;
    this.employeeModelobj.mobile= this.formvalue.value.mobile;
    this.employeeModelobj.salary= this.formvalue.value.salary;

    this.api.postEmployee(this.employeeModelobj)
    .subscribe(res=>{
      console.log(res);
      alert("added success")
      let ref = document.getElementById('cansel')
      ref?.click();
      this.formvalue.reset();
      this.getAllEmployee();
    },
    err=>{
    alert("error")
    }
    )
}
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;

    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("deleted")
      this.getAllEmployee();
    })
  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.openModal();

    this.employeeModelobj.id=row.id
    this.formvalue.controls['firstname'].setValue(row.firstName)
    this.formvalue.controls['lastname'].setValue(row.lastName)
    this.formvalue.controls['email'].setValue(row.email)
    this.formvalue.controls['mobile'].setValue(row.mobile)
    this.formvalue.controls['salary'].setValue(row.salary)
  }
  updateEmployeeDetails(){
    this.employeeModelobj.firstName= this.formvalue.value.firstname;
    this.employeeModelobj.lastName= this.formvalue.value.lastname;
    this.employeeModelobj.email= this.formvalue.value.email;
    this.employeeModelobj.mobile= this.formvalue.value.mobile;
    this.employeeModelobj.salary= this.formvalue.value.salary;
    this.api.updateEmployee(this.employeeModelobj,this.employeeModelobj.id)
    .subscribe(res=>{
      alert("Updated")
      this.getAllEmployee();
    },err=>{
      alert("error")
      })
  }
  clickAddEmployee(){

    this.formvalue.reset();
    this.openModal();
    this.showAdd=true;
      this.showUpdate=false;
  }
  LogOut(){
    this.router.navigate(['login'])
  }
}
