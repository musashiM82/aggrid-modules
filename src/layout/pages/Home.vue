<template>
    <div style="height: 100%">
        <ag-grid-vue
            style="width: 100%; height: 100%"
            class="ag-theme-alpine"
            :columnDefs="data.columnDefs"
            @grid-ready="onGridReady"
            :defaultColDef="data.defaultColDef"
            :rowBuffer="data.rowBuffer"
            :rowSelection="data.rowSelection"
            :rowModelType="data.rowModelType"
            :cacheBlockSize="data.cacheBlockSize"
            :cacheOverflowSize="data.cacheOverflowSize"
            :maxConcurrentDatasourceRequests="data.maxConcurrentDatasourceRequests"
            :infiniteInitialRowCount="data.infiniteInitialRowCount"
            :maxBlocksInCache="data.maxBlocksInCache"
            :modules="data.modules"
        ></ag-grid-vue>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';

export default defineComponent({
    name: 'Home',
    components: {
        AgGridVue
    },
    setup(props: any) {
        const data = {
            columnDefs: [
                {
                    headerName: 'ID',
                    maxWidth: 100,
                    valueGetter: 'node.id',
                    cellRenderer: (params: any) => {
                        if (params.value !== undefined) {
                            return params.value;
                        } else {
                            return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
                        }
                    }
                },
                { field: 'athlete', minWidth: 150 },
                { field: 'age' },
                { field: 'country', minWidth: 150 },
                { field: 'year' },
                { field: 'date', minWidth: 150 },
                { field: 'sport', minWidth: 150 },
                { field: 'gold' },
                { field: 'silver' },
                { field: 'bronze' },
                { field: 'total' }
            ],
            gridApi: null,
            columnApi: null,
            defaultColDef: {
                flex: 1,
                resizable: true,
                minWidth: 100
            },
            rowBuffer: 0,
            rowSelection: 'multiple',
            rowModelType: 'infinite',
            cacheBlockSize: 100,
            cacheOverflowSize: 2,
            maxConcurrentDatasourceRequests: 1,
            infiniteInitialRowCount: 1000,
            maxBlocksInCache: 10,
            modules: [ClientSideRowModelModule, InfiniteRowModelModule, MenuModule, ExcelExportModule, ClipboardModule]
        };

        let agGridApi: any | null = null;
        let agGridColumnApi: any | null = null;

        const onGridReady = (params: any) => {
            const updateData = (data: any) => {
                const dataSource = {
                    rowCount: undefined,
                    getRows: function (params: any) {
                        console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                        // At this point in your code, you would call the server.
                        // To make the demo look real, wait for 500ms before returning
                        setTimeout(function () {
                            // take a slice of the total rows
                            const rowsThisPage = data.slice(params.startRow, params.endRow);
                            // if on or after the last page, work out the last row.
                            let lastRow = -1;
                            if (data.length <= params.endRow) {
                                lastRow = data.length;
                            }
                            // call the success callback
                            params.successCallback(rowsThisPage, lastRow);
                        }, 500);
                    }
                };
                params.api.setDatasource(dataSource);
            };

            fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
                .then(resp => resp.json())
                .then(data => updateData(data));
        };
        return { data, onGridReady };
    }
});
</script>
