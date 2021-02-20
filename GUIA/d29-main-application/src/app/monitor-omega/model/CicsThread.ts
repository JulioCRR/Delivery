export class CicsThread {
  constructor(
    public elapsed: string,
    public planName: string,
    public tran: string,
    public cpu: string,
    public status: string,
    public getPg: string,
    public update: string,
    public commit: string,
    public jobName: string,
    public region: string,
    public transaccion: string,
    public threadType: number,
    public elapsedTime: number,
    public pantallaM2k: string,
  ) {}

  static getNewInstance(): CicsThread {
    return new CicsThread('', '', '', '', '', '', '', '', '', '', '', 0, 0.0, '');
  }
}

export function toCicsThread(r: any): CicsThread {
  let cicsThreadSummary = <CicsThread>({
    elapsed: r.elapsed,
    planName: r.planName,
    tran: r.tran,
    cpu: r.cpu,
    status: r.status,
    getPg: r.getPg,
    update: r.update,
    commit: r.commit,
    jobName: r.jobName,
    region: r.region,
    transaccion: r.transaccion,
    threadType: r.threadType,
    elapsedTime: r.elapsedTime,
    pantallaM2k: r.pantallaM2k
  });
  return cicsThreadSummary;
}

export function toCicsThreadList(r: any): CicsThread[] {
  let cicsThreadSummaryList = r.map(toCicsThread);
  return cicsThreadSummaryList;
}
