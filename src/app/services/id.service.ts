import { Injectable } from '@angular/core';
import { Subject,Observable,BehaviorSubject } from 'rxjs';
 
@Injectable()
export class IdService {
      

    private globalID: BehaviorSubject<string> = new BehaviorSubject<string>("");
    globalIdObs$ = this.globalID.asObservable();

    updateState(newID: string) {          
        this.globalID.next(newID);        
    }


}