import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})


export class ThirdPageComponent implements OnInit {

  value = 50;
  questions = [
    {id: 0, type:'Image'},
    {id: 1, type:'Image'},
    {id: 2, type:'Video'},
    {id: 3, type:'Image'},
    {id: 4, type:'Image'},
    {id: 5, type:'Video'},
    {id: 6, type:'Image'}
  ];

  constructor(private _formBuilder: FormBuilder) { 
    
  }
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  answeredSolo = [false,false,false,false,false,false,false,false]
  answersSolo: Array<number> = [50,50,50,50,50,50];
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
    this.answersSolo[question] = slider.value ;
  }

  saveAnswerSolo(question:number){    
    console.log("Question #"+question+": "+this.answersSolo[question]);
    this.answeredSolo[question] = true;
    this.nextStepSolo();
  }

  submitSolo(){
    if(this.answersSolo.length < 6){
      this.soloCompleted = false;
    }else{
      console.log("Send: "+this.answersSolo);
      this.soloCompleted = true;
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

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
