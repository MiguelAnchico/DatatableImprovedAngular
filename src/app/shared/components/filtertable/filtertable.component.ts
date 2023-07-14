import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filtertable',
  templateUrl: './filtertable.component.html',
  styleUrls: ['./filtertable.component.css']
})
export class FiltertableComponent {
  @ViewChild('searchId') fieldId: any;
  @ViewChild('searchTitle') fieldTitle: any;
  @ViewChild('searchType') fieldType: any;
  @ViewChild('searchInstructions') fieldInstructions: any;

  @Output() addFilter: EventEmitter<{event: Event, attribute: string}> = new EventEmitter<{event: Event, attribute: string}>();
  @Output() deleteFilters: EventEmitter<void> = new EventEmitter<void>();

  isMoreFilters: boolean = false;

  filterDrinks(event: Event, attribute: string) {
    this.addFilter.emit({event, attribute});
  }

  deleteAllFilters() {
    this.deleteFilters.emit();
    this.fieldId.nativeElement.value = '';
    this.fieldTitle.nativeElement.value = '';
    this.fieldType.nativeElement.value = '';
    this.fieldInstructions.nativeElement.value = '';
  }

  changeFilterVisibility(value: boolean) {
    this.isMoreFilters = value;
  }
}
