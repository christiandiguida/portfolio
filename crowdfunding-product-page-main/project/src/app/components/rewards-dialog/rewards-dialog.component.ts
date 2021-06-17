import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { Reward } from 'src/app/classes/reward';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-rewards-dialog',
  templateUrl: './rewards-dialog.component.html',
  styleUrls: ['./rewards-dialog.component.css'],
})
export class RewardsDialogComponent {
  isPledgeShown: boolean = false;
  static position: number = undefined;
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
  rewardAmount: number = 0;
  constructor() {}
  openPledge(reward: Reward) {
    this.isPledgeShown = !this.isPledgeShown;
    RewardsDialogComponent.position = reward.position;
  }
  openDialog() {}
  pledgeIsShown(reward: Reward): boolean {
    if (RewardsDialogComponent.position === reward.position) {
      this.rewardAmount = this.rewards
        .filter((r) => r.position === RewardsDialogComponent.position)
        .map((r) => r.pledge)
        .values()
        .next().value;
      return true;
    }
    return false;
  }
  backProject() {
    if (this.rewardAmount !== 0) {
      MainComponent.project.backers += 1;
      this.rewards.forEach((r) => {
        if (
          r.position === RewardsDialogComponent.position &&
          r.quantity !== null &&
          r.quantity !== 0
        ) {
          r.quantity -= 1;
          MainComponent.project.totalBacked += this.rewardAmount;
        }
      });
    }
  }
}
