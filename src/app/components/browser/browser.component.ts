import { Component } from '@angular/core';
import { FileTreeComponent } from '../file-tree/file-tree.component';


@Component({
  selector: 'app-browser',
  standalone: true,
  imports: [
    FileTreeComponent
  ],
  templateUrl: './browser.component.html',
  styleUrl: './browser.component.scss'
})
export class BrowserComponent {

}
