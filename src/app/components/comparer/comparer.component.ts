import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ComparisonDialogComponent } from '../comparison-dialog/comparison-dialog.component';

interface FileNode {
  name: string;
  type?: 'workspace' | 'namespace' | 'datastore' | 'coveragestore' | 'featuretype' | 'style' | 'layer';
  icon: string;
  children?: FileNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  icon: string;
  level: number;
}

const TREE_DATA_1: FileNode[] = [ {
  name: 'Workspace1',
  type: 'workspace',
  icon: 'fa-briefcase',
  children: [
    { name: 'DataStore1',
      type: 'datastore',
      icon: 'fa-database',
     },
    { name: 'DataStore2',
      type: 'datastore',
      icon: 'fa-database',
     },
  ]
}, {
  name: 'Workspace2',
  type: 'workspace',
  icon: 'fa-briefcase',
  children: [
    { name: 'DataStore21',
      type: 'datastore',
      icon: 'fa-database',
      children: [
        { name: 'FeatureType',
          type: 'featuretype',
          icon: 'fa-server',
          children: [
            { name: 'Layer1',
              type: 'layer',
              icon: 'fa-street-view',
            },
            { name: 'Layer2',
              type: 'layer',
              icon: 'fa-street-view',
            },
          ]
         },
        { name: 'Style',
          type: 'style',
          icon: 'fa fa-paint-brush',
         },
      ]
     },
    { name: 'DataStore22',
      type: 'datastore',
      icon: 'fas fa-database',
     },
  ]
} ];
const TREE_DATA_2: FileNode[] = [ {
  name: 'Workspace1',
  type: 'workspace',
  icon: 'fa-briefcase',
  children: [
    { name: 'DataStore1',
      type: 'datastore',
      icon: 'fa-database',
     },
    { name: 'DataStore2',
      type: 'datastore',
      icon: 'fa-database',
     },
  ]
}, {
  name: 'Workspace2',
  type: 'workspace',
  icon: 'fa-briefcase',
  children: [
    { name: 'DataStore21a',
      type: 'datastore',
      icon: 'fa-database',
      children: [
        { name: 'FeatureType',
          type: 'featuretype',
          icon: 'fa-server',
          children: [
            { name: 'Layer1',
              type: 'layer',
              icon: 'fa-street-view',
            },
            { name: 'Layer2',
              type: 'layer',
              icon: 'fa-street-view',
            },
          ]
         },
        { name: 'Stylee',
          type: 'style',
          icon: 'fa fa-paint-brush',
         },
      ]
     },
    { name: 'DataStore223',
      type: 'datastore',
      icon: 'fas fa-database',
     },
  ]
} ];

@Component({
  selector: 'app-comparer',
  standalone: true,
  imports: [
    MatTreeModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './comparer.component.html',
  styleUrl: './comparer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ComparerComponent {
  dataSource1: MatTreeFlatDataSource<FileNode, ExampleFlatNode>;
  dataSource2: MatTreeFlatDataSource<FileNode, ExampleFlatNode>;
  treeControl1: FlatTreeControl<ExampleFlatNode>;
  treeControl2: FlatTreeControl<ExampleFlatNode>;

  selectedNode1: FileNode | null = null;
  selectedNode2: FileNode | null = null;

  isAnyButtonDisabled1: boolean = false;
  isAnyButtonDisabled2: boolean = false;

  private transformer = (node: FileNode, level: number) => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    icon: node.icon,
    level: level,
  });

  constructor(public dialog: MatDialog) {
    this.treeControl1 = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);
    this.treeControl2 = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

    const treeFlattener1 = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);
    const treeFlattener2 = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);

    this.dataSource1 = new MatTreeFlatDataSource(this.treeControl1, treeFlattener1);
    this.dataSource2 = new MatTreeFlatDataSource(this.treeControl2, treeFlattener2);

    this.dataSource1.data = TREE_DATA_1;
    this.dataSource2.data = TREE_DATA_2;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  selectNode(node: FileNode, treeNumber: number) {
    if (treeNumber === 1) {
      this.selectedNode1 = node;
      this.isAnyButtonDisabled1 = !this.isAnyButtonDisabled1;
    } else if (treeNumber === 2) {
      this.isAnyButtonDisabled2 = !this.isAnyButtonDisabled2;
      this.selectedNode2 = node;
    }
  }

  compareNodes() {
    if (this.selectedNode1 && this.selectedNode2) {
      this.dialog.open(ComparisonDialogComponent, {
        data: { node1: this.selectedNode1, node2: this.selectedNode2 }
      });
    } else {
      alert('Válassz ki egy elemet mindkét fából a folytatáshoz.');
    }
  }
}