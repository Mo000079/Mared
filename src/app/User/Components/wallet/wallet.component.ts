import { Component } from '@angular/core';
import { WalletService } from 'src/app/Services/Wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {
  constructor(private _WalletService:WalletService){}
  Wallet:any;
  getFromWallet()
  {
    this._WalletService.getWallet().subscribe(Response=>
      {
        this.Wallet=Response.data;
        console.log("Action",this.Wallet)
      });
  }
  ngOnInit()
  {
    this.getFromWallet();
  }

}
