import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconImport } from './service/iconImport';
import { Store } from '@ngxs/store';
import { VerifyTokenAction } from './state/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store, private translateService: TranslateService, private iconImport: IconImport) { }

  ngOnInit(): void {
    this.translateService.addLangs(["pl", "en"]);
    this.translateService.setDefaultLang('pl');
    this.translateService.use('pl');

    this.iconImport.importCustomIcons();

    this.store.dispatch(new VerifyTokenAction());
  }
  
}
