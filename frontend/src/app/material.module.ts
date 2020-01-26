import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'

const MaterialComponents = [
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatTableModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule { }
