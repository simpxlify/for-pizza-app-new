import { Component, ElementRef, ViewChild } from '@angular/core';
import {NgFor, NgClass} from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDragPreview,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'cdk-drag-drop-connected-sorting-example',
  templateUrl: 'cdk-drag-drop-connected-sorting-example.html',
  styleUrls: ['cdk-drag-drop-connected-sorting-example.css'],
  standalone: true,
  imports: [CdkDropList, NgFor, CdkDrag, CdkDragPreview, NgClass],
})
export class CdkDragDropConnectedSortingExample {
  @ViewChild('doneList', { read: ElementRef }) doneListRef: ElementRef | undefined;

  todo = [
    {
      title: 'Episode I - The Phantom Menace',
      poster: 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg',
    },
    {
      title: 'Episode II - Attack of the Clones',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/3/32/Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg',
    },
    {
      title: 'Episode III - Revenge of the Sith',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg',
    },
    {
      title: 'Episode IV - A New Hope',
      poster: 'https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg',
    },
    {
      title: 'Episode V - The Empire Strikes Back',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg',
    },
    {
      title: 'Episode VI - Return of the Jedi',
      poster: 'https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg',
    },
    {
      title: 'Episode VII - The Force Awakens',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg',
    },
    {
      title: 'Episode VIII - The Last Jedi',
      poster: 'https://upload.wikimedia.org/wikipedia/en/7/7f/Star_Wars_The_Last_Jedi.jpg',
    },
    {
      title: 'Episode IX – The Rise of Skywalker',
      poster:
        'https://upload.wikimedia.org/wikipedia/en/a/af/Star_Wars_The_Rise_of_Skywalker_poster.jpg',
    },
  ];

  done = [
    { title: 'Get up', poster: '' },
    { title: 'Brush teeth', poster: '' },
    { title: 'Take a shower', poster: '' },
    { title: 'Check e-mail', poster: '' },
    { title: 'Walk dog', poster: '' },
  ];


  drop(event: CdkDragDrop<string[]> | any) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Instead of using transferArrayItem, we'll clone and add the item to the "done" list
      this.cloneAndAddToDone(event.previousContainer.data[event.previousIndex], event.currentIndex);
    }
  }
  isItemInDone(item: any): boolean {
    // Replace 'title' with the property that uniquely identifies an item in your object
    return this.done.some(doneItem => doneItem.title === item.title);
  }
  cloneAndAddToDone(item: any, index: number) {
    // Clone the item using an appropriate method (deep copy) based on your object's structure.
    // For example, you can use Object.assign({}, item) or a custom deep cloning function.
    const clonedItem = { ...item }; // Shallow clone
  
    // Add the cloned item to the "done" array at the specified index.
    this.done.splice(index, 0, clonedItem);
  }

  onDragStart() {
    console.log('works???')
    if (this.doneListRef) {
      console.log(this.doneListRef)
      this.doneListRef.nativeElement.classList.add('blink-animation');
    }
  }
  
  onDragEnd() {
    if (this.doneListRef) {
      this.doneListRef.nativeElement.classList.remove('blink-animation');
    }
  }

  doneDrop(event: CdkDragDrop<string[]> | any) {
    if (event.previousContainer !== event.container) {
      // Remove item from "done" array when dragged to "removeList"
      const itemToRemove = event.previousContainer.data[event.previousIndex];
      this.done = this.done.filter((item) => item !== itemToRemove);
    }
  }

  drop2(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move the item from the previous table to the new table
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  doneDrop2(event: CdkDragDrop<any>) {
    if (event.previousContainer !== event.container) {
      // Remove item from "done" array when dragged to "removeList"
      const itemToRemove = event.previousContainer.data[event.previousIndex];
      this.done = this.done.filter((item) => item !== itemToRemove);
    }
  }
}