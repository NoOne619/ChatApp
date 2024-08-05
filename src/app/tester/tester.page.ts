import { Component, OnInit } from '@angular/core';
import { TimerService } from '../Services/timer.service';

@Component({
  selector: 'app-tester',
   templateUrl:'./tester.page.html'

,
  styleUrls: ['./tester.page.scss'],
})
export class TesterPage implements OnInit {

  remainingTime!: number;

  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.remainingTime = this.timerService.getRemainingTime();
   
  }

  ngOnDestroy() {
    this.timerService.saveTimer();
  }

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

  private updateTime() {
    const intervalId = setInterval(() => {
      this.remainingTime = this.timerService.getRemainingTime();
      if (this.remainingTime <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }

  mediaFiles:any[] = [
    { type: 'image', src: '../../assets/img/1720436204213-5764514.jpeg' },
    { type: 'video', src: '../../assets/video/1720436041548-143688905.mp4' }
  ];
  selectedMedia: any = null;

  selectMedia(media: any) {
    console.log('Selected Media:', media);
    this.selectedMedia = media;
  }

  closeMedia() {
    this.selectedMedia = null;
  }

}
