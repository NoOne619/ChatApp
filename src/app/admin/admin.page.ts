import { Component, input, OnInit } from '@angular/core';
import { GlobalService } from '../Services/global.service';
import { DataService } from '../Services/data.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(public data: DataService) {

  }
  sender='agent';
  checkFile = 0;
  items: any[] = [];
  intervalId: any;
  recentMess = {
    id: 0,
    message: '',
    sender: this.sender,
    receiver:'',
    date: ''
  };
  /*for uploading the file*/
  selectedFile: File | null = null;



  message: string = '';
  Send() {
    if (!this.checkFile) {
      let value = {
        message: '',
        sender: this.sender,
        receiver:'client'
      }
      value.message = this.message;
      this.message = '';
      this.data.insertchat(value).subscribe((res) => {
        console.log(res);

      })
      this.CheckRecentID();
    }
    else{
      this.onUpload();
    }
  }

  Refresh() {
    this.data.getChat().subscribe(respose => {
      this.items = respose;
    })
  }


  startInterval(): void {
    this.intervalId = setInterval(() => {
      this.CheckRecentID();
    }, 1000);
  }
  clearInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  CheckRecentID() {
    this.data.getRecentMess().subscribe(result => {
      if (this.recentMess.id < result[0].id) {
        this.recentMess = result[0];
        this.items.push(this.recentMess);

        console.log('sent', this.recentMess);

      }
      else
        console.log('not send');

    })
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    this.checkFile=1;
  }

  onUpload() {
    this.checkFile=0;
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', this.selectedFile);


    this.data.insertFile(formData, 'agent','client');

    this.CheckRecentID();
  }


  ngOnInit(): void {
    this.data.getRecentMess().subscribe(result => {
      this.recentMess = result[0];
      console.log(result);

      console.log('this is id' + this.recentMess.id);

    })
    this.Refresh();
    this.startInterval();

  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

}
