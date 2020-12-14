import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WineService } from '../wine.service';

@Component({
  selector: 'app-wine-details',
  templateUrl: './wine-details.component.html',
  styleUrls: ['./wine-details.component.css']
})
export class WineDetailsComponent implements OnInit {
  wineDetails: {}
  constructor(private wineSvc: WineService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const wineId = this.activatedRoute.snapshot.params.wineId
    this.wineSvc.getWineDetails(wineId).then(result => {
      console.log("wine details rcvd from express: ", result)
      this.wineDetails = result
      }
      ).catch(e => console.error('error: ', e))

  }

}
