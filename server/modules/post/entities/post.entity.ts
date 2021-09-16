export interface PostEntityJSON {
  _id: string;
  name: string;
  numberCandidates: number;
}

export class PostEntity implements PostEntityJSON {
  _id: string;
  name: string;
  numberCandidates: number;

  constructor(post: PostEntityJSON) {
    this._id = post._id;
    this.name = post.name;
    this.numberCandidates = post.numberCandidates;
  }
}
