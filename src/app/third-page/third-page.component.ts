import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})


export class ThirdPageComponent implements OnInit {
  
  user = '';
  soloQuestions = [
    {id: 0, type:'Image', url:'', answer:''},
    {id: 1, type:'Image', url:'', answer:''},
    {id: 2, type:'Video', url:'', answer:''},
    {id: 3, type:'Image', url:'', answer:''},
    {id: 4, type:'Image', url:'', answer:''},
    {id: 5, type:'Video', url:'', answer:''},
    {id: 6, type:'Image', url:'', answer:''}
  ];

  constructor(private _formBuilder: FormBuilder,private afs: AngularFirestore) { 
    
  }
  isLinear = true;  
  soloCompleted = false;
  stepSolo = 0;

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 45 && value <= 55) {
      return '✓';
    }

    return value+'%';
  }

  changeMatslider(question:number,slider) {
    this.soloQuestions[question].answer = slider.value;
    for (let index = 0; index < this.soloQuestions.length; index++) {      
      if(this.soloQuestions[index].answer == ''){
        return;
      }         
    }
    this.soloCompleted = true;    
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

  submitSolo(){
    var answerKey = 'soloAnswers';
    for (let index = 0; index < this.soloQuestions.length; index++) {      
      console.log("Answer of "+index+ ": "+this.soloQuestions[index].answer);
      answerKey = 'soloAnswers_'+index;
      console.log(answerKey)
      this.afs.collection('participants').doc(this.user).collection('soloAnswers').doc(answerKey).set(this.soloQuestions[index]);
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

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  

  ngOnInit() {    
    this.user = 'User_'+this.makeid();
  }

}
