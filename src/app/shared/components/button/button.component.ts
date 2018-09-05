import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() width: string;
  @Input() text: string;
  @Input() type: string;

  @Output() clicked = new EventEmitter();

  clickEvent() {
    this.clicked.emit();
  }
}

