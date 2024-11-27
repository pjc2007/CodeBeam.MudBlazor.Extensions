import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community'; // Column Definition Type Interface

type Data = { id: string, description: string, state: string; };
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-grid';

  public gridOptions: GridOptions;

  public A: Data[];
  public B: Data[];
  public C: Data[];

  private gridApi!: GridApi;
  
  constructor() {
    this.A = [
      { id: 'v1', description: 'v01', state: 'A' },
      { id: 'v2', description: 'v02', state: 'A' }
    ];

    this.B = [
      { id: 'v3', description: 'v03', state: 'B' },
    ];

    this.C = [
      { id: 'v4', description: 'v04', state: 'C' },
      { id: 'v5', description: 'v05', state: 'C' },
      { id: 'v6', description: 'v06', state: 'C' }
    ];

    this.gridOptions = <GridOptions>{
      enableSorting: true,
      // enable filtering 
      enableFilter: true
    };
    this.gridOptions.columnDefs = [
      {
        headerName: "A",
        width: 100,
        valueGetter: this.getData.bind(this)
      },
      {
        headerName: "B",
        width: 100,
        valueGetter: this.getData.bind(this)
      },
      {
        headerName: "C",
        width: 100,
        valueGetter: this.getData.bind(this)
      },

    ];
    this.gridOptions.rowData = [
      { id: 0 },
      { id: 1 },
      { id: 2 }
    ];
  }

  public onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  private getData(params: any): string | null {
    const id = params.data.id;
    const colName = params.colDef.headerName;
    switch (colName) {
      case 'A':
        return this.getCellData(this.A, id);
      case 'B':
        return this.getCellData(this.B, id);
      case 'C':
        return this.getCellData(this.C, id);
    }
    return '';
  }

  private getCellData(list: Data[], row: number): string | null {
    if (row >= list.length) {
      return null;
    }

    return list[row].description;
  }

  public addToA(): void {
    this.A.push({ id: 'v7', description: 'v07', state: 'A' });

    const max = Math.max(this.A.length, this.B.length, this.C.length);
    this.gridOptions.rowData?.push({ id: max - 1 });    
    
    var params = {
      force: true,
      suppressFlash: true,
    };

    //this.gridApi.updateGridOptions(this.gridOptions);
    this.gridApi.refreshCells(params);
    this.gridApi.refreshCells();
    this.gridApi.redrawRows();
  }
}

