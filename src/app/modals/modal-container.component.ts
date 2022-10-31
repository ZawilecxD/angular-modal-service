import { Subject, take } from "rxjs";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { BaseModal } from "./base-modal.component";
import { BaseModalConfig } from "./BaseModalConfig";

@Component({
  selector: "app-modal-container",
  template: `
    <div class="modal-backdrop"></div>
    <div class="modal">
      <ng-container #modalBody></ng-container>
    </div>
  `,
  styleUrls: ["./modal-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContainerComponent<C extends BaseModal, R>
  implements AfterViewInit
{
  @ViewChild("modalBody", { read: ViewContainerRef })
  modalBody: ViewContainerRef;
  @Input() modalConfig: BaseModalConfig<C>;
  private afterClosedSub = new Subject<R>();
  afterClosed$ = this.afterClosedSub.asObservable();
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.setupContent();
  }

  private setupContent() {
    const componentRef = this.modalBody.createComponent<C>(
      this.modalConfig.component
    );
    componentRef.instance.title = this.modalConfig.title;
    componentRef.instance.data = this.modalConfig.data;
    componentRef.instance.closed$.pipe(take(1)).subscribe((resp: R) => {
      console.log("Response from modal =", resp);
      this.afterClosedSub.next(resp);
    });
    this.cdr.detectChanges();
  }
}
