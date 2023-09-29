import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoadingService {

  // Subjects are like Observables, but Subjects can emmit values!
  private loadingSubject = new BehaviorSubject<boolean>(false); //BehaviorSubject remembers the last value emmited by the subject

  loading$: Observable<boolean> = this.loadingSubject.asObservable(); 
  /*
  Just the service can emmit values throw the Subject
  so insted of exposing the subject to outside, we delivery the observable with the same value 
  from the subject. But it cannot control the emmited values! So the observable is only
  capable of subscribe and get notified when the subject gets a new value!
  */

  constructor() { }

  showUntilCompleted = <T>(obs$: Observable<T>): Observable<T> => {
    return of(null) //used to create the initial obsevable, to emmit only one value
      .pipe(
        tap(() => this.turnOn()),
        concatMap(() => obs$),
        /*
        concatMap() will take the values emmited by the source observable (in this case the value of the observable is null)
        and transform this value (in this case null) into a new observable (in this case the paramter).
        */
       finalize(() => this.turnOff())
       // finalize() when the subscription end or errors out
      );
  }

  turnOn = () => {
    this.loadingSubject.next(true); // Emmimting the value true
  }

  turnOff = () => {
    this.loadingSubject.next(false);
  }
}
