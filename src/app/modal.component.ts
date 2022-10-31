import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  styleUrls: ['./modal.component.scss'],
  template: `
  <div class="modal-backdrop"></div>
    <div class="modal">
      <h2 class="modal__title">{{title}}</h2>
      <p>{{text}}</p>
      <div class="modal__buttons">
        <button class="modal__button" (click)="answerModal(true)">Yes</button>
        <button class="modal__button" (click)="answerModal(false)">No</button>
      </div>
    </div>
  `,
})
export class ModalComponent {
  @Input() title = '';
  @Input() text = '';
  private answeredSub = new Subject<boolean>();
  answered$ = this.answeredSub.asObservable();
  constructor() {}

  protected answerModal(confirmed: boolean) {
    console.log('ModalComponent answerModal', confirmed);
    this.answeredSub.next(confirmed);
  }

  ngOnDestroy() {
    // causes complete before childComponent recieves 'next'
    // this.answeredSub.complete();
  }
}
