import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/Services/category.service';
import { SubCategoryService } from '../../../Services/sub-category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent {
  categories!: any[];
  subCategories!: any[];
  data = new FormData();
  subCateForm: FormGroup = new FormGroup({
    Name: new FormControl(),
    CategoryId: new FormControl()
  })
  constructor(private _categoryService: CategoryService, private _subCategoryService: SubCategoryService) { }
  ngOnInit(): void {
    this.GetAllCate();
    this.GetAllSubCate();
  }
  GetAllCate() {
    this._categoryService.GetAll().subscribe(res => {
      this.categories = res.data;
    })
  }

  GetAllSubCate() {
    this._subCategoryService.GetAll().subscribe(res => {
      this.subCategories = res.data;
      console.log(res)
    })
  }
  AddSubCate() {
    console.log(this.subCateForm.value);
    for (const key in this.subCateForm.value) {
      this.data.append(key, this.subCateForm.controls[key].value)
    }
    this._subCategoryService.Add(this.data).subscribe(res => {
      console.log(res);
    })
    this.GetAllCate();
    this.GetAllSubCate();
  }
  uploadImg(img: any) {
    this.data.append('Img', img.files[0])
    console.log(img.files)
  }
  Delete(id: number) {
    this._subCategoryService.Delete(id).subscribe(res => {
      console.log(res.data);
      this.subCategories = this.subCategories.splice(id, 1);
      this.GetAllSubCate();
    })

  }

}
