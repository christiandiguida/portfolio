import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuCloseReason } from '@angular/material/menu/menu';
import { MatDialog } from '@angular/material/dialog';
import { RewardsDialogComponent } from '../rewards-dialog/rewards-dialog.component';
import { Project } from 'src/app/classes/project';
import { Reward } from 'src/app/classes/reward';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  static project: Project = {
    total: 100000,
    totalBacked: 89814,
    backers: 5007,
    daysLeft: 56,
  };
  rewards: Reward[] = [
    {
      position: 0,
      title: 'Pledge with no reward',
      pledge: null,
      description:
        'Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.',
      quantity: null,
    },
    {
      position: 1,
      title: 'Bamboo Stand',
      pledge: 25,
      description:
        "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list.",
      quantity: 101,
    },
    {
      position: 2,
      title: 'Black Edition Stand',
      pledge: 75,
      description:
        'You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included.',
      quantity: 64,
    },
    {
      position: 3,
      title: 'Mahogany Special Edition',
      pledge: 200,
      description:
        'You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping is included.',
      quantity: 0,
    },
  ];
  constructor(private dialog: MatDialog) {}

  get getProject() {
    return MainComponent.project;
  }
  changeMenuIcon() {
    document.getElementById('menuIcon').innerHTML = 'close';
  }
  restoreMenuIcon() {
    document.getElementById('menuIcon').innerHTML = 'menu';
  }
  openDialog(reward?: Reward) {
    this.dialog.open(RewardsDialogComponent, {
      width: '90vw',
      maxWidth: 'none',
      maxHeight: 'none',
      height: '90vh',
    });
    reward
      ? (RewardsDialogComponent.position = reward.position)
      : (RewardsDialogComponent.position = 0);
  }

  ngOnInit(): void {}
}
