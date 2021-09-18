import { DepartmentType, LevelType } from 'server/shared/customTypes';

export interface VoterEntityJSON {
  _id: string;
  name: string;
  surename: string;
  contact: string;
  email: string;
  matricule: string;
  department: DepartmentType;
  level: LevelType;
  image: string;
  creation_date: string;
  secret_code: string;
  password?: string;
  voted: boolean;
}

export class VoterEntity implements VoterEntityJSON {
  _id: string;
  name: string;
  surename: string;
  contact: string;
  email: string;
  matricule: string;
  department: DepartmentType;
  level: LevelType;
  image: string;
  secret_code: string;
  creation_date: string;
  password?: string;
  voted: boolean;

  constructor(voter: VoterEntityJSON) {
    this._id = voter._id;
    this.name = voter.name;
    this.surename = voter.surename;
    this.contact = voter.contact;
    this.email = voter.email;
    this.matricule = voter.matricule;
    this.department = voter.department;
    this.level = voter.level;
    this.image = voter.image;
    this.secret_code = voter.secret_code;
    this.creation_date = voter.creation_date;
    this.voted = voter.voted;
  }
}
