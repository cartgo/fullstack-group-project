import { stringify } from 'querystring';

export class Resource {
  resourceCode: string;
  resourceName: string;

  constructor(resoureCode: string, resourceName: string) {
    this.resourceCode = resoureCode;
    this.resourceName = resourceName;
  }

  // toString() {
  //   return String(this.resourceName);
  // }
}
//test
