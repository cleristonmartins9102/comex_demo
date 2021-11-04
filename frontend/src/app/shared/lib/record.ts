import { Load } from './load.service';
import { Observable } from 'rxjs';

export abstract class Record {
    public moduleName: string;
    data: Observable<any>;
    constructor(
        private id: number,
        private module: string,
        protected loadService: Load
    ) {
        if (typeof (id) !== 'undefined' && typeof (module) !== 'undefined') {
            this.moduleName = module;
            this.load();
        }
    }
    /**
     * Carrega o objeto na memoria
     */
    load() {
        if (typeof (this.moduleName) !== 'undefined' && typeof (this.id) !== 'undefined') {
            this.data = this.loadService.buscar(this.id, this.moduleName);
        }
    }
    /**
     * Esse metodo vai retornar o `observable`
     * @return `Observable`
     */
    getData() {
        if (typeof (this.data) !== 'undefined') {
            return this.data;
        }
    }
}
