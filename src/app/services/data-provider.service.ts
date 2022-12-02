import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataProviderService {

     public async postData(url: string, data: string): Promise<any> {
          const response = await fetch(url, {
              method: 'POST',       
              headers: {
              'Authorization': `Basic ${data}`
            }         
          });
          return response.json(); 
      }

      public async getData(url: string, data: string): Promise<any> {
          const response = await fetch(url, {
            method: 'GET',          
            headers: {
              'Authorization': data
            }         
          });
          return response.json(); 
      }
}