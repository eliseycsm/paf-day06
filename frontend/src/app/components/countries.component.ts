import { Component, OnInit } from '@angular/core';
import { WineService } from '../wine.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countries: string[] = []
  constructor(private wineSvc: WineService) { }

  ngOnInit(): void {

    this.wineSvc.getCountries().then(
      result => {
        result.splice(0,1)
      this.countries = result
      console.log(result)
      }
    ).catch(e => console.error('error: ', e))
  }

}
