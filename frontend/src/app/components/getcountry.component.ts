import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WineService } from '../wine.service';


@Component({
  selector: 'app-getcountry',
  templateUrl: './getcountry.component.html',
  styleUrls: ['./getcountry.component.css']
})
export class GetcountryComponent implements OnInit {

  constructor(private wineSvc: WineService, private activatedRoute: ActivatedRoute) { }
  wineResults: [] = []
  
  ngOnInit(): void {
    const countryName = this.activatedRoute.snapshot.params.country
    
    this.wineSvc.getCountry(countryName).then(result => {
      this.wineResults = result
    })
  }

}
