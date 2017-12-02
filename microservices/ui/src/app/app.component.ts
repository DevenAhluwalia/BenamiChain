import { Component, OnInit } from '@angular/core';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  txns = [{
  			'hash' : '02df2f420650648099b08f662abafa5244e971745ba12dc17fd4cf6da1c99dd9e4',
  			'nameFrom' : 'Deven Walia',
  			'action': 'sold',
  			'nameTo' : 'Mukesh Ambani'
  		  },
  		  {
  		  	'hash' : 'b9bea2aaa1d5a5e035d663dae92e2bfa0510343cec23a2e0d2114383653c6cc8',
  		  	'nameFrom' : 'Tata Birla',
  			'action': 'bought',
  			'nameTo' : 'Tesla'
  		  },
  		  {
  		  	'hash' : 'b9bea2aaa1d5a5e035d663dae92e2bfa0510343cec23a2e0d2114383653c6cc8',
  		  	'nameFrom' : 'Modiji',
  			'action': 'bought',
  			'nameTo' : 'Mulayam singh yadav'
  		  }];
  txnsText = '';
  current = 5;
  showRPB = false;
  RBPInterval = null;
  searchText = '';
  options = [{'name' : 'Ghatkopar, Deven Walia, plot786'},
             {'name' : 'Shalimar Bagh, Anil Walia, plot3110'},
             {'name' : 'Punjabi Bagh, Kamaljit Walia, plot0210'},
             {'name' : 'Bohra ganesh chawk, Mohanlal Sukhodia, plot111'}];

  ngOnInit() {
  	let x = [];
  	for(let idx in this.txns) {
  		x[idx] = this.txns[idx]['nameFrom'] +
  					(this.txns[idx]['action'] == 'sold' ? ' sold to ' : ' bought from ') +
  						this.txns[idx]['nameTo'];
  	}
  	let gap = '';
  	let i = 0;
  	while(i++ < 25){
  		gap += '&nbsp;'
  	}
  	this.txnsText = x.join(gap);
  }

  search(option=null) {
  	this.current = 5;
  	this.showRPB = true;

  	this.RBPInterval = setInterval(()=>{
  		this.current--;
  		if(!this.current) {
  			clearInterval(this.RBPInterval);
  			this.showRPB = false;
  		}
  	}, 1000);
  	if(option){
  		this.searchText = option['name'];
  	}
  }
}
