import { BaseModalConfig } from "./modals/BaseModalConfig";
import { Injectable } from "@angular/core";
import { Subject, take, Observable } from "rxjs";
import { BaseModal } from "./modals/base-modal.component";

@Injectable({ providedIn: "root" })
export class ModalService {
  private confirmationRequestSub = new Subject<{
    text: string;
    title: string;
    responseSub: Subject<boolean>;
  }>();
  public confirmationModalRequested$ =
    this.confirmationRequestSub.asObservable();
  private customRequestSub = new Subject<{
    config: BaseModalConfig<BaseModal>;
    responseSub: Subject<any>;
  }>();
  public customModalRequested$ = this.customRequestSub.asObservable();

  askConfirmation(title: string, text: string): Observable<boolean> {
    console.log(`ModalService confirmation modal: ${JSON.stringify({ text })}`);
    const responseSub = new Subject<boolean>();
    this.confirmationRequestSub.next({ text, title, responseSub });
    return responseSub.pipe(take(1));
  }

  openCustomModal<T extends BaseModal, R>(modalConfig: BaseModalConfig<T>) {
    console.log(
      `ModalService custom modal: ${JSON.stringify({ modalConfig })}`
    );
    const responseSub = new Subject<R | null>();
    this.customRequestSub.next({ config: modalConfig, responseSub });
    return responseSub.pipe(take(1));
  }
}
