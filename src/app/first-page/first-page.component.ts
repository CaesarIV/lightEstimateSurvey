import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { IdService } from '../services/id.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  backgroundQuestions = [{
    name: '', 
    phone:'', 
    ageGroup:'', 
    expAr:'',
    expArHw:'',
    expArMore:'',
  }];
  @Input() userID: string;
  @Output() userIDchange:EventEmitter<string> = new EventEmitter<string>();
  oldId: string;
  changeId = "Anon";
  fixedId: string;
  newId: string;
  ageGroup = -1;
  phones = new FormControl();  
  phonesList: string[] = ['Android Operated', 'iPhone', 'Windows Phone', 'Other'];
  arExpText = '';
  expWithAr = '';

  arWare = new FormControl();  
  arWareList: string[] = ['Smarphone / Tablet', 'AR-Headset', 'AR-Kiosk', 'Other'];

  constructor(private afs: AngularFirestore, private idService:IdService) { }

  ngOnInit() {    
    this.idService.globalIdObs$.subscribe(data => this.oldId = data);    
    this.fixedId = this.oldId;
  }

  onNameChange(nameValue : string){
    this.changeId = nameValue;    
    this.newId = this.changeId + '-' + this.fixedId;
    this.newId = this.newId.replace(/\s/g, '');
    this.idService.updateState(this.newId);    
  }

  onTextChange(arExpValue : string){
    this.arExpText = arExpValue;
  }

  submitBackground(){        
    if (!(typeof this.changeId === "undefined")){ 
      this.backgroundQuestions[0].name = this.changeId;
    }else{
      this.backgroundQuestions[0].name = "Anon";
    }

    if (!(typeof this.phones === "undefined")) 
    this.backgroundQuestions[0].phone = this.phones.value;

    if (!(typeof this.arWare === "undefined")) 
    this.backgroundQuestions[0].expArHw = this.arWare.value;

    if (!(typeof this.ageGroup === "undefined")){ 
      this.backgroundQuestions[0].ageGroup = this.ageGroup+"";
    }else{
      this.backgroundQuestions[0].ageGroup = "Anon";
    }

    if (!(typeof this.expWithAr === "undefined")) 
    this.backgroundQuestions[0].expAr = this.expWithAr;

    if (!(typeof this.arExpText === "undefined")) 
    this.backgroundQuestions[0].expArMore = this.arExpText;

    // console.log("Type of ID: " + (typeof this.changeId));
    // console.log("Type of Phone: " + (typeof this.phones));
    // console.log("Type of ArWare: " + (typeof this.arWare));
    // console.log("Type of AgeGroup: " + (typeof this.ageGroup));
    // console.log("Type of Exp: " + (typeof this.expWithAr));
    // console.log("Type of IarExpTextD: " + (typeof this.arExpText));    
    
    if (!(typeof this.newId === "undefined")){ 
      this.afs.collection('participants').doc(this.newId).collection('backgroundAnswers').doc("background").set({...this.backgroundQuestions});    
    }else{
      this.afs.collection('participants').doc(this.fixedId).collection('backgroundAnswers').doc("background").set({...this.backgroundQuestions});
    }
  }
}
