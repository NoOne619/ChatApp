import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from '../Services/global.service';
import { SelectpersonComponent } from '../components/selectperson/selectperson.component';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-selecttosend',
  templateUrl: './selecttosend.page.html',
  styleUrls: ['./selecttosend.page.scss'],
})
export class SelecttosendPage implements OnInit {
  @ViewChild(SelectpersonComponent) selectpersonComponent: SelectpersonComponent | undefined;
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.initializeComponent();
      }
    });
  }

  ngOnInit() {
    this.initializeComponent();
  }

  initializeComponent() {
    if (this.selectpersonComponent) {
      this.selectpersonComponent.ngOnInit();  // Re-initialize the selectPerson component
    }
  }

}
