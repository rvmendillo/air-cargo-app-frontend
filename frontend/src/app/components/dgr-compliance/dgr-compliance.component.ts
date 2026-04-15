import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dgr-compliance',
  templateUrl: './dgr-compliance.component.html',
  styleUrls: ['./dgr-compliance.component.css']
})
export class DgrComplianceComponent implements OnInit {
  awbNumber = '402-9982-1403';
  complianceData: any = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAwbCompliance(this.awbNumber).subscribe(data => {
      this.complianceData = data;
    });
  }
}
