import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-uld-tracking',
  templateUrl: './uld-tracking.component.html',
  styleUrls: ['./uld-tracking.component.css']
})
export class UldTrackingComponent implements OnInit {
  uldList: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getUldStatus().subscribe(data => {
      this.uldList = data;
    });
  }
}
