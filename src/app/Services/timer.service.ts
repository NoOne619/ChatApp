import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  
  private startTime!: any;
  private  intervalId!: any;
  private remainingTime!: number;

  constructor() {
    this.loadTimer();
  }

  private loadTimer() {
    const timerData = localStorage.getItem('timer');
    if (timerData) {
      const { startTime, remainingTime } = JSON.parse(timerData);
      this.startTime = startTime;
      this.remainingTime = remainingTime;
      this.startTimer();
    } else {
      this.resetTimer();
    }
  }

  startTimer(duration: number = 60000) {
    if (!this.startTime) {
      this.startTime = Date.now();
      this.remainingTime = duration;
    }

    this.intervalId = setInterval(() => {
      const elapsed = Date.now() - this.startTime;
      this.remainingTime = duration - elapsed;

      if (this.remainingTime <= 0) {
        this.stopTimer();
      }

      this.saveTimer();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.startTime = null;
    this.remainingTime = 0;
    localStorage.removeItem('timer');
  }

  resetTimer() {
    this.stopTimer();
  
  }

  saveTimer() {
    const timerData = {
      startTime: this.startTime,
      remainingTime: this.remainingTime
    };
    localStorage.setItem('timer', JSON.stringify(timerData));
  }

  getRemainingTime() {
    return this.remainingTime;
  }
}
