import { Component, OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';
declare var $: any;
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { slideInOut} from '../../animations/slideIn';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-filter-url',
  templateUrl: './filter-url.component.html',
  styleUrls: ['./filter-url.component.scss'],
  animations: [
    slideInOut
  ]
})
export class FilterUrlComponent implements OnInit {

  start:boolean = false;
  loaded:boolean = false;
  selectedIndex = 0;
  allFilterData = [];
  showTabs = false;
  appliedFiters = [];
  tabsHor = ['Brand','Model','Price','Case Size','Year','Location'];
  tabs = ['Brand','Model','Price','Case Size','Year','Location','Condition & Delivery Contents','Payment & Seller Info','Watch Type','Reference Number','Movement & Functions','Dial','Case','Strap/Bracelet','Clasp','Notification','Others'];
  minPriceValue: number = 0;
  maxPriceValue: number = 150000;
  options: Options = {
    floor: 0,
    ceil: 150000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '€' + value;
        case LabelType.High:
          return '€' + value;
        default:
          return '€' + value;
      }
    }
  };
  appliedFilterPrice : {minPrice:number,maxPrice:number} = {minPrice:this.minPriceValue,maxPrice:this.maxPriceValue};
  minTrustedValue: number = 0;
  maxTrustedValue: number = 150000;
  optionsTrusted: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '' + value;
        case LabelType.High:
          return '' + value;
        default:
          return '' + value;
      }
    }
  };
  notificationFilters = [];
  dataPaths = [];
  constructor(private dataService: DataService,
              private spinner: NgxSpinnerService,
              private httpClient: HttpClient) { }

  ngOnInit() {
  }


  affectAppliedFilterPrice(){
    this.appliedFilterPrice.minPrice = this.minPriceValue;
    this.appliedFilterPrice.maxPrice = this.maxPriceValue;
  }
  removeAppliedFilterPrice(){
    this.maxPriceValue = 150000;
    this.minPriceValue = 0;
    this.appliedFilterPrice = {minPrice:this.minPriceValue,maxPrice:this.maxPriceValue};
  }

  startFilter(){
    this.start = true;
    setTimeout(() => {
      this.spinner.show();
      this.initData();
    }, 0);
  }



  selectTab(index) {
    if (this.start){
      this.selectedIndex = index;
      this.showTabs = false;
    }
    
  }

  addFilter(event,item) {
    var indexOfItem = this.appliedFiters.indexOf(item);
    if (indexOfItem == -1) {
      this.appliedFiters.push(item);
    }
    else {
      this.appliedFiters.splice(indexOfItem,1);
    }
    console.log(this.appliedFiters);
  }

  initData() {
    this.dataPaths = [
      './assets/data/brandData.json',
      './assets/data/modelsData.json',
      '',
      './assets/data/caseSizeData.json',
      './assets/data/yearData.json',
      './assets/data/locationData.json',
      './assets/data/deliveryCondition.json',
      './assets/data/paymentSelletInfoData.json',
      './assets/data/watchTypeData.json',
      './assets/data/referenceNumber.json',
      './assets/data/movementData.json',
      './assets/data/dialData.json',
      './assets/data/caseMaterialData.json',
      './assets/data/bracletData.json',
      './assets/data/claspData.json',
      './assets/data/notificationData.json',
      './assets/data/othersData.json',
    ];
    var tabsLength = this.tabs.length;
    this.initBranData(0,tabsLength);
  }

  initBranData(index,tabsLength) {
    if (index < tabsLength){
      var path = this.dataPaths[index];
      if (path != ''){
        this.dataService.getJSON(this.dataPaths[index])
        .then((data) => {
          this.allFilterData.push(data);
          this.initBranData(index + 1,tabsLength);
        })
        .catch(err => {
  
        })
      }
      else {
        this.allFilterData.push({});
        this.initBranData(index + 1,tabsLength);
      }
      
    }
    else {
      this.appendNotificationFilters();
      this.spinner.hide();
      this.loaded = true;
      
    }
    
  }
  onSearchChange(searchValue: string): void {
    Object.values(this.allFilterData[this.selectedIndex]).map((filter:any) => {
      filter.map(item => {
        if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
          item.show = true;
        }
        else {
          item.show = false;
        }
      })
    })
  }

  onSearchChangeCaseSize(searchValue: string,key:string): void {
    Object.values(this.allFilterData[this.selectedIndex][key]).map((item:any) => {
        if (item.name.toLowerCase().includes(searchValue.toLowerCase())) {
          item.show = true;
        }
        else {
          item.show = false;
        }
    })
  }

  slideTabs() {
    this.showTabs = this.showTabs ? false : true;
  }

  closeDialog(url = {}) {
    if (this.showTabs){
      this.showTabs = false;
    }
    else {
      console.log('url',url);
      //this.dialog.close(url);
    }
  }


  caseSizeHeader(key) {
    if (key == 'caseDiameter') {
      return 'All Sizes'
    }
    else if (key == 'lugWidth') {
      return 'Lug width';
    }
    else if (key == 'thickness') {
      return 'Case thickness';
    }
  }

  conditionHeader(key) {
    if (key == 'specials'){
      return 'Delivery Contents';
    }
    else if (key == 'availability'){
      return 'Availablity';
    }
    else if (key == 'usedOrNew'){
      return 'New/Pre-Owned';
    }
    else if (key == 'condition'){
      return 'Condition';
    }
  }

  paymentHeader(key) {
    if (key == 'checkoutAvailable'){
      return 'Chrono24 Buyer Protection';
    }
    else if (key == 'listingType'){
      return 'Listing Type';
    }
    else if (key == 'onlyDealerAds'){
      return 'Seller';
    }
  }

  watchHeader(key) {
    if (key == 'gender'){
      return 'Gender';
    }
    else if (key == 'styles'){
      return 'Watch type';
    }
    else if (key == "watchCategories"){
      return 'Style of watch';
    }
  }

  movementHeader(key) {
    if (key == 'movementTypes'){
      return 'Movement'
    }
    else if (key == 'functions') {
      return 'Functions';
    }
  }

  dialHeader(key){
    if (key == 'dialNumbers'){
      return 'Dial style';
    }
    else if (key == 'dialColor'){
      return 'Dial color';
    }
  }

  caseMaterialHeader(key) {
    if (key == 'bezelMaterial'){
      return 'Bezel material';
    }
    else if (key == 'caseMaterials'){
      return 'Case material';
    }
    else if (key == 'glass'){
      return 'Crystal type';
    }
    else if (key == 'waterproof'){
      return 'Water resistance';
    }
  }

  bracletHeader(key) {
    if (key == 'braceletMaterial'){
      return 'Band material';
    }
    else if (key == 'braceletColor'){
      return 'Band color';
    }
  }

  claspHeader(key) {
    if (key == 'clasp'){
      return 'Clasp type';
    }
    else if (key == 'claspMaterial'){
      return 'Clasp material';
    }
  }

  notificationHeader(key) {
    if (key == 'currency'){
      return 'Currency';
    }
    else if (key == 'shipping'){
      return 'Shipping';
    }
    else if (key == 'sellerType'){
      return 'Seller Type'
    }
    else if (key == 'articleAvailability'){
      return 'Article Availability'
    }
  }

  checkDivImage(item) {
    item.checked = item.checked ? false : true;

    this.addFilter({},item);
  }

  notificationFilter(key,item) {
    if (key == 'currency'){
      this.allFilterData[15][key].map(currencyItem => {
        currencyItem.checked = false;
      })
      item.checked = true;
      this.notificationFilters.splice(this.notificationFilters.indexOf(this.notificationFilters.filter(notificationItem => notificationItem.type && notificationItem.type == 'currency')[0]),1)
    }
    if (item.name != 'All'){
      var indexOfNotificationItem = this.notificationFilters.indexOf(item);
      if (indexOfNotificationItem != -1){
        this.notificationFilters.splice(indexOfNotificationItem,1);
      }
      else {
        this.notificationFilters.push(item);
      }
    }
    else if (item.name == 'All'){
      var indexOfNotificationItem = this.notificationFilters.indexOf(item);
      if (indexOfNotificationItem != -1){
      this.allFilterData[15][key].map(notificationItem => {
        
        var indexOfItem = this.notificationFilters.indexOf(notificationItem);
        if (indexOfItem != -1){
          this.notificationFilters.splice(indexOfItem,1);
        }
        notificationItem.checked = false;
      })
    }
    else {
      this.allFilterData[15][key].map(notificationItem => {
        
        var indexOfItem = this.notificationFilters.indexOf(notificationItem);
        if (indexOfItem == -1){
          this.notificationFilters.push(notificationItem);
        }
        notificationItem.checked = true;
      })
    }
    }
    console.log(this.notificationFilters);
  }

  appendNotificationFilters(){
    Object.keys(this.allFilterData[15]).map(key => {
        this.allFilterData[15][key].map(notificationItem => {
          if (notificationItem.checked == true){
            this.notificationFilters.push(notificationItem);
          }
        })
    })
  }
  constructUrl() {
    let params = new HttpParams();
    params = params.set('sortorder','5');
    params = params.set('dosearch','true');
    params = params.set('redirectToSearchIndex',"true");
    params = params.set('resultview','block');
    params = params.set('pageSize','120');
    params = params.set('maxAgeInDays','0');
    params = params.set('currencyId',this.notificationFilters[this.notificationFilters.indexOf(this.notificationFilters.filter(notificationFilter => notificationFilter && notificationFilter.type == 'currency')[0])].name);
    params = params.set('priceFrom',this.minPriceValue.toString());
    params = params.set('priceTo',this.maxPriceValue.toString());
    params = params.set('showpage','1');   
    this.appliedFiters.map(filter => {
      if (filter.type && filter.id){
        params = params.append(`${filter.type}`,`${filter.id}`);
      }
    })
    if (this.appliedFiters.length > 0){
      this.closeDialog({url:'https://www.chrono24.com/search/index.htm?' + params.toString(),filterData:this.constructNotificationFilters(), email:'aymenxyz6@gmail.com',user:'6115d35deb40681b395131b4'})
    }
    else {
      this.closeDialog();
    }
  }

  constructNotificationFilters() {
    var sellerFilters = new Set();
    var availabilityArticleFilters = new Set();
    var shipingFilter = new Set();
    this.notificationFilters.map(notificationFilter => {
      if (notificationFilter.type == 'shipping'){
        shipingFilter.add(notificationFilter.value);
      }
      else if (notificationFilter.type == 'sellerType') {
        if (notificationFilter.name != 'Sold by Chrono24'){
          sellerFilters.add(notificationFilter.value.replace('"',"'"));
        }
        else {
          sellerFilters.add(notificationFilter.value);
        }
      }
      else if (notificationFilter.type == 'articleAvailability') {
        availabilityArticleFilters.add(notificationFilter.value);
      }
    })
    return {shippingFilter:Array.from(shipingFilter),sellterTypeFilter:Array.from(sellerFilters),availabilityArticleFilters:Array.from(availabilityArticleFilters),trustedMin:this.minTrustedValue,trustedMax:this.maxTrustedValue};
  }

}