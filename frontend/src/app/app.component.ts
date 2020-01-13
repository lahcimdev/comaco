import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private translateService: TranslateService) { }


  ngOnInit(): void {
    this.translateService.addLangs(["pl", "en"]);
    this.translateService.use('pl');
    this.translateService.setDefaultLang('pl');
  }
  
}
