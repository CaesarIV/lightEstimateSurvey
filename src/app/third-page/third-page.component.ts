import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { IdService } from '../services/id.service';
import { VgAPI } from 'videogular2/core';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})


export class ThirdPageComponent implements OnInit {
  api:VgAPI;
  idFromService : string; 
  user = '';
  soloQuestions = [
    {id: 0, type:'Image', url:'../../assets/Images/rc1V.png', answer:''},
    {id: 1, type:'Image', url:'../../assets/Images/rc3V.png', answer:''},
    {id: 2, type:'Video', url:'../../assets/Videos/rc3V.mov', answer:''},
    {id: 3, type:'Image', url:'../../assets/Images/vf3s.png', answer:''},
    {id: 4, type:'Image', url:'../../assets/Images/rk2s.png', answer:''},
    {id: 5, type:'Image', url:'../../assets/Images/rc0s.png', answer:''},
    {id: 6, type:'Image', url:'../../assets/Images/vf1s.png', answer:''},
    {id: 7, type:'Image', url:'../../assets/Images/rk3s.png', answer:''},
  ];

  compQuestions = [
    {id: 0, type:'Image', url1:'../../assets/Images/rc1s.png', url2:'../../assets/Images/vf1s.png', answer:''},
    {id: 1, type:'Image', url1:'../../assets/Images/rc3s.png', url2:'../../assets/Images/rk3s.png', answer:''},
    {id: 2, type:'Video', url1:'../../assets/Videos/rc0s.mov', url2:'../../assets/Videos/vf0s.mov', answer:''},
    {id: 3, type:'Image', url1:'../../assets/Images/vf2s.png', url2:'../../assets/Images/rk2s.png', answer:''},
    {id: 4, type:'Video', url1:'../../assets/Videos/vf2V.mov', url2:'../../assets/Videos/rk2V.mov', answer:''},
    {id: 5, type:'Image', url1:'../../assets/Images/rc0s.png', url2:'../../assets/Images/rc1V.png', answer:''},
    {id: 6, type:'Video', url1:'../../assets/Videos/vf1V.mov', url2:'../../assets/Videos/rc1V.mov', answer:''},
    {id: 7, type:'Video', url1:'../../assets/Videos/rkS.mov', url2:'../../assets/Videos/rcS.mov', answer:''},
  ];

  constructor(private _formBuilder: FormBuilder,private afs: AngularFirestore, private idServce : IdService) { 
    
  }
  isLinear = true;  
  soloCompleted = false;
  compCompleted = false;
  stepSolo = 0;
  stepComp = 0;

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 45 && value <= 55) {
      return '✓';
    }

    return value+'%';
  }

  onPlayerReady(api:VgAPI) {
    this.api = api;
    this.api.volume = 0;
    console.log("Well?");
  }

  changeMatsliderSolo(question:number,slider) {
    this.soloQuestions[question].answer = slider.value;
    for (let index = 0; index < this.soloQuestions.length; index++) {      
      if(this.soloQuestions[index].answer == ''){
        return;
      }         
    }
    this.soloCompleted = true;    
  }

  changeMatsliderComp(question:number,slider) {
    this.compQuestions[question].answer = slider.value;
    for (let index = 0; index < this.compQuestions.length; index++) {      
      if(this.compQuestions[index].answer == ''){
        return;
      }         
    }
    this.compCompleted = true;    
  }

  saveAnswerSolo(question:number){            
    this.nextStepSolo();

    for (let index = 0; index < this.soloQuestions.length; index++) {      
      if(this.soloQuestions[index].answer == ''){
        return;
      }         
    }
    this.soloCompleted = true;
  }

  saveAnswerComp(question:number){            
    this.nextStepComp();

    for (let index = 0; index < this.compQuestions.length; index++) {      
      if(this.compQuestions[index].answer == ''){
        return;
      }         
    }
    this.compCompleted = true;
  }

  submitSolo(){
    var answerKey = 'soloAnswers';
    for (let index = 0; index < this.soloQuestions.length; index++) {      
      console.log("Answer of "+index+ ": "+this.soloQuestions[index].answer);
      answerKey = 'soloAnswers_'+index;
      console.log(answerKey)
      this.afs.collection('participants').doc(this.user).collection('soloAnswers').doc(answerKey).set(this.soloQuestions[index]);
    }    
  }

  submitComp(){
    var answerKey = 'compAnswers';
    for (let index = 0; index < this.compQuestions.length; index++) {      
      console.log("Answer of "+index+ ": "+this.compQuestions[index].answer);
      answerKey = 'compAnswers_'+index;
      console.log(answerKey)
      this.afs.collection('participants').doc(this.user).collection('compAnswers').doc(answerKey).set(this.compQuestions[index]);
    }    
  }

  setStepSolo(index: number) {
    this.stepSolo = index;
  }

  nextStepSolo() {
    this.stepSolo++;
  }

  prevStepSolo() {
    this.stepSolo--;
  }

  setStepComp(index: number) {
    this.stepComp = index;
  }

  nextStepComp() {
    this.stepComp++;
  }

  prevStepComp() {
    this.stepComp--;
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  

  ngOnInit() {  
    this.idServce.globalIdObs$.subscribe( data => this.idFromService = data);
    this.user = this.idFromService;
    
  }

}
