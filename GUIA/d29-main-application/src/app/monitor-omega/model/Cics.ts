export class Cics {
  constructor(
    public cicsRels: string,
    public jobName: string,
    public totalCpu: string,
    public db2Cpu: string,
    public pThrdMax: string,
    public activeThreads: string,
    public commitRateSec: string,
    public roCommitRateSec: string,
    public alertRaised: boolean
  ) {}

  static getNewInstance(): Cics {
    return new Cics('', '', '', '', '', '', '', '', false);
  }
}

export function toCics(r: any): Cics {
  let cicsThread = <Cics>({
    cicsRels: r.cicsRels,
    jobName: r.jobName,
    totalCpu: r.totalCpu,
    db2Cpu: r.db2Cpu,
    pThrdMax: r.pThrdMax,
    activeThreads: r.activeThreads,
    commitRateSec: r.commitRateSec,
    roCommitRateSec: r.roCommitRateSec,
    fechaUpdate: new Date(r.fechaUpdate),
    alertRaised: r.alertRaised
  });
  return cicsThread;
}

export function toCicsList(r: any): Cics[] {
  let cicsThreadList: Cics[] = [];
  if (r) {
    cicsThreadList = r.map(toCics);
  }
  return cicsThreadList;
}
