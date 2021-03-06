import { Component, OnInit } from '@angular/core';
import { FAQ } from 'src/app/layouts/home-page/interfaces/faq';

@Component({
  selector: 'app-faq-holder',
  templateUrl: './faq-holder.component.html',
  styleUrls: ['./faq-holder.component.scss']
})
export class FaqHolderComponent implements OnInit {

  faqs : FAQ[] = [{
    title:'Getting Started',
    subTitle:'What is ChronoAlerts? Lorem ipsum dolor sit amet? Consectetur adipiscing elit? Donec mauris tortor?',
    innerTittle:'What is ChronoAlerts?',
    innerContent:'Lorem ipsum dolor sit amet? Consectetur adipiscing elit? Donec mauris tortor. Lorem ipsum dolor sit amet? Consectetur adipiscing elit? Donec mauris tortor'
  },
  {
    title:'Manage My Account',
    subTitle:'Plans and Pricing Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
    innerTittle:'Manage My Account',
    innerContent:'Lorem ipsum dolor sit amet? Consectetur adipiscing elit? Donec mauris tortor. Lorem ipsum dolor sit amet? Consectetur adipiscing elit? Donec mauris tortor'
  },
  {
    title:'Lorem ipsum',
    subTitle:'Donec mauris tortor. Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
    innerTittle:'Lorem ipsum',
    innerContent:'Lorem ipsum dolor sit amet? Consectetur adipiscing elit? Donec mauris tortor. Lorem ipsum dolor sit amet? Consectetur adipiscing elit? Donec mauris tortor'
  },
  {
    title:'Quick Links',
    subTitle:'Get help signing in Lorem ipsum dolor sit amet. Consectetur adipiscing elit.',
    innerTittle:'Quick Links',
    innerContent:'Lorem ipsum dolor sit amet? Consectetur adipiscing elit? Donec mauris tortor. Lorem ipsum dolor sit amet? Consectetur adipiscing elit? Donec mauris tortor'
  }]

  selectedFaq:FAQ;
  searchFaq:string = '';
  constructor() { }

  ngOnInit(): void {
  }

  selectFaq(faq: FAQ) {
    this.selectedFaq = faq;
  }

  unSelectFaq() {
    this.selectedFaq = null;
  }

}
