import { NextApiRequest } from 'next';

export type DepartmentType =
  | 'MSP Department'
  | "Science de l'ingénieur Department"
  | 'Computer Engeneering Department'
  | 'Telecommunication Engeneering Department'
  | 'Electical Engeneering Department'
  | 'Mechanical Engeneering Department'
  | 'Industrial Engeneering Department'
  | 'Civil Engeneering Department'
  | 'Art Numerique Department'
  | 'Humanite Numerique Department';

export type LevelType =
  | 'Level 1'
  | 'Level 2'
  | 'Level 3'
  | 'Level 4'
  | 'Level 5';

export type NextApiRequestWithFormData = NextApiRequest & {
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    path: string;
    size: null;
  };
};
