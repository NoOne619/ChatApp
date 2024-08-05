import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/Services/data.service';
import { AuthserviceService } from 'src/app/Services/authservice.service';
import { Router } from '@angular/router';
import { TimerService } from 'src/app/Services/timer.service';
import { firstValueFrom, Subject } from 'rxjs';
import {  takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-selectperson',
  templateUrl: './selectperson.component.html',
  styleUrls: ['./selectperson.component.scss'],
  
})

export class SelectpersonComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;//! it tells compiler taht this var not gonna be undefine
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  private unsubscribe$ = new Subject<void>();
   //serv=new AuthserviceService();
    router=inject(Router);
  
  
  constructor(public data: DataService,private domSanitizer: DomSanitizer,public timerService:TimerService) {

  }
  sender: any;
  receiver: any = null;
  clients: string[] = [];
  flag: boolean = false;


  checkFile = 0;
  items: any[] = [];
  intervalId: any;
  recentMess = {
    id: Infinity,
    message: '',
    sender: '',
    receiver: '',
    date: ''
  };
  /*for uploading the file*/
  selectedFile: File | null = null;
  message: any = '';



//for audio recording and uploading
title = 'micRecorder';
record:any; // Variable to hold RecordRTC object
recording = false; // Flag to toggle recording state
url:any; // URL of the recorded Blob
error:any; // Error message placeholder

sanitize(url: string) {
  return this.domSanitizer.bypassSecurityTrustUrl(url);
}

initiateRecording() {
  this.recording = true;
  let mediaConstraints = {
    video: false,
    audio: true
  };
  navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then(this.successCallback.bind(this), this.errorCallback.bind(this));
}

successCallback(stream: MediaStream) {
  const options:any = {
    mimeType: "audio/wav",
    numberOfAudioChannels: 1,
    sampleRate: 44100,
  };
  const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
  this.record = new StereoAudioRecorder(stream, options);
  this.record.record();
}

stopRecording() {
  this.recording = false;
  this.record.stop(this.processRecording.bind(this));
}

processRecording(blob: any) {
  this.url = URL.createObjectURL(blob);
  const recordedFile = new File([blob], 'recorded_audio.wav', { type: 'audio/wav' });

  // Now you can upload 'recordedFile' as a file
  this.selectedFile = recordedFile;
  this.onUpload();
}



errorCallback(error: any) {
  this.error = 'Can not play audio in your browser';
}


//---------------------------------------------------------------------------------
  Send() {
    if (!this.checkFile) {
      let value = {
        message: '',
        sender: this.sender,
        receiver: this.receiver
      }
      value.message = this.message;
      this.message = '';
      this.data.insertchat(value).pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
        console.log(res);

      })

      this.CheckRecentID();
      this.scrollToBottom();
    }
    else {
      this.onUpload();
      this.message = '';
    }
    this.scrollToBottom();
  }

  Refresh() {
    this.data.getChat().pipe(takeUntil(this.unsubscribe$)).subscribe(respose => {
      this.items = respose;
      console.log(respose);

    })
    this.scrollToBottom();
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
      console.log('i am recent message ',result[0]._id);
      
      if (this.recentMess.id < result[0]._id) {
        this.recentMess = result[0];
        this.items.push(this.recentMess);

        console.log('sent', this.recentMess);
        this.scrollToBottom();
      }
      else
        console.log('not send');

    })
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    this.checkFile = 1;
    this.message=this.selectedFile?.name
    console.log('filecahnged');
    
  }

  onUpload() {
    this.checkFile = 0;
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);


    this.data.insertFile(formData, this.sender, this.receiver);

    this.CheckRecentID();
    this.scrollToBottom();
  }


  Select(client:any ) {

    this.Refresh();
    const user = { receiver:client  };
    localStorage.setItem('receiver', JSON.stringify(user));
    
    this.receiver = client;
    this.flag = !this.flag;
    console.log('sender', this.sender);
    console.log('receiver', this.receiver);
    this.scrollToBottom();


  }
  checker() {

    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i] == this.sender) {
        this.clients.splice(i, 1);
        break;
      }

    }

  }
  scrollToBottom(): void {
    
    try {
      // Timeout is used to ensure that scrolling happens after the view is updated
      setTimeout(() => {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
       console.log('scrolled');
       this.content.scrollToBottom(300);

      },1400);
    } catch(err) {
      console.error('Scroll to bottom failed', err);
    }
  }
  
  lastSenderRec(){
    const valueS = localStorage.getItem('sender');
    const valueR=localStorage.getItem('receiver')
    let temp: any;

    if (valueS) {
      temp = JSON.parse(valueS);
      this.sender = temp.sender;
    } else {
      console.log('No user data found in local storage');
    }
    if (valueR) {
      temp = JSON.parse(valueR);
      this.receiver = temp.receiver;
    } else {
      console.log('No user data found in local storage');
    }
    
    console.log('stored sender', this.sender);
    console.log('stored recevier', this.receiver);
    

  }
  //--------------------------------for logout--------------------------
  logout(){
    // r=inject(Router);//this will cause erorr while using in a functions thats we have to define its dependency in provider[]
 
     let v=new AuthserviceService();
        v.logout();
    this.router.navigate(['home']);
   }
