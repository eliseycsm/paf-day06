import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";



@Injectable()
export class WineService{
    constructor(private http: HttpClient){
    }

    async getCountries(): Promise<any>{
        return (await this.http.get<string[]>('/countries').toPromise())
    }

    async getCountry(countryName: string): Promise<any>{
        //add limit and offset query to getCountry using HttpParams
        let params = new HttpParams()
            .set("limit", "10")
            .set("offset", "0")
        return (await this.http.get<any>(`/country/${countryName}`, {params}).toPromise())
    }

    async getWineDetails(wineId: string): Promise<any>{
        return (await this.http.get<any>(`/wine/${wineId}`).toPromise())
    }
}

//hw 
// 1. when u click on country it will get the wines from that country
// 2. add limit and offset query params to q1.
// 3. display the wine details from wine id
// 4. compile and build angular st angular is served from express