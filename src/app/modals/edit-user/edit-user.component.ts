import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseModal } from "../base-modal.component";
import { User } from "./User";

@Component({
  selector: "app-edit-user",
  template: `
    <header class="modal__header">
      <h2 class="modal__title">{{ title }}</h2>
    </header>
    <section #content class="modal__content">
      <form [formGroup]="fg" style="display: flex; flex-direction: column">
        <label for="user-name">Name</label>
        <input id="user-name" formControlName="name" type="text" required />
        <label for="user-password">Password</label>
        <input
          id="user-password"
          formControlName="password"
          type="password"
          required
        />
        <label for="user-age">Age</label>
        <input id="user-age" formControlName="age" type="number" />
      </form>
    </section>
    <div class="modal__footer">
      <button class="modal__button" (click)="onSave()">Save</button>
      <button class="modal__button" (click)="onCancel()">Cancel</button>
    </div>
  `,
})
export class EditUserModalComponent
  extends BaseModal<UserEditModalConfig, User>
  implements OnInit
{
  fg: FormGroup;
  isCreate = false;
  constructor() {
    super();
    this.fg = new FormGroup({
      name: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      age: new FormControl(null),
    });
  }

  //TODO: problem z change detection nie wyrkywa tytułu i zmianw  formularzu na wejsciu, dopiero po2  clickach
  ngOnInit(): void {
    this.isCreate = !this.data.editedUser;
    console.log("NG ON INIT");
    if (!this.isCreate) {
      console.log("setting userForm", this.data.editedUser);
      this.fg.setValue(this.data.editedUser);
    }
  }

  onSave() {
    if (this.fg.invalid) {
      alert("INVALID USER FORM");
      return;
    }
    //TODO: http request saving user
    this.closeModal(this.fg.value as User);
  }
}

interface UserEditModalConfig {
  editedUser?: User;
}