//----------------------------------for status---------------------------

mediaFiles:any ='';
selectedMedia: any = null;
allstatus:any[]=[];
selectMedia(file:any) {
  console.log('Selected Media:');
  this.selectedMedia = file;
}

closeMedia() {
  this.selectedMedia = null;
}

onFileChangedStatus(event: any) {
  this.selectedFile = event.target.files[0];
  this.mediaFiles=this.selectedFile?.name
  console.log('file selected',this.mediaFiles);
  
  this.onUploadStatus();
}

onUploadStatus() {

  if (!this.selectedFile) {
    console.error('No file selected');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile);

  

    console.log('successfully uploaded status!!');

   this.insertStatus(formData);
   this.Status();
     
     this.start();


 
}
 insertStatus(formData:FormData){
     this.data.insertStatus(formData, this.sender) 
   console.log('in inserted status');
   
}

GetAllstatus(){
  this.data.getAllStatus().pipe(takeUntil(this.unsubscribe$)).subscribe(result=>{
    if (result) {
      this.allstatus=result  
      console.log('all status',this.allstatus);
      
    }
    
  })
}

callOfAllS(){
  setInterval(()=>{
    this.GetAllstatus();
  },1000);
}

async Getstatus(): Promise<void> {
  console.log('called');
  try {
    const result = await firstValueFrom(this.data.getStatus(this.sender));
    
    if (result) {
      console.log('');
      
      this.mediaFiles = result[0].file;
      console.log('real media', this.mediaFiles);
    }
    console.log('result of status', result);
  } catch (error) {
    console.error('Error getting status:', error);
  }
}

async Status() {
  this.Getstatus().then(() => {
    console.log('real media');
    
    if (this.mediaFiles) {
      console.log('hello');
      this.updateTime();  
    }
  });
}

//--------------------for timer---------------

remainingTime!: number;
start() {
  this.timerService.startTimer();
  this.updateTime();
}

stop() {
  this.timerService.stopTimer();
  this.updateTime();
}

reset() {
  this.timerService.resetTimer();
  this.updateTime();
}
DeleteStatus(){
  this.data.deleteStatus(this.sender);
}

private updateTime() {
  const intervalId = setInterval(() => {
    this.remainingTime = this.timerService.getRemainingTime();
    console.log(this.remainingTime);
    
    if (this.remainingTime <= 0) {
      clearInterval(intervalId);
     this.DeleteStatus();
      
      this.mediaFiles='';//for status
      this.selectedMedia='';//for status
      console.log('deleted status');
      
    }
  }, 1000);
}

  ngOnInit(): void {
    this.Refresh();
   this.callOfAllS();
    this.clients=['client1', 'client2', 'client3','client4'];//for initializing array
    this.mediaFiles='';//for status
    this.selectedMedia='';//for status
    this.lastSenderRec();//check who is last receiver and sender

    this.data.getRecentMess().subscribe(result => {//assaign last inserted message id
      this.recentMess.id=result[0]._id;
    })
    
   this.Status();
    this.startInterval();
    this.checker();
   
    this.scrollToBottom();
    console.log(this.clients);
    //for timing

  this.remainingTime = this.timerService.getRemainingTime();
  console.log(this.remainingTime);
  
 // this.start();
  // this.timerService.startTimer();

  
 
  
  }

  ngOnDestroy(): void {
    this.clearInterval();
     this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
 

}
