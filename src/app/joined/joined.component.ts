import { Component, Input } from '@angular/core';
import { Join, Reservetion } from '../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { ConvertBooleanPipe } from '../pipes/convert-boolean.pipe';

@Component({
  selector: 'app-joined',
  standalone: true,
  imports: [CommonModule,ConvertBooleanPipe],
  templateUrl: './joined.component.html',
  styleUrl: './joined.component.scss'
})
export class JoinedComponent {
  @Input() joined?:Join 
  @Input() reservetions?:Reservetion 

}
