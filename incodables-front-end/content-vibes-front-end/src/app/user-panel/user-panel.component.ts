import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new 
  EventEmitter<boolean>();

  handleUserPanelToggle = () => this.toggleSidebar.emit(!this.isExpanded);

}
