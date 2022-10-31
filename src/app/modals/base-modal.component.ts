import { Directive, Input } from "@angular/core";
import { Subject } from "rxjs";

@Directive()
export abstract class BaseModal<C = any, R = any> {
  @Input() title: string;

  protected closeSub = new Subject<R | null>();
  closed$ = this.closeSub.asObservable();
  data: C;

  abstract onSave();

  onCancel() {
    this.closeSub.next(null);
  }

  closeModal(result: R) {
    this.closeSub.next(result);
  }
}
