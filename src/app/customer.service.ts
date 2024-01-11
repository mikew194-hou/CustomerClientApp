import { HttpClient } from '@angular/common/http'; import { Injectable } from '@angular/core'; import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    baseUrl: string = "http://localhost:3000/";

    constructor(private httpClient: HttpClient) { }

    addCustomer(data: any): Observable<any> {
        return this.httpClient.post(this.baseUrl + 'customers', data);
    }

    updateCustomer(id: number, data: any): Observable<any> {
        return this.httpClient.put(this.baseUrl + 'customers/${ id }', data);
    }

    getCustomerList(): Observable<any> {
        return this.httpClient.get(this.baseUrl + 'customers');
    }

    deleteCustomer(id: number): Observable<any> {
        return this.httpClient.delete(this.baseUrl + 'customers/${ id }');
    }
}
