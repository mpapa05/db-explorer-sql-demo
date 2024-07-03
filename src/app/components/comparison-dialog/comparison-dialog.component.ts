import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

interface FileNode {
  name: string;
  type?: 'workspace' | 'namespace' | 'datastore' | 'coveragestore' | 'featuretype' | 'style' | 'layer';
  icon: string;
  children?: FileNode[];
}

@Component({
  selector: 'app-comparison-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './comparison-dialog.component.html',
  styleUrl: './comparison-dialog.component.scss'
})

export class ComparisonDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { node1: FileNode, node2: FileNode }) {}
}
