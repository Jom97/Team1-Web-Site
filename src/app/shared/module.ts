export class Module {
    public moduleId!: number;
    public moduleName?: string;

    constructor(moduleId: number) {
        this.moduleId = moduleId;
    }
}
