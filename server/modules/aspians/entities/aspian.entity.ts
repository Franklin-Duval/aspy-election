export interface AspianEntityJSON {
  _id: string;
  matricule: string;
}

export class AspianEntity implements AspianEntityJSON {
  _id: string;
  matricule: string;

  constructor(aspian: AspianEntityJSON) {
    this._id = aspian._id;
    this.matricule = aspian.matricule;
  }
}
