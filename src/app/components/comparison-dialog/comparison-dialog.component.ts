import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-comparison-dialog',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './comparison-dialog.component.html',
  styleUrl: './comparison-dialog.component.scss'
})
export class ComparisonDialogComponent {

  // constructor(@Inject(MAT_DIALOG_DATA) public data: { node1: FileNode, node2: FileNode }) {}
}
