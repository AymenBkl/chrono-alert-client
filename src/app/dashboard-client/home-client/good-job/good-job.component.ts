import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/response';
import { AuthService } from 'src/app/services/auth.service';
import { slideInOut } from '../../animations/slideIn';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-good-job',
  templateUrl: './good-job.component.html',
  styleUrls: ['./good-job.component.scss'],
  animations: [
    slideInOut
  ]
})
export class GoodJobComponent implements OnInit {

  @Input('alerts') alerts;
  @Input('appliedFilter') appliedFilters;
  @Input('urlEmail') urlEmail;
  @Input('notificationFilter') notificationFilters;
  @Input('minPriceValue') minPriceValue;
  @Input('maxPriceValue') maxPriceValue;
  submitted:boolean = false;
  apiResponse:{success:boolean,msg:string};
  constructor(private userService: UserService,
              private authService:AuthService,
              private router:Router) { }

  ngOnInit(): void {
  }

  goToAlerts(){
    if (this.apiResponse && this.apiResponse.success){
      this.router.navigate(['/dashboard-client/alerts']);
    }
  }

  constructUrl() {
    let params = new HttpParams();
    params = params.set('sortorder','5');
    params = params.set('dosearch','true');
    params = params.set('redirectToSearchIndex',"true");
    params = params.set('resultview','block');
    params = params.set('pageSize','120');
    params = params.set('maxAgeInDays','0');
    params = params.set('currencyId',this.notificationFilters.currency.name);
    params = params.set('priceFrom',this.minPriceValue.toString());
    params = params.set('priceTo',this.maxPriceValue.toString());
    params = params.set('showpage','1');   
    this.appliedFilters.map(filter => {
      params = params.append(`${filter.type}`,`${filter.id}`);
    })
    if (this.appliedFilters.length > 0){
      this.submitted = true;
      var url = 'https://www.chrono24.com/search/index.htm?' + params.toString();
      this.userService.addUrl({url:url,
        filterData:this.appliedFilters,
        minPrice:this.minPriceValue,
        maxPrice:this.maxPriceValue,
        filterNotifcationData:this.notificationFilters,
        emailActive:this.alerts[1].selected,
        telegramActive:this.alerts[2].selected,
        whatsappActive:this.alerts[3].selected,
        applicationActive:this.alerts[0].selected,
        email:this.urlEmail ? this.urlEmail : this.authService.user.email,
        status:'active'
      })
        .then((result:AuthResponse) => {
          this.submitted = false;
          if (result && result.status == 200){
            this.apiResponse = {success:true,msg:result.msg};
            
          }
          else {
            this.apiResponse = {success:false,msg:'Something Went Wrong !'};
            
          }
        })
        .catch(err => {
          this.apiResponse = {success:false,msg:'Something Went Wrong !'};
          this.submitted = false;
          console.log(err);
        })
    }
  }

}
