import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dgr-compliance',
  templateUrl: './dgr-compliance.component.html',
  styleUrls: ['./dgr-compliance.component.css']
})
export class DgrComplianceComponent implements OnInit {
  
  complianceResults = [
    {
      awb: '125-98342104',
      route: 'LHR → DXB',
      unNumber: 'UN 3480',
      category: 'Class 9 (Li-ion)',
      date: '2024-11-04 14:22',
      status: 'ACCEPTED'
    },
    {
      awb: '020-44910238',
      route: 'FRA → SIN',
      unNumber: 'UN 1993',
      category: 'Class 3 (Flammable)',
      date: '2024-11-04 13:05',
      status: 'REJECTED'
    },
    {
      awb: '618-55201934',
      route: 'HKG → LAX',
      unNumber: 'UN 3090',
      category: 'Class 9 (Li-metal)',
      date: '2024-11-04 11:48',
      status: 'PENDING'
    },
    {
      awb: '016-88320144',
      route: 'JFK → CDG',
      unNumber: 'UN 1072',
      category: 'Class 2 (Oxidizing)',
      date: '2024-11-04 10:15',
      status: 'ACCEPTED'
    }
  ];

  constructor() {}

  ngOnInit(): void {
  }
}
