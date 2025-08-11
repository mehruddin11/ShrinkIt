import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  currentUser: User | null = null;
  selectedPlan = 'free';
  isLoading = false;

  plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'month',
      features: [
        '100 URLs per month',
        'Basic analytics',
        'Standard support',
        '7-day link history'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 9.99,
      period: 'month',
      features: [
        '10,000 URLs per month',
        'Advanced analytics',
        'Custom domains',
        'Priority support',
        'Unlimited link history',
        'Team collaboration'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 29.99,
      period: 'month',
      features: [
        'Unlimited URLs',
        'Advanced analytics & reporting',
        'Multiple custom domains',
        'Dedicated support',
        'API access',
        'Team management',
        'White-label solution'
      ],
      popular: false
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.selectedPlan = user.plan;
      }
    });
  }

  selectPlan(planId: string) {
    if (planId === this.currentUser?.plan) return;
    
    this.isLoading = true;
    
    // Demo plan change - simulate API call
    setTimeout(() => {
      this.selectedPlan = planId;
      this.isLoading = false;
      
      // Show success message
      alert(`Successfully ${planId === 'free' ? 'downgraded to' : 'upgraded to'} ${planId} plan!`);
    }, 1500);
  }

  isPlanActive(planId: string): boolean {
    return this.currentUser?.plan === planId;
  }

  getPlanButtonText(planId: string): string {
    if (this.isPlanActive(planId)) {
      return 'Current Plan';
    }
    
    if (planId === 'free') {
      return 'Downgrade';
    }
    
    return 'Upgrade';
  }
}