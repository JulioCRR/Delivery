import {Cics, toCicsList} from './Cics';
import {CicsThread, toCicsThreadList} from './CicsThread';

export class OmegaData {
  constructor (
    public fechaUpdate: Date,
    public listCics: Cics[],
    public listCicsThread: CicsThread[]
  ){}

  static getNewInstance(): OmegaData {
    return new OmegaData(new Date(), [], []);
  }
}

export function toOmegaData(r: any): OmegaData {
  let response: OmegaData = OmegaData.getNewInstance();
  if(r) {
    response = <OmegaData>({
      fechaUpdate: new Date(r.fechaUpdate),
      listCics: toCicsList(r.listCics),
      listCicsThread: toCicsThreadList(r.listCicsThread)
    });
  }
  return response;
}
