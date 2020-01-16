import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconImport } from './service/iconImport';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private translateService: TranslateService, private iconImport: IconImport) { }

  ngOnInit(): void {
    this.translateService.addLangs(["pl", "en"]);
    this.translateService.setDefaultLang('pl');
    this.translateService.use('pl');

    this.iconImport.importCustomIcons();
  }
  
}
