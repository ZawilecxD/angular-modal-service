import { EditUserModalComponent } from "./modals/edit-user/edit-user.component";
import { User } from "./modals/edit-user/User";
import { Component } from "@angular/core";
import { ModalService } from "./modal.service";

@Component({
  selector: "app-child",
  template: `
    <button (click)="openModal()">Open modal</button>
    <p *ngIf="lastConfirm !== null">
      Last modal answer was {{ lastConfirm ? "YES" : "NO" }}
    </p>
    <hr />
    <button (click)="openUserEdit()">Open user edit</button>
  `,
})
export class ChildComponent {
  lastConfirm: boolean | null = null;
  constructor(private modalService: ModalService) {}

  openModal() {
    this.modalService
      .askConfirmation("This is modal title", "Do you understand this modal?")
      .subscribe((resp) => {
        console.log("ChildComponent RESPONSED WITH ", resp);
        this.lastConfirm = resp;
      });
  }

  openUserEdit() {
    const editedUser: User = { name: "Mati", age: 29, password: "Pass123" };
    this.modalService
      .openCustomModal<EditUserModalComponent, User>({
        component: EditUserModalComponent,
        title: "Edit user",
        data: { editedUser },
      })
      .subscribe((user) => {
        console.log("AFTER USER EDIT", user);
      });
  }
}
