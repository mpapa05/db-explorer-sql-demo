import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
// import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

interface FileNode {
  name: string;
  type: 'workspace' | 'namespace' | 'datastore' | 'coveragestore' | 'featuretype' | 'style' | 'layer';
  icon: string;
  children?: FileNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  type: 'workspace' | 'namespace' | 'datastore' | 'coveragestore' | 'featuretype' | 'style' | 'layer';
  icon: string;
  level: number;
}
// workspace - briefcase icon
// namespace - address-card icon
// datastore - database icon
// coveragestore - bars icon
// featuretype - server icon
// style - paint-brush icon
// layer - street-view icon
const TREE_DATA: FileNode[] = [
  {
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
  }
];

@Component({
  selector: 'app-file-tree',
  standalone: true,
  imports: [
    MatTreeModule,
    MatButtonModule,
    CommonModule,
    MatCardModule
  ],
  templateUrl: './file-tree.component.html',
  styleUrl: './file-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileTreeComponent {
  isMetaVisible: boolean = false;
  selectedNode: FileNode | null = null;
  isAnyButtonDisabled: boolean = false;

  private transformer = (node: FileNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      type: node.type,
      icon: node.icon,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  showMeta(node: FileNode) {
    console.log('Show metadata');
    if (this.selectedNode === node && this.isMetaVisible) {
      this.isMetaVisible = false;
      this.selectedNode = null;
      this.isAnyButtonDisabled = false;
    } else {
      this.isMetaVisible = true;
      this.selectedNode = node;
      this.isAnyButtonDisabled = true;
    }
  }
}
