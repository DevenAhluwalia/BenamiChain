import { Component, OnInit } from '@angular/core';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { Http} from '@angular/http';

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
  optionsMeta = {
  				'id1' : {'name' : 'Ghatkopar, Deven Walia, plot786'},
             	'id2' : {'name' : 'Shalimar Bagh, Anil Walia, plot3110'},
             	'id3' : {'name' : 'Punjabi Bagh, Kamaljit Walia, plot0210'},
             	'id4' : {'name' : 'Bohra ganesh chawk, Mohanlal Sukhodia, plot111'}
             };
  trailsMeta =  {
  				'id1' : 
  					[{'name' : 'Nikola Tesla'},
	             	{'name' : 'Anil Walia'},
	             	{'name' : 'Deven Walia'},
	             	{'name' : 'John Lennon'},
	             	{'name' : 'Marshall Mathers Eminem'}],
	             'id2' : 
  					[{'name' : 'Narendra Singh Modi'},
	             	{'name' : 'Mayawati'},
	             	{'name' : 'Anil Walia'}],
	             'id3' : 
  					[{'name' : 'Princess Diana'},
	             	{'name' : 'Kamaljit Walia'}],
	             'id4' : 
  					[{'name' : 'Baba Ram Rahim Singh Insaan'},
	             	{'name' : 'Mohanlal Sukhodia'}]
             };
  txnsText = '';
  current = 3;
  showRPB = false;
  RBPInterval = null;
  searchText = '';
  showTrail = false;
  options = [];
  trails = [];
  isErr = false;
  showErr = false;
  errText = '';

  constructor(public http: Http) {}

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
  	this.options.length = 4;
  }

  search(i=null) {
  	this.current = 3;
  	this.showRPB = true;
  	this.showTrail = false;
  	this.showErr = false;

  	this.RBPInterval = setInterval(()=>{
  		this.current--;
  		if(this.current == -1) {
  			clearInterval(this.RBPInterval);
  			this.showRPB = false;
  			this.showTrail = true;
  			this.current = 3;
  			this.checkBenami(i);
  		}
  	}, 1000);
  	this.searchText = this.optionsMeta['id'+i]['name'];
	this.trails = this.trailsMeta['id'+i];
  	
  	// let data = '';
  	// let err = '';
  	// this.http.get('https://api.balmy35.hasura-app.io', this.searchText).subscribe(data => {
  	// 	console.log(data);
  	// });
  }

  checkBenami(i) {
  	if(i){	
  		this.showErr = true;
  		if(this.trails[this.trails.length-1]['name'] != (this.searchText.split(',')[1].trim())) {
  			this.isErr = true;
  			this.errText = 'Property has titling issue';
  		} else {
  			this.isErr = false;
  			this.errText = 'Property doesnt have titling issue';
  		}
  	}
  }
}
