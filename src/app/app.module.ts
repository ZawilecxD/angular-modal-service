import { EditUserModalComponent } from "./modals/edit-user/edit-user.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ChildComponent } from "./child.component";
import { ModalComponent } from "./modal.component";
import { ModalContainerComponent } from "./modals/modal-container.component";

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    ChildComponent,
    ModalComponent,
    ModalContainerComponent,
    EditUserModalComponent,
  ],
  bootstrap: [AppComponent],
  exports: [EditUserModalComponent, ModalContainerComponent],
})
export class AppModule {}
