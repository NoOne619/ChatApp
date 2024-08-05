import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Form } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl='http://localhost:3000/api/user';
 statusurl= 'http://localhost:3001/api/status'
 chatusurl= 'http://localhost:3001/api/chat'
 
  constructor(private http:HttpClient) { }
  // postUserData(data: { CourseID: number, TeacherID: number, Semester: string, Year: number }): Observable<any> {
  // //  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post(this.apiUrl+'/insertinclass', data);
  // }
  // getUsers(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl+'/getuserdata');
  // }
  // deleteData(id:number):Observable<any>{
  //     return this.http.delete(this.apiUrl+`/deletedata/${id}`);
  // }
  // getFiles():Observable<any[]>{
  //   return this.http.get<any[]>(this.apiUrl+'/getfiles');
  // }

  //----------------for chat-------------------
  getChat():Observable<any[]>{
    return this.http.get<any[]>(this.chatusurl+'/getchat')
  }
  insertchat(data:{message:string,sender:string,receiver:string}){
    return this.http.post(this.chatusurl+'/insertchat', data);
  }
  getRecentMess():Observable<any>{
    return this.http.get(this.chatusurl+'/getrecentmess');
  }

  insertFile(formData:FormData,sender:any,receiver:any){
     this.http.post(this.chatusurl + '/uploadfile/'+sender+'/'+receiver, formData).subscribe(
      (res:any) => {
        console.log(res);
        return res.filename; // Assuming 'filename' is returned from the server
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
  insertStatus(formData:FormData,sender:any):Observable<any>{
      let respose:any;
     this.http.post(this.statusurl + '/uploadstatus/'+sender, formData).subscribe(res=>{
      console.log(res);
      respose=res;
    })
    return respose;
    
  }
  getStatus(sender:any):Observable<any>{
    console.log('in get status data');
    
    return this.http.get(this.statusurl+'/getstatus/'+sender);
  }
  getAllStatus():Observable<any[]>{
    console.log('in get status data');
    
    return this.http.get<any[]>(this.statusurl+'/getallstatus');
  }
  
  deleteStatus(sender: any): void {
    console.log('in delete status data');
    console.log('http://localhost:3001/api/status/deletestatus/' + sender);
  
    this.http.delete('http://localhost:3001/api/status/deletestatus/' + sender)
      .subscribe(
        response => {
          console.log('Delete response:', response);
        },
        error => {
          console.error('Delete error:', error);
        }
      );
  }
  
}
