import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardService } from '../../services/card-service.service'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.css']
})
export class SignalComponent implements OnInit {
  private writeCount = new BehaviorSubject<number>(0);

  constructor(private cardService: CardService) {
    this.writeCount.subscribe(value => {
      console.log('Count is now: ', value);
    });

    this.writeCount.next(10);
  }

  ngOnInit(): void {
  }

  increment() {
    this.writeCount.next(this.writeCount.value + 1);
  }
}