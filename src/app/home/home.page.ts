import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';

import { Router } from '@angular/router';
import { GlobalService } from '../Services/global.service';
import { AuthserviceService } from '../Services/authservice.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private data:DataService,private route:Router,private auth:AuthserviceService) { }
  input={
    email:'',
    password:''
  }
  submit(){
    console.log(this.input);
    const user = { sender: this.input.email };
    let rec={receiver:'client1'};
    if (this.input.email=='client1') {
      rec.receiver='client2';
    }
    else if (this.input.email=='client2') {
      rec.receiver='client1';
    }
    
    this.auth.login(user);
    
    localStorage.setItem('sender', JSON.stringify(user));
    localStorage.setItem('receiver', JSON.stringify(rec));
   
    this.route.navigate(['selecttosend'])
      
  }
  ngOnInit(): void{
   
    console.log(    localStorage.getItem('sender'));
  
    
  }
  // responseMessage='';
  // userData={
  //   CourseID:0,
  //   TeacherID:0,
  //   Semester:'none',
  //   Year:0


  // }
  // src='./../../assets/img/'
  // student:any[]=[];
  // images:any[]=[];
  // classID:number=0;
  // onSubmit(){
  //   this.data.postUserData(this.userData).subscribe(
  //     response => {
  //       this.responseMessage = 'Data inserted successfully. Inserted ID: ' + response.insertedID;
  //     },
  //     error => {
  //       this.responseMessage = 'Error inserting data: ' + error.message;
  //     }
  //   );
  // }
  // GetData(){
  //     this.data.getUsers().subscribe(data=>{
  //       this.student = data;
  //       console.log(this.student);
        

  //     },
  //     error => {
  //       console.error('Error fetching user data:', error);
  //     }
      
  //   )
  // }
  // DeleteData(){
  //   this.data.deleteData(this.classID).subscribe(response=>{
  //     console.log(response);
  //     this.responseMessage=response.message;
      
  //   },
  //   error=>{
  //     console.log(error);
      
  //   }
  // )
  // }
  // getFiles(){
  //   this.data.getFiles().subscribe(response=>{
  //     this.images=response;
  //     console.log(response);
      
  //   })
  // }
}
