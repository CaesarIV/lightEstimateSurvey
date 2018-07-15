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
  changeId: string;
  fixedId: string;
  newId: string;
  ageGroup: number;
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
    this.backgroundQuestions[0].name = this.changeId;
    this.backgroundQuestions[0].phone = this.phones.value;
    this.backgroundQuestions[0].expArHw = this.arWare.value;
    this.backgroundQuestions[0].ageGroup = this.ageGroup+"";
    this.backgroundQuestions[0].expAr = this.expWithAr;
    this.backgroundQuestions[0].expArMore = this.arExpText;
    
    this.afs.collection('participants').doc(this.newId).collection('backgroundAnswers').doc("background").set({...this.backgroundQuestions});    
  }

}
