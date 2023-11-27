import {environment} from './../environment/environment.prod';
import * as CryptoJS from 'crypto-js';

export class HelpersService {

  doesNotContainSubstring(mainString: string, substring: string): boolean {
    return mainString.indexOf(substring) === -1;
  }

  generateHash(){
    let publicKey = this.getPublicKey();
    let privateKEy = this.getPrivateKey();
    const timestampInMilliseconds: number = this.getTimeStamp();

    let input = timestampInMilliseconds+privateKEy+publicKey;
    return CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
  }

  getTimeStamp(){
    return new Date().getTime();
  }

  getPublicKey(){
    return environment.publicKey;
  }

  getPrivateKey(){
    return environment.privateKey;
  }

  buildRequestParameters(ts: number, hash: any, limit: any, apikey: any): string {
    return `ts=${ts}&hash=${hash}&limit=${limit}&apikey=${apikey}`
  }
}
