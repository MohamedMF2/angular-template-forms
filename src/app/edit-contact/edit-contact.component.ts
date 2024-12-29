import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addressTypeValues, Contact, phoneTypeValues } from '../contacts/contact.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;

  contact: Contact = {
    id: '',
    firstName: '',
    lastName: '',
    personal:false,
    dateOfBirth: null,
    favoritesRanking: 0,
    phone: {
      phoneNumber: '',
      phoneType: '',
    },
    address: {
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: '',
    },
  }
  constructor(private route: ActivatedRoute, private contactsSvc: ContactsService, private router: Router) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    console.log(contactId)
    if (!contactId) return
    this.contactsSvc.getContact(contactId).subscribe((contact) => {
      if (contact)
        this.contact = contact
    }
    )
  }

  saveContact(contactForm: NgForm) {
    // console.log(contactForm);
    console.log(this.contact.favoritesRanking,typeof this.contact.favoritesRanking);
    this.contactsSvc.saveContact(this.contact).subscribe({
      next: () => this.router.navigate(['/contacts'])
    })
  }
}
