import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  routerActive: String;
  constructor(private router: Router ) {
    this.routerActive = router.url;
    router.events.subscribe((val) => {
      this.routerActive = router.url;
  });

  }



  ngOnInit(): void {
  }

}
