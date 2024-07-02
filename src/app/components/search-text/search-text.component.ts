import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-text',
  standalone: true,
  imports: [CodemirrorModule, FormsModule, MatFormFieldModule, MatInputModule ],
  templateUrl: './search-text.component.html',
  styleUrl: './search-text.component.scss'
})
export class SearchTextComponent {
  content: string = 'Hello, CodeMirror!';
}
