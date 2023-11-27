import {environment} from '../environment/environment.prod';
import * as CryptoJS from 'crypto-js';
import {Marvel} from "./marvel.model";

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

  getBaseUrl(){
    return environment.baseUrl;
  }

  getProtocol(){
    return environment.protocol;
  }

  buildRequestParameters(ts: number, hash: any, limit: any, apikey: any): string {
    return `ts=${ts}&hash=${hash}&limit=${limit}&apikey=${apikey}`
  }

  buildApiEndpoint() {
    let ts = this.getTimeStamp();
    const hash = this.generateHash();
    const limit = 100;
    const apiKey = this.getPublicKey();
    const parameters = this.buildRequestParameters(ts, hash, limit, apiKey);
    const protocol = this.getProtocol();
    const baseUrl = this.getBaseUrl();

    return protocol + baseUrl + 'v1/public/characters?' + parameters;
  }

  randomlySelectMarvels(marvelWithThumbnail: Marvel[]) {
    let randomlySelectedMarvel: Marvel[] = [];
    for (let i = 0; i < 6; i++) {
      let index = Math.floor(Math.random() * marvelWithThumbnail.length);
      randomlySelectedMarvel.push(marvelWithThumbnail[index]);
    }
    return randomlySelectedMarvel;
  }

  filterMarvelsWithoutThumbnail(responseData: Object) {
    let marvelWithThumbnail: Marvel[] = [];
    for (let i = 0; i < 100; i++) {
      let name = responseData['data']['results'][i]['name'];
      let thumbnailOfMarvel = responseData['data']['results'][i]['thumbnail']['path'];
      let validMarvel = this.doesNotContainSubstring(thumbnailOfMarvel, "image_not_available");
      if (validMarvel) {
        marvelWithThumbnail.push(new Marvel(name, thumbnailOfMarvel + "/portrait_xlarge.jpg"));
      }
    }
    return marvelWithThumbnail;
  }
}
