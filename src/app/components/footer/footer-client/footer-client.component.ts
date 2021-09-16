import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-client',
  templateUrl: './footer-client.component.html',
  styleUrls: ['./footer-client.component.scss']
})
export class FooterClientComponent implements OnInit {
  year= new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
