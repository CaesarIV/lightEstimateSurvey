import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { IdService } from '../services/id.service';
import { VgAPI } from 'videogular2/core';
import { Location } from '@angular/common';

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
    {id: 1, type:'Image', url:'../../assets/Images/rc3s.png', answer:''},
    {id: 2, type:'Image', url:'../../assets/Images/rk3s.png', answer:''},
    {id: 3, type:'Image', url:'../../assets/Images/vf0s.png', answer:''},
    {id: 4, type:'Image', url:'../../assets/Images/rk2s.png', answer:''},
    {id: 5, type:'Image', url:'../../assets/Images/rc0s.png', answer:''},
    {id: 6, type:'Image', url:'../../assets/Images/vf1s.png', answer:''},
    {id: 7, type:'Image', url:'../../assets/Images/rc2s.png', answer:''},
    {id: 8, type:'Image', url:'../../assets/Images/rk1s.png', answer:''},
    {id: 9, type:'Image', url:'../../assets/Images/vf3s.png', answer:''},
    {id: 10, type:'Image', url:'../../assets/Images/rk0s.png', answer:''},
    {id: 11, type:'Image', url:'../../assets/Images/vf2s.png', answer:''},
  ];

  compQuestions = [
    {id: 0, type:'Image', url1:'../../assets/Images/rc1s.png', url2:'../../assets/Images/vf1s.png', answer:''},
    {id: 1, type:'Image', url1:'../../assets/Images/rk3s.png', url2:'../../assets/Images/rc3s.png', answer:''},
    {id: 2, type:'Image', url1:'../../assets/Images/vf2s.png', url2:'../../assets/Images/rk2s.png', answer:''},
    {id: 3, type:'Image', url1:'../../assets/Images/rc0s.png', url2:'../../assets/Images/vf0s.png', answer:''},
    {id: 4, type:'Image', url1:'../../assets/Images/vf2V.png', url2:'../../assets/Images/rk2V.png', answer:''},
    {id: 5, type:'Image', url1:'../../assets/Images/vf0s.png', url2:'../../assets/Images/rk0s.png', answer:''},
    {id: 6, type:'Image', url1:'../../assets/Images/vf1V.png', url2:'../../assets/Images/rc1V.png', answer:''},
    {id: 7, type:'Image', url1:'../../assets/Images/rk2s.png', url2:'../../assets/Images/rc2s.png', answer:''},
    {id: 8, type:'Image', url1:'../../assets/Images/rk0s.png', url2:'../../assets/Images/rc0s.png', answer:''},
  ];

  matQuestions = [
    {id: 0, type:'Image', url:'../../assets/Images/rc1V.png', answer:''},
    {id: 1, type:'Image', url:'../../assets/Images/rc3V.png', answer:''},
    {id: 2, type:'Video', url:'../../assets/Videos/rc3V.mov', answer:''},
    {id: 3, type:'Image', url:'../../assets/Images/vf3s.png', answer:''},
    {id: 4, type:'Image', url:'../../assets/Images/rk2s.png', answer:''},
    {id: 5, type:'Image', url:'../../assets/Images/rc0s.png', answer:''},
    {id: 6, type:'Image', url:'../../assets/Images/vf1s.png', answer:''},
    {id: 7, type:'Image', url:'../../assets/Images/rk3s.png', answer:''},
  ];

  lghtVarQuestions = [
    {id: 0, type:'Video', url1:'../../assets/Videos/rc1V.mov', url2:'../../assets/Videos/vf1V.mov', answer:''},
    {id: 1, type:'Video', url1:'../../assets/Videos/rk3V.mov', url2:'../../assets/Videos/rc3V.mov', answer:''},
    {id: 2, type:'Video', url1:'../../assets/Videos/vf2V.mov', url2:'../../assets/Videos/rk2V.mov', answer:''},
    {id: 3, type:'Video', url1:'../../assets/Videos/rc1V.mov', url2:'../../assets/Videos/rc3V.mov', answer:''},
    {id: 4, type:'Video', url1:'../../assets/Videos/vf3V.mov', url2:'../../assets/Videos/vf1V.mov', answer:''},
    {id: 5, type:'Video', url1:'../../assets/Videos/rk1V.mov', url2:'../../assets/Videos/rk3V.mov', answer:''},
    {id: 6, type:'Video', url1:'../../assets/Videos/rcS.mov', url2:'../../assets/Videos/vfS.mov', answer:''},
    {id: 7, type:'Video', url1:'../../assets/Videos/rkS.mov', url2:'../../assets/Videos/rcS.mov', answer:''},
  ];

  constructor(private _formBuilder: FormBuilder,private afs: AngularFirestore, private idServce : IdService, private location: Location) { 
    
  }
  isLinear = true;  
  soloCompleted = false;
  compCompleted = false;
  matCompleted = false;
  lghtVarCompleted = false;
  stepSolo = 0;
  stepComp = 0;
  stepMat = 0;
  stepLghtVar = 0;

  matGroup="";

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 45 && value <= 55) {
      return '✓';
    }

    return value+'%';
  }

  formatLabelComp(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value == 1) {
      return '<';
    }
    if (value == 2) {
      return '=';
    }
    if (value == 3) {
      return '>';
    }
    return value
    ;
  }

  onPlayerReady(api:VgAPI) {
    this.api = api;
    this.api.volume = 0;
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

  changeMatRadio(question:number, answerMat) {
    this.matQuestions[question].answer = answerMat;
    for (let index = 0; index < this.compQuestions.length; index++) {      
      if(this.matQuestions[index].answer == ''){
        return;
      }         
    }
    this.matCompleted = true;    
  }

  changeMatsliderLght(question:number,slider) {
    this.lghtVarQuestions[question].answer = slider.value;
    for (let index = 0; index < this.lghtVarQuestions.length; index++) {      
      if(this.lghtVarQuestions[index].answer == ''){
        return;
      }         
    }
    this.lghtVarCompleted = true;    
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

  saveAnswerMat(question:number){            
    this.nextStepMat();

    for (let index = 0; index < this.matQuestions.length; index++) {      
      if(this.matQuestions[index].answer == ''){
        return;
      }         
    }
    this.matCompleted = true;
  }

  saveAnswerLght(question:number){            
    this.nextStepLght();

    for (let index = 0; index < this.lghtVarQuestions.length; index++) {      
      if(this.lghtVarQuestions[index].answer == ''){
        return;
      }         
    }
    this.lghtVarCompleted = true;
  }

  submitSolo(){
    var answerKey = 'soloAnswers';
    for (let index = 0; index < this.soloQuestions.length; index++) {      
      answerKey = 'soloAnswers_'+index;
      this.afs.collection('participants').doc(this.user).collection('soloAnswers').doc(answerKey).set(this.soloQuestions[index]);
    }    
  }

  submitComp(){
    var answerKey = 'compAnswers';
    for (let index = 0; index < this.compQuestions.length; index++) {      
      answerKey = 'compAnswers_'+index;
      this.afs.collection('participants').doc(this.user).collection('compAnswers').doc(answerKey).set(this.compQuestions[index]);
    }    
  }

  submitMat(){
    var answerKey = 'matAnswers';
    for (let index = 0; index < this.matQuestions.length; index++) {      
      answerKey = 'matAnswers_'+index;
      this.afs.collection('participants').doc(this.user).collection('matAnswers').doc(answerKey).set(this.matQuestions[index]);
    }    
  }

  submitLght(){
    var answerKey = 'lghtAnswers';
    for (let index = 0; index < this.lghtVarQuestions.length; index++) {      
      answerKey = 'lghtAnswers_'+index;
      this.afs.collection('participants').doc(this.user).collection('lghtAnswers').doc(answerKey).set(this.lghtVarQuestions[index]);
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

  setStepMat(index: number) {
    this.stepMat = index;
  }

  nextStepMat() {
    this.stepMat++;
  }

  prevStepMat() {
    this.stepMat--;
  }

  setStepLght(index: number) {
    this.stepLghtVar = index;
  }

  nextStepLght() {
    this.stepLghtVar++;
  }

  prevStepLght() {
    this.stepLghtVar--;
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
    this.location.replaceState(this.user+"/lightEst-survey");
  }

}
