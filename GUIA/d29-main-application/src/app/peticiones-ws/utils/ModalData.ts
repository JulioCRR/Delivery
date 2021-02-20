export class ModalData {
  constructor(
    public title: string,
    public data: string[],
    public input: string,
    public required: boolean,
    public disabled: boolean,
    public label?: string
  ) { }

  static getNewInstance(): ModalData {
    return new ModalData('', [], '', false, false, '');
  }
}
