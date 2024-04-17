import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../Services/category.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  categories!: any[];
  data = new FormData();
  imglist!: any[];
  cateForm: FormGroup = new FormGroup({
    Name: new FormControl(),
  })
  constructor(private _categoryService: CategoryService) { }
  ngOnInit(): void {
    this.GetAll();
  }
  GetAll() {
    this._categoryService.GetAll().subscribe(res => {
      this.categories = res.data;
    })
  }
  AddCate() {
    console.log(this.cateForm.value);
    for (const key in this.cateForm.value) {
      this.data.append(key, this.cateForm.controls[key].value)
    }
    this._categoryService.Add(this.data).subscribe(res => {
      console.log(res);
      this.GetAll();
    })

  }
  uploadImg(img: any) {
    this.data.append('Photo', img.files[0])
    console.log(img.files)
  }
  
  Delete(id: number) {
    console.log(id);
    this._categoryService.Delete(id).subscribe(res => {
      this.categories = this.categories.splice(id, 1);
      this.GetAll();
    })

  }
}
